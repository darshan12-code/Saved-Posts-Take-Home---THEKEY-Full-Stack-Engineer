import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import { FeedPage } from '../pages/FeedPage';
import { SavedPostsPage } from '../pages/SavedPostsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <FeedPage />,
      },
      {
        path: 'saved',
        element: <SavedPostsPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
