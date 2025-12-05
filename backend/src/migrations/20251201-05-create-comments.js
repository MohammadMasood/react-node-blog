module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE "Comments" (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "text" TEXT,
        "post_id" INTEGER REFERENCES "Posts"(id) ON DELETE CASCADE,
        "user_id" INTEGER REFERENCES "Users"(id) ON DELETE CASCADE,
        "created_at" TIMESTAMP WITH TIME ZONE,
        "updated_at" TIMESTAMP WITH TIME ZONE
      );
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE "Comments";`);
  }
};
