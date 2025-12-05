'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'Users',
    timestamps: true,
    underscored: true,
  });

  User.beforeCreate(async (user) => {
    if (user.password) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }
  });

  User.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    User.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
    User.hasMany(models.Like, { foreignKey: 'user_id', as: 'likes' });
  };

  return User;
};
