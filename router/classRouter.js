const express = require('express');
const {body,param}=require("express-validator");
const urlRoutes = express.Router();
const Child = require('../models/child');
const Teacher = require('../models/teacher');
const mongoose = require("mongoose");

const controller = require('../controllers/classController');

let validationRules = [
    body('name').isString().withMessage("Name must contain only letters"),
    body('supervisor').isMongoId().withMessage("Childrens must be valid supervisor id")
    .custom(id => {
        return Teacher.findById(mongoose.Types.ObjectId(id))
           .then((data) => {
               console.log(data)
             if(!data)
                return Promise.reject('Supervisor ID doesn\'nt exist')
              return true
           })
     }),
    body('children').isArray().withMessage("Childrens must be array of childs id's"),
    body('children.*').isInt().withMessage("Child ID is not valid")
    .custom(id => {
        return Child.findById(id)
           .then((data) => {
               console.log(data)
             if(!data)
                return Promise.reject('Children ID doesn\'nt exist')
              return true
           })
     }),
];

let idValidation = [
    param('id').isInt().withMessage("id is not valid")
]

urlRoutes.route("/")
.get(controller.getAll)
.post(validationRules, controller.create);

urlRoutes.route("/:id")
.get(idValidation,controller.get)
.put(idValidation,validationRules,controller.update)
.delete(idValidation,controller.delete);

urlRoutes.get("/children/:id",controller.children);
urlRoutes.get("/teacher/:id",controller.teacher);

module.exports = urlRoutes;
