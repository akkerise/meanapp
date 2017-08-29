var dateModel = require('./dateModel.js');

/**
 * dateController.js
 *
 * @description :: Server-side logic for managing dates.
 */
module.exports = {

    /**
     * dateController.list()
     */
    list: function (req, res) {
        dateModel.find(function (err, dates) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting date.',
                    error: err
                });
            }
            return res.json(dates);
        });
    },

    /**
     * dateController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        dateModel.findOne({_id: id}, function (err, date) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting date.',
                    error: err
                });
            }
            if (!date) {
                return res.status(404).json({
                    message: 'No such date'
                });
            }
            return res.json(date);
        });
    },

    /**
     * dateController.create()
     */
    create: function (req, res) {
        var date = new dateModel({

        });

        date.save(function (err, date) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating date',
                    error: err
                });
            }
            return res.status(201).json(date);
        });
    },

    /**
     * dateController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        dateModel.findOne({_id: id}, function (err, date) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting date',
                    error: err
                });
            }
            if (!date) {
                return res.status(404).json({
                    message: 'No such date'
                });
            }

            
            date.save(function (err, date) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating date.',
                        error: err
                    });
                }

                return res.json(date);
            });
        });
    },

    /**
     * dateController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        dateModel.findByIdAndRemove(id, function (err, date) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the date.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
