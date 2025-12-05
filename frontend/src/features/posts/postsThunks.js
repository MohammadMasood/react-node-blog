import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// GET /posts  - fetch feed
export const fetchFeedThunk = createAsyncThunk(
  'posts/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/posts');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET /posts/:id
export const getPostByIdThunk = createAsyncThunk(
  'posts/getById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET /posts/me
export const getMyPostsThunk = createAsyncThunk(
  'posts/getMyPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/posts/me');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST /posts  (expects multipart/form-data)
export const createPostThunk = createAsyncThunk(
  'posts/create',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST /posts/:id/like
export const likePostThunk = createAsyncThunk(
  'posts/like',
  async (post_id, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/posts/${post_id}/like`);
      return { post_id, likes: data.likes };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST /posts/:id/comments
export const addCommentThunk = createAsyncThunk(
  'posts/addComment',
  async ({ post_id, text }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/posts/${post_id}/comments`, { text });
      return { post_id, comment: data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
