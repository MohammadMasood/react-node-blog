import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPostsThunk } from "../features/posts/postsThunks";
import PostCard from "../components/Post/PostCard";

export default function MyPosts() {
  const dispatch = useDispatch();
  const { myPosts, loading } = useSelector((state) => state.posts);

  useEffect(() => { dispatch(getMyPostsThunk()); }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">My Posts</h1>
      {myPosts.length === 0 && <p>No posts found.</p>}
      <div className="grid gap-6">
        {myPosts.map((post) => <PostCard key={post.id} post={post} showActions={true} />)}
      </div>
    </div>
  );
}
