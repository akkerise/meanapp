var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController.js');

/*
 * GET
 */
router.get('/', apiController.list);

/*
 * GET
 */
router.get('/:id', apiController.show);

/*
 * POST
 */
router.post('/', apiController.create);

/*
 * PUT
 */
router.put('/:id', apiController.update);

/*
 * DELETE
 */
router.delete('/:id', apiController.remove);

module.exports = router;
