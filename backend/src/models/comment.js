'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'Comments',
      timestamps: true,          // automatically manage timestamps
      underscored: true,         // snake_case column names
      createdAt: 'created_at',   // explicitly map timestamps
      updatedAt: 'updated_at',
      freezeTableName: true,     // prevent pluralizing table name
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id',
      as: 'post',
    });

    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Comment;
};
