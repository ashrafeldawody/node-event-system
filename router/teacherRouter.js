const express = require('express');
const {body,param}=require("express-validator");
const urlRoutes = express.Router();
const Teacher = require('../models/teacher');

const controller = require('../controllers/teacherController');

let validationRules = [
    body('_id').isInt().withMessage("ID is not valid"),
    body('fullname').isString().withMessage("Name must contain only letters"),
    body('email').isEmail().withMessage("Email is not valid")
    .custom(value => {
        return Teacher.findOne({email: value})
           .then((data) => {
             if(data)
                return Promise.reject('Email already taken')
              return true
           })
     }),
    body('password').isStrongPassword().withMessage("Password Must contain atleast 1 characters(upper and lower),numbers,special characters"),
    body('image').isString().withMessage("Image is not valid"),
];
let idValidation = [
     param('id').isMongoId().withMessage("id is not valid")
]

urlRoutes.route("/")
.get(controller.getAll)
.post(validationRules, controller.create);

urlRoutes.route("/:id")
.get(idValidation,controller.get)
.put(idValidation,validationRules,controller.update)
.delete(idValidation,controller.delete);

module.exports = urlRoutes;
