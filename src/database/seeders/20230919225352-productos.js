'use strict';
const productsJSON = require('../../data/productsDataBase.json')

const products = productsJSON.map(({name, price, discount, description, image, category} )=> { // el map me trae el mismo array pero modificado
  return {
    name,
    price,
    discount,
    description,
    image,
    categoryId: category === 'visited' ? 1 : 2,
    createdAt : new Date(), //lo mando en formato js y sequelize se encarga de pasarlo a sql
    updatedAt : new Date()
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Products', products, {});// bulkInsert inserta varios registros a la vez
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

