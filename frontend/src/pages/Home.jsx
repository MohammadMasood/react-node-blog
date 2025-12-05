import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/Post/PostCard';
import PostForm from '../components/Post/PostForm';
import { fetchFeedThunk } from '../features/posts/postsThunks';

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(s => s.posts);
  const token = useSelector(s => s.auth.token);

  useEffect(() => { dispatch(fetchFeedThunk()); }, [dispatch]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {token && <PostForm />}

        {loading && <div className="text-center py-6">Loading...</div>}
        {items.map(post => <PostCard key={post.id} post={post} />)}
      </div>

      <aside>
        <div className="bg-white rounded shadow p-4">
          <h4 className="font-semibold">About</h4>
          <p className="text-sm text-gray-600">A local blog running in Vite + React + Tailwind + Redux.</p>
        </div>
      </aside>
    </div>
  );
}
