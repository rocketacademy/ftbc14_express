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
    await queryInterface.bulkInsert("classes", [
      {
        name: "Dual bladed sword fighting",
        description: "Learn to fight multiple enemies at once",
        full_time: true,
        teacher: "Don Dorrian",
      },
      {
        name: "The best cheesecakes",
        description: "Learn to make all the various cheesecakes ",
        full_time: false,
        teacher: "Betty Crooker",
      },
      {
        name: "How to build a forge",
        description:
          "Fufil your creativity by building and maintaining a black smiths forge. ",
        full_time: true,
        teacher: "Celebrimbor",
      },
      {
        name: "Mathematics and Computing",
        description: "Learn to hack a computer using amazing algorithms",
        full_time: false,
        teacher: "Elon Musk",
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
    await queryInterface.bulkDelete("classes", null, {});
  },
};
