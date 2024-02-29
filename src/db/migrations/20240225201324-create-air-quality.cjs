"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("air_qualities", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            city: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            ts: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            aqius: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            mainus: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            aqicn: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            maincn: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("air_qualities");
    },
};
