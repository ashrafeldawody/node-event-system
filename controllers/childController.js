const {validate} = require('../utils/validate');
const Child = require('../models/child');


module.exports.getAll = (req, res,next) => {
    Child.find({}).then((data)=>{
        res.status(200).json({data})
    }).catch((err)=>{
        next(err)
    })
}

module.exports.get = (req, res,next) => {
    validate(req)

    Child.findById(req.params.id).then((data)=>{
        if(data == null) throw new Error("Child not found")
        res.status(200).json(data)
    }).catch((err)=>{
        next(err)
    })
}
module.exports.create = (req, res,next) => {
    validate(req);
    let childObj = new Child();
    childObj.fullname = req.body.fullname
    childObj.age = req.body.age
    childObj.level = req.body.level
    childObj.address = req.body.address
    childObj.save()
    .then((result)=>{
        if(result == null) throw new Error("Failed to create new child")
        res.status(200).send({"message":"Child Added Successfully"});
    }).catch((error)=>next(error))

}
module.exports.update = (req, res,next) => {
    validate(req);
    Child.findByIdAndUpdate(req.params.id,{
        $set:{
            fullname: req.body.fullname,
            age: req.body.age,
            level: req.body.level,
            address: {
                city: req.body.address.city,
                street: req.body.address.street,
                building: req.body.address.building
            } 
        }
    }).then((result)=>{
        if(result == null) throw new Error("Child not found")
        res.status(200).json({"message":"Child Updated Successfully"})
    }).catch((error)=>next(error))
}
module.exports.delete = (req, res,next) => {
    validate(req)
    Child.findByIdAndDelete(req.params.id)
    .then((result)=>{
        if(result == null) throw new Error("Child not found")
        res.status(200).json({"message":"Child Deleted Successfully"})
    }).catch((err)=>{
        next(err)
    })
}