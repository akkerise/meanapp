var apiModel = require('../models/apiModel.js');

/**
 * apiController.js
 *
 * @description :: Server-side logic for managing apis.
 */
module.exports = {

    /**
     * apiController.list()
     */
    list: function (req, res) {
        apiModel.find(function (err, apis) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting api.',
                    error: err
                });
            }
            return res.json(apis);
        });
    },

    /**
     * apiController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        apiModel.findOne({_id: id}, function (err, api) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting api.',
                    error: err
                });
            }
            if (!api) {
                return res.status(404).json({
                    message: 'No such api'
                });
            }
            return res.json(api);
        });
    },

    /**
     * apiController.create()
     */
    create: function (req, res) {
        var api = new apiModel({

        });

        api.save(function (err, api) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating api',
                    error: err
                });
            }
            return res.status(201).json(api);
        });
    },

    /**
     * apiController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        apiModel.findOne({_id: id}, function (err, api) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting api',
                    error: err
                });
            }
            if (!api) {
                return res.status(404).json({
                    message: 'No such api'
                });
            }

            
            api.save(function (err, api) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating api.',
                        error: err
                    });
                }

                return res.json(api);
            });
        });
    },

    /**
     * apiController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        apiModel.findByIdAndRemove(id, function (err, api) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the api.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
