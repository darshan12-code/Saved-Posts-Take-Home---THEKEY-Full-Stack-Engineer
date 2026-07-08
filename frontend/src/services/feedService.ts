import { apiClient } from '../api';
import { FeedResponse, SavePostResponse, RemoveSavedPostResponse, SavedPostsResponse } from '../types';

export const feedService = {
  async getCourseFeed(courseId: number, page: number = 1, limit: number = 10): Promise<FeedResponse> {
    return apiClient.get<FeedResponse>(`/api/courses/${courseId}/posts?page=${page}&limit=${limit}`);
  },

  async savePost(postId: number): Promise<SavePostResponse> {
    return apiClient.put<SavePostResponse>(`/api/posts/${postId}/save`);
  },

  async removeSavedPost(postId: number): Promise<RemoveSavedPostResponse> {
    return apiClient.delete<RemoveSavedPostResponse>(`/api/posts/${postId}/save`);
  },

  async getSavedPosts(page: number = 1, limit: number = 10): Promise<SavedPostsResponse> {
    return apiClient.get<SavedPostsResponse>(`/api/me/saved-posts?page=${page}&limit=${limit}`);
  },
};
