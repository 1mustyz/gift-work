const Complain = require('../models/complain');
const randomstring = require("randomstring");

exports.create = async (activity) =>{
    const {req,res,next} = activity
    req.body.complainId = randomstring.generate(8)
    try {
        await Complain.collection.insertOne(req.body,{new:true})
        const result = await Complain.find({})
       return result
        
    } catch (error) {
        console.log(error)
    }
}

exports.findAll = async () => {
    let msg
    try {
        const result = await Complain.find({});
        result.length > 0
        ? msg = {"success": true, "message": result}
        : msg = {"success": false, "message": result}
        return msg
    } catch (error) {
        console.log(error)
        
    }
}