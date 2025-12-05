module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE "PostImages" (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "post_id" INTEGER REFERENCES "Posts"(id) ON DELETE CASCADE,
        "url" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE,
        "updated_at" TIMESTAMP WITH TIME ZONE
      );
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE "PostImages";`);
  }
};
