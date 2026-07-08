import { useQuery } from '@tanstack/react-query';
import { PostCard, LoadingState, EmptyState } from '../components';
import { feedService } from '../services';

export function FeedPage() {
  // For now, we'll use a hardcoded course ID
  // In a real app, this would come from route params or user context
  const courseId = 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ['feed', courseId, 1, 10],
    queryFn: () => feedService.getCourseFeed(courseId, 1, 10),
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error loading feed: {(error as Error).message}
      </div>
    );
  }

  if (!data || data.posts.length === 0) {
    return <EmptyState message="No posts available in this course" />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Feed</h2>
      <div className="space-y-4">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {data.pagination && (
        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <span>
            Page {data.pagination.page} of {Math.ceil(data.pagination.total / data.pagination.limit)}
          </span>
          <span>Total: {data.pagination.total} posts</span>
        </div>
      )}
    </div>
  );
}
