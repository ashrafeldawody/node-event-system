const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

module.exports =  (req, res, next) => {
    const token = req.headers["authorization"] || req.body.token || req.query.token;
    if (!token) {
        let error = new Error("A token is required for authentication");
        error.status = 403;
        throw error
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(decoded)
      if(req.user.isAdmin)
        return next();
    } catch (err) {
        let error = new Error("Token is not correct, Login Again");
        error.status = 401;
        next(error)
    }
    let error = new Error("Unauthorized Access");
    error.status = 401;
    next(error)
  };
  