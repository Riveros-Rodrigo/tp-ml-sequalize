const express = require('express');
const { list, show, create, update, destroy } = require('../controllers/adminController');
const router = express.Router();

/*** /apis/products***/ 
router
    .get('/', list)
    .get('/:id', show)
    .post('/', create)
    .put('/:id', update)
    .delete('/:id', destroy)

module.exports = router;
