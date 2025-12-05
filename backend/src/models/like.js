'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: { type: DataTypes.UUID, allowNull: false },
    user_id: { type: DataTypes.UUID, allowNull: false },
  }, {
    tableName: 'Likes',
    timestamps: true,
    underscored: true,
    indexes: [{ unique: true, fields: ['post_id', 'user_id'] }]
  });

  Like.associate = (models) => {
    Like.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
    Like.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Like;
};
