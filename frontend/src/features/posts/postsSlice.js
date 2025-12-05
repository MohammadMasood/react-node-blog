import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFeedThunk,
  getPostByIdThunk,
  getMyPostsThunk,
  createPostThunk,
  likePostThunk,
  addCommentThunk
} from './postsThunks';

const initialState = {
  items: [],
  selectedPost: null,
  myPosts: [],
  loading: false,
  error: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchFeed
      .addCase(fetchFeedThunk.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchFeedThunk.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchFeedThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Failed to fetch' })

      // getById
      .addCase(getPostByIdThunk.pending, (s) => { s.loading = true; s.error = null; s.selectedPost = null; })
      .addCase(getPostByIdThunk.fulfilled, (s, a) => { s.loading = false; s.selectedPost = a.payload; })
      .addCase(getPostByIdThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Failed' })

      // my posts
      .addCase(getMyPostsThunk.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(getMyPostsThunk.fulfilled, (s, a) => { s.loading = false; s.myPosts = a.payload; })
      .addCase(getMyPostsThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Failed' })

      // create
      .addCase(createPostThunk.pending, (s) => { s.loading = true; })
      .addCase(createPostThunk.fulfilled, (s, a) => { s.loading = false; s.items.unshift(a.payload); s.myPosts.unshift(a.payload); })
      .addCase(createPostThunk.rejected, (s, a) => { s.loading = false; s.error = a.payload || 'Create failed' })

      // like
      .addCase(likePostThunk.fulfilled, (s, a) => {
        const idx = s.items.findIndex(p => p.id === a.payload.post_id);
        if (idx !== -1) s.items[idx].likes = a.payload.likes;
        if (s.selectedPost && s.selectedPost.id === a.payload.post_id) s.selectedPost.likes = a.payload.likes;
      })

      // add comment
      .addCase(addCommentThunk.fulfilled, (s, a) => {
        const idx = s.items.findIndex(p => p.id === a.payload.post_id);
        if (idx !== -1) s.items[idx].comments = [...(s.items[idx].comments||[]), a.payload.comment];
        if (s.selectedPost && s.selectedPost.id === a.payload.post_id) {
          s.selectedPost.comments = [...(s.selectedPost.comments||[]), a.payload.comment];
        }
      });
  }
});

export const { clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
