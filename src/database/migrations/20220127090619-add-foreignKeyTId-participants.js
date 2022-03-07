"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("participants", "positionOne"),
        queryInterface.addColumn(
          "participants",
          "tId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: "tournaments",
              },
              key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    // return queryInterface.removeColumn("participants", "tId");
  },
};
