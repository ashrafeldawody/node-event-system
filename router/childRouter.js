const express = require('express');
const {body,param}=require("express-validator");
const urlRoutes = express.Router();
const isAdminMiddleware = require("./../middlewares/isAdminMiddleware");
const mongoose = require("mongoose");

const controller = require('../controllers/childController');

let validationRules = [
    body('fullname').isString().withMessage("Name must contain only letters"),
    body('age').isInt().withMessage("Age is not valid"),
    body('level').isIn(['PreKG','KG1','KG2']).withMessage("Level must be PreKG, KG1 or KG2"),
    body('address.city').isString().withMessage("City name is not valid"),
    body('address.street').isString().withMessage("Street name is not valid"),
    body('address.building').isInt().withMessage("Building Number is not valid"),
];


let idValidation = [
    param('id').isInt().withMessage("id is not valid")
]

urlRoutes.route("/")
.get(controller.getAll)
.post(isAdminMiddleware,validationRules, controller.create);

urlRoutes.route("/:id")
.get(idValidation,controller.get)
.put(idValidation,validationRules,controller.update)
.delete(idValidation,controller.delete);

module.exports = urlRoutes;
