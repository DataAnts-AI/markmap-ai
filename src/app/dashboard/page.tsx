'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MindmapUsage {
  count: number;
  mindmaps: Array<{
    id: string;
    prompt: string;
    created_at: string;
  }>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usage, setUsage] = useState<MindmapUsage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await fetch('/api/mindmap-usage');
        if (response.ok) {
          const data = await response.json();
          setUsage(data);
        }
      } catch (error) {
        console.error('Error fetching mindmap usage:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUsage();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mindmap Usage</CardTitle>
            <CardDescription>
              Track your mindmap generation usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            {usage && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      {usage.count} / 2 mindmaps used
                    </span>
                    <span className="text-sm text-gray-500">
                      Free Tier
                    </span>
                  </div>
                  <Progress value={(usage.count / 2) * 100} />
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-4">Recent Mindmaps</h3>
                  {usage.mindmaps.length > 0 ? (
                    <ul className="space-y-3">
                      {usage.mindmaps.map((mindmap) => (
                        <li
                          key={mindmap.id}
                          className="bg-gray-50 p-3 rounded-lg"
                        >
                          <p className="text-sm font-medium">
                            {mindmap.prompt}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(mindmap.created_at).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No mindmaps generated yet
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 