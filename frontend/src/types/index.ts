export interface Post {
  id: number;
  courseId: number;
  authorId: number;
  title: string;
  content: string;
  createdAt: number;
  hasSaved: boolean;
  savesCount: number;
}

export interface FeedResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface SavedPost {
  id: number;
  postId: number;
  userId: number;
  savedAt: number;
  post: {
    id: number;
    courseId: number;
    authorId: number;
    title: string;
    content: string;
    createdAt: number;
  };
}

export interface SavedPostsResponse {
  posts: SavedPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface SavePostResponse {
  success: boolean;
  newlySaved: boolean;
}

export interface RemoveSavedPostResponse {
  success: boolean;
  newlyRemoved: boolean;
}
