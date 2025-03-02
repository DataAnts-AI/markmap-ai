import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get user ID
    const { data: user } = await supabase
      .from('mark_users')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get mindmap usage count
    const { count } = await supabase
      .from('mark_mindmap_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get recent mindmaps
    const { data: mindmaps } = await supabase
      .from('mark_mindmap_usage')
      .select('id, prompt, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      count: count || 0,
      mindmaps: mindmaps || [],
    });
  } catch (error: any) {
    console.error('Error fetching mindmap usage:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch mindmap usage' },
      { status: 500 }
    );
  }
} 