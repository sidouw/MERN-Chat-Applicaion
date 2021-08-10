const {Schema,model,ObjectId} = require('mongoose')
/************************** Room Schema **************************/
const roomSchema = new Schema({
 users : [{
     type : ObjectId,
     ref : 'user',
     required : true
 }]
},{
    timestamps:true
})

roomSchema.virtual('messages',{
    ref: 'message',
    localField :'_id',
    foreignField :'room'
})

const Room = model("room", roomSchema);
module.exports = Room;
