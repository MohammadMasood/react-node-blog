module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE "Posts" (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "title" VARCHAR(255),
        "description" TEXT,
        "user_id" INTEGER REFERENCES "Users"(id) ON DELETE CASCADE,
        "created_at" TIMESTAMP WITH TIME ZONE,
        "updated_at" TIMESTAMP WITH TIME ZONE
      );
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE "Posts";`);
  }
};
