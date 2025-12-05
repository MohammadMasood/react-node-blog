'use strict';

module.exports = {
  up: async (queryInterface) => {
    // create simple post and an image row
    const post_id = '1';
    await queryInterface.bulkInsert('Posts', [{
      title: 'Welcome to Local Blog',
      description: 'This is a seeded post for development.',
      user_id: '1',
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    await queryInterface.bulkInsert('PostImages', [{
      post_id: post_id,
      url: '/uploads/seed-sample.jpg',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('PostImages', { url: '/uploads/seed-sample.jpg' }, {});
    await queryInterface.bulkDelete('Posts', { title: 'Welcome to Local Blog' }, {});
  }
};
