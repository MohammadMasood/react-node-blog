'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    user_id: { type: DataTypes.UUID, allowNull: false }
  }, {
    tableName: 'Posts',
    timestamps: true,
    underscored: true,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    Post.hasMany(models.PostImage, { foreignKey: 'post_id', as: 'images' });
    Post.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });
    Post.hasMany(models.Like, { foreignKey: 'post_id', as: 'likes' });
  };

  return Post;
};
