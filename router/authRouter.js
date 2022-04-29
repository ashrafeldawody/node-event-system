const express = require('express');
const Teacher = require('../models/teacher');
const {body,param,oneOf,check}=require("express-validator");
const urlRoutes = express.Router();

const controller = require('../controllers/teacherController');
let validationRules = [
  body('fullname').isString().withMessage("Name must contain only letters"),
  body('email').isEmail().withMessage("Email is not valid")
  .custom(value => {
    return Teacher.findOne({email: value})
       .then((data) => {
         if(data)
            return Promise.reject('Email already taken')
       })
 }),
  body('password').isStrongPassword().withMessage("Password Must contain atleast 1 characters(upper and lower),numbers,special characters"),
  body('image').isString().withMessage("Image is not valid"),
];


urlRoutes.post('/login',
[
  oneOf([
    body('username').equals('admin').withMessage("User is not an admin"),
    body('email').isEmail().withMessage("Email is not valid"),
  ]),
  body('password').isStrongPassword().withMessage("Password Must contain atleast 1 characters(upper and lower),numbers,special characters"),
] , controller.login)

urlRoutes.post('/register', validationRules,controller.create)

module.exports = urlRoutes;
