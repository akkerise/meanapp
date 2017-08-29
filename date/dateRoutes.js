var express = require('express');
var router = express.Router();
var dateController = require('./dateController.js');

/*
 * GET
 */
router.get('/', dateController.list);

/*
 * GET
 */
router.get('/:id', dateController.show);

/*
 * POST
 */
router.post('/', dateController.create);

/*
 * PUT
 */
router.put('/:id', dateController.update);

/*
 * DELETE
 */
router.delete('/:id', dateController.remove);

module.exports = router;
