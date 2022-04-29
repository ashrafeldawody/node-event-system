const { validate } = require('../utils/validate');
const Teacher = require('../models/teacher');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.getAll = (req, res) => {
    Teacher.find({})
    .then((data) => {
        res.status(200).json({data})
    }).catch((err) => {
        next(err)
    })
}

module.exports.get = (req, res) => {
    validate(req)
    Teacher.findById(req.params.id)
    .then((data) => {
        if (data == null) throw new Error("Teacher not found")
        res.status(200).json(data)
    }).catch((err) => {
        next(err)
    })}
module.exports.create = (req, res,next) => {
    validate(req);
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);
    Teacher.create({
        fullname: req.body.fullname,
        email: req.body.email,
        image: req.body.image,
        password: hashedPassword
    }).then((user) => {
        if (!user) throw new Error("There was a problem registering the user.")
        res.status(200).send({"message": "Successfully Registered"});
    }).catch((error) => {
        next(error)
    })


}
module.exports.update = (req, res) => {
    validate(req);
    Teacher.findByIdAndUpdate(req.params.id, {
        $set: {
            fullname: req.body.fullname,
            email: req.body.email,
            image: req.body.image,
            password: hashedPassword
        }
    }).then((result) => {
        if (result == null) throw new Error("Teacher not found")
        res.status(200).json({ "message": "Teacher Updated Successfully" })
    }).catch((error) => next(error))
}
module.exports.delete = (req, res) => {
    validate(req)

    Teacher.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result == null) throw new Error("Teacher not found")
            res.status(200).json({ "message": "Teacher Deleted Successfully" })
        }).catch((err) => {
            next(err)
        })
}

module.exports.login = (req, res) => {
    validate(req)
    Teacher.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).json({ "message": "Error on the server" });
        if (!user) return res.status(404).json({ "message": "User Not Found" });

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });
}

