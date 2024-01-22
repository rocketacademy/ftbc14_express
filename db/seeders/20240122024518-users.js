"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        first_name: "Bob",
        last_name: "Clintwood",
        gender: true,
        email: "bob@clintwood.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Jessica",
        last_name: "Burton",
        gender: false,
        email: "jess@buton.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Joey",
        last_name: "Surfsup",
        gender: true,
        email: "joey@surfsup.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
