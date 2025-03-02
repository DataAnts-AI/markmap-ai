import { NextResponse } from 'next/server';
import { generateMindmap } from '@/lib/openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const FREE_TIER_LIMIT = 2;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    
    // For logged-in users, check usage limits
    if (session?.user) {
      // Get user subscription status
      const { data: user } = await supabase
        .from('mark_users')
        .select('subscription_status, id')
        .eq('email', session.user.email)
        .single();

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Check usage for free tier users
      if (user.subscription_status !== 'active') {
        const { count } = await supabase
          .from('mark_mindmap_usage')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (count && count >= FREE_TIER_LIMIT) {
          return NextResponse.json(
            {
              error: 'Free tier limit reached',
              limit: FREE_TIER_LIMIT,
              type: 'UPGRADE_REQUIRED'
            },
            { status: 403 }
          );
        }

        // Record usage for logged-in users
        await supabase.from('mark_mindmap_usage').insert({
          user_id: user.id,
          prompt: prompt
        });
      }
    }

    // Generate mindmap for all users (logged in or not)
    const mindmapContent = await generateMindmap(prompt);
    
    return NextResponse.json({ content: mindmapContent });
  } catch (error: any) {
    console.error('Error in generate-mindmap:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate mindmap' },
      { status: 500 }
    );
  }
} 