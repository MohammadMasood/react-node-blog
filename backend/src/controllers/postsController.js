const { Post, PostImage, Comment, Like, User } = require('../models');
const { Op } = require('sequelize');
const config = require('../config');

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'author', attributes: ['id', 'name', 'email'] },
        { model: PostImage, as: 'images', attributes: ['url'] },
        { model: Comment, as: 'comments', attributes: ['id', 'text', 'user_id', 'created_at'] },
        { model: Like, as: 'likes', attributes: ['id', 'user_id'] }
      ],
      order: [['created_at', 'DESC']]
    });

    // format images as array of urls
    const formatted = posts.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      created_at: p.created_at,
      author: p.author,
      images: p.images.map(img => img.url),
      comments: p.comments,
      likes: p.likes
    }));

    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const p = await Post.findByPk(id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'name'] },
        { model: PostImage, as: 'images', attributes: ['url'] },
        { model: Comment, as: 'comments', include: [{ model: User, as: 'user', attributes: ['id', 'name'] }] },
        { model: Like, as: 'likes', attributes: ['id', 'user_id'] }
      ]
    });
    if (!p) return res.status(404).json({ message: 'Post not found' });

    const formatted = {
      id: p.id,
      title: p.title,
      description: p.description,
      created_at: p.created_at,
      author: p.author,
      images: p.images.map(i => i.url),
      comments: p.comments,
      likes: p.likes
    };
    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.user.id },
      include: [{ model: PostImage, as: 'images' }, { model: Like, as: 'likes' }, { model: Comment, as: 'comments' }],
      order: [['created_at', 'DESC']]
    });
    const formatted = posts.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      images: p.images.map(i => i.url),
      likes: p.likes,
      comments: p.comments
    }));
    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Title and description required' });

    const newPost = await Post.create({ title, description, user_id: req.user.id });

    // handle images
    const files = req.files || [];
    const images = [];
    for (const file of files) {
      const url = `/${file.path.replace(/\\/g, '/')}`; // e.g. /uploads/123.jpg
      const img = await PostImage.create({ post_id: newPost.id, url });
      images.push(img);
    }

    // include author and return shape similar to frontend expectation
    const postWithImages = {
      id: newPost.id,
      title: newPost.title,
      description: newPost.description,
      created_at: newPost.created_at,
      author: { id: req.user.id, name: req.user.name },
      images: images.map(i => i.url),
      comments: [],
      likes: []
    };

    return res.status(201).json(postWithImages);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.user.id;
  try {
    // toggle-like: if exists remove, else create
    const existing = await Like.findOne({ where: { post_id: post_id, user_id: user_id } });
    if (existing) {
      await existing.destroy();
    } else {
      await Like.create({ post_id: post_id, user_id: user_id });
    }
    // return updated likes list
    const likes = await Like.findAll({ where: { post_id: post_id } });
    return res.json({ likes });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.user.id;
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Comment text required' });

  try {
    const comment = await Comment.create({ post_id: post_id, user_id: user_id, text });
    const commentWithUser = await Comment.findByPk(comment.id, { include: [{ model: User, as: 'user', attributes: ['id', 'name'] }] });
    return res.status(201).json(commentWithUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
