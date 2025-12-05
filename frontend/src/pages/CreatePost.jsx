import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../features/posts/postsThunks';
import Button from '../components/UI/Button';

export default function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    for (let i = 0; i < files.length; i++) fd.append('images', files[i]);
    dispatch(createPostThunk(fd));
    setTitle(''); setDescription(''); setFiles([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Create Post</h1>
      <form onSubmit={submit} className="space-y-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 border rounded" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Content" className="w-full p-3 border rounded h-40" required />
        <input type="file" multiple onChange={e => setFiles(e.target.files)} />
        <Button type="submit" variant="primary">Publish</Button>
      </form>
    </div>
  );
}
