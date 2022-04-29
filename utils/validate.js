const {validationResult} = require('express-validator');
exports.validate = (req) => {
    let result = validationResult(req);
    if(!result.isEmpty()){
        let all_msgs =result.array().reduce((sum,error)=> sum+error.msg+"   -   ","")
        throw new Error(all_msgs)
    }
}