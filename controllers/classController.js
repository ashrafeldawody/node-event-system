const { validate } = require('../utils/validate');
const Class = require('../models/class');
const mongoose = require("mongoose");


module.exports.getAll = (req, res, next) => {
    Class.find({}).then((data) => {
        res.status(200).json({data})
    }).catch((err) => {
        next(err)
    })
}

module.exports.get = (req, res, next) => {
    validate(req)

    Class.findById(req.params.id).then((data) => {
        if (data == null) throw new Error("Class not found")
        res.status(200).json(data)
    }).catch((err) => {
        next(err)
    })
}
module.exports.create = (req, res, next) => {
    validate(req);
    Class.create({
        name: req.body.name,
        supervisor: req.body.supervisor,
        children: req.body.children
    }).then((result) => {
        if (result == null) throw new Error("Failed to create new class")
        res.status(200).send({ "message": "Class Created Successfully" });
    }).catch((error) => {
        next(error)
    })

}
module.exports.update = (req, res, next) => {
    validate(req);
    Class.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            supervisor: req.body.supervisor,
            children: req.body.children
        }
    }).then((result) => {
        if (result == null) throw new Error("Class not found")
        res.status(200).json({ "message": "Class Updated Successfully" })
    }).catch((error) => next(error))
}
module.exports.delete = (req, res, next) => {
    validate(req)
    Class.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result == null) throw new Error("Class not found")
            res.status(200).json({ "message": "Class Deleted Successfully" })
        }).catch((err) => {
            next(err)
        })
}
module.exports.children = (req, res, next) => {
    validate(req)
    Class.findById(req.params.id).then((data) => {
        if (data == null) throw new Error("Class not found")
        res.status(200).json(data.children)
    }).catch((err) => {
        next(err)
    })
}
module.exports.teacher = (req, res, next) => {
    validate(req)
    Class.findById(req.params.id).then((data) => {
        if (data == null) throw new Error("Class not found")
        res.status(200).json(data.teacher)
    }).catch((err) => {
        next(err)
    })}