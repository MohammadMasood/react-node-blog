import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../features/posts/postsThunks';
import Button from '../UI/Button';

export default function PostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    for (let i = 0; i < files.length; i++) fd.append('images', files[i]);
    dispatch(createPostThunk(fd));
    setTitle('');
    setDescription('');
    setFiles([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded mb-2" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Write your post..." className="w-full p-2 border rounded mb-2" required />
      <input type="file" multiple onChange={e => setFiles(e.target.files)} className="mb-2" />
      <Button type="submit" variant="primary">Post</Button>
    </form>
  );
}
