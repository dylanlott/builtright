var Build = require('../models/Build.js');
// var Util = require('Utilities.js');

module.exports = {

    create: function(req, res) {
        console.log("Create Build activated.", req.body);
        var newBuild = new Build(req.body);
        newBuild.owner = req.user.id;
        console.log("newBuild owner: ", newBuild.owner)
        newBuild.save(function(err, data) {
            if (err) {
                res.status(500).send(err).end();
            } else {
                res.status(200).json(data).end();
            }
        });
    },

    getAll: function(req, res) {
        console.log("get all builds: ", req.user);
        Build
            .find({
                owner: req.user._id,
                active: true
            })
            .exec()
            .then(function(data) {
                console.log("get all builds: ", data);
                res.status(200).json(data).end();
            })
            .catch(function(err) {
                res.status(500).send(err).end();
            })
    },

    getOne: function(req, res) {
        Build
            .findById(req.params.id)
            .then(function(data) {
                console.log("get One build: ", data);
                res.status(200).json(data).end();
            })
            .catch(function(err) {
                res.status(500).send(err).end();
            })
    },

    delete: function(req, res) {
        Build
            .findByIdAndRemove(req.params.id)
            .then(function(data) {
                console.log("delete build: ", data)
            })
            .catch(function(err) {
                res.status(500).send(err).end();
            })
    },

    addComment: function(req, res) {
        Build
            .findOne({
                _id: req.params.id
            }, function(err, build) {
                console.log("add comment, find build: ", build);
                build.comments.push({
                    body: req.body.body,
                    user: req.user._id
                })
                build.save(function(err, data) {
                    if (err) {
                        console.log("Error adding comment: ", err);
                        res.status(500).send("error: can't add comment.").end();
                    } else {
                        res.status(200).json(data).end();
                    }
                })
            });
    },

    addPart: function(req, res) {

        Build
            .update({
                _id: req.params.id
            }, {
                $push: {
                    parts: {
                        name: req.body.name,
                        url: req.body.url,
                        price: req.body.price
                    }
                },
                function(data, delta) {
                    console.log("addPart data: ", data);
                    console.log("addPart delta: ", delta);
                }
            })
    },

    calculateCost: function(req, res) {
        Build
            .findOne({
                _id: req.params.id
            }, function(err, build) {
                var total = 0;
                var arr = build.parts;

                for (var i = 0; i < build.parts.length; i++) {
                    console.log(arr[i]);
                    total += arr[i].price;
                }
                console.log("End total: ", total);
                var totalCost = {
                    "build": req.params.id,
                    "name": build.name,
                    "total_cost": total
                }
                res.status(200).json(totalCost).end();
            })
    },


    deleteComment: function(req, res) {
        Build.findOneAndUpdate({
                _id: req.params.id
            },
            function(err, build) {
                console.log("Build deleted: ", build);
                res.status(200).json(build).end();
            })
    }

}
