import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostByIdThunk, likePostThunk, addCommentThunk } from '../features/posts/postsThunks';
import { clearSelectedPost } from '../features/posts/postsSlice';
import Button from '../components/UI/Button';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

export default function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedPost: post, loading } = useSelector(s => s.posts);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(getPostByIdThunk(id));
    return () => dispatch(clearSelectedPost());
  }, [dispatch, id]);

  const handleLike = () => dispatch(likePostThunk(id));
  const handleComment = () => {
    if (!comment.trim()) return;
    dispatch(addCommentThunk({ post_id: id, text: comment }));
    setComment('');
  };

  if (loading || !post) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {post.images?.[0] && <img src={`${VITE_IMAGE_URL}${post.images[0]}`} alt={post.title} className="w-full h-72 object-cover rounded-xl mb-6" loading="lazy" />}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700 leading-7 mb-4">{post.description}</p>

      <div className="flex items-center gap-4 my-4">
        <Button onClick={handleLike} variant="primary">👍 Like ({post.likes?.length || 0})</Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>

        <div className="flex gap-3 mb-4">
          <input placeholder="Write a comment..." className="flex-1 border p-3 rounded" value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button onClick={handleComment} variant="secondary">Add</Button>
        </div>

        <div className="space-y-3">
          {post.comments?.length === 0 && <p className="text-gray-500">No comments yet.</p>}
          {post.comments?.map((c) => (
            <div key={c.id || c.id} className="p-3 border rounded">
              <p className="text-sm text-gray-600">{c.user?.name || 'Anonymous'}</p>
              <p>{c.text || c}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
