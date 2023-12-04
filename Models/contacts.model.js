const mongoose=require("mongoose");

const contactSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    label:String,
    booked_slots:[String]
   
},
{
    versionKey:false
}
)

const contactModel = mongoose.model("contact",contactSchema)
module.exports=contactModel;