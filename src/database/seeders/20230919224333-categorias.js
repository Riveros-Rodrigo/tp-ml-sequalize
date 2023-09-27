'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Categories', [{ // bulkInsert inserta varios registros a la vez
      name: 'Ultima visita',
      image: null,
      createdAt : new Date(), //lo mando en formato js y sequelize se encarga de pasarlo a sql
      updatedAt : new Date()
    },
    { 
      name: 'En oferta',
      image: null,
      createdAt : new Date(), 
      updatedAt : new Date()
    }
  ], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
