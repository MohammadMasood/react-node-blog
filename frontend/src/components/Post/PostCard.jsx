import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likePostThunk } from '../../features/posts/postsThunks';
import { FiThumbsUp } from 'react-icons/fi';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

export default function PostCard({ post, showActions = false }) {
  const dispatch = useDispatch();

  const handleLike = () => dispatch(likePostThunk(post.id));

  return (
    <article className="bg-white rounded shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-500">by {post.author?.name || 'Unknown'} • {new Date(post.created_at).toLocaleString()}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={handleLike} className="flex items-center space-x-1">
            <FiThumbsUp />
            <span>{(post.likes && post.likes.length) || 0}</span>
          </button>
        </div>
      </div>

      {post.images?.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {post.images.map((src, idx) => (
            <img key={idx} src={`${VITE_IMAGE_URL}${src}`} alt={post.title} className="w-full h-36 object-cover rounded" loading="lazy" />
          ))}
        </div>
      )}

      <p className="mt-3 text-gray-700">{post.description?.slice(0, 200)}{post.description?.length > 200 ? '...' : ''}</p>

      <div className="mt-3 flex justify-between items-center">
        <Link to={`/post/${post.id}`} className="text-indigo-600 hover:underline">Read more</Link>
        {showActions && (
          <div>
            {/* Edit/Delete buttons placeholders */}
          </div>
        )}
      </div>
    </article>
  );
}
