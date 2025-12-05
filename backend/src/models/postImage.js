'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostImage = sequelize.define('PostImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: { type: DataTypes.UUID, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'PostImages',
    timestamps: true,
    underscored: true,
  });

  PostImage.associate = (models) => {
    PostImage.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  };

  return PostImage;
};
