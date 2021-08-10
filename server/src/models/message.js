const {Schema,model,ObjectId} = require('mongoose');
/************************** Message Schema **************************/
const messageSchema = new Schema({
    sender :{
        type:ObjectId,
        required:true
    },
    room :{
        type:ObjectId,
        required:true
    },
    body :{
        type:String,
        required:true
    },
    icat:{
        type:Number
    },
    Media:[String]  //url of pictures and stuff 
}
);
const Message = model("message", messageSchema);
module.exports = Message;