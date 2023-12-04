const express = require("express");
const contactModel = require("../Models/contacts.model");


const contactsRouter = express.Router()

//All routes
contactsRouter.get("/contacts",async(req,res)=>{
   
    try {
        const query = req.query
        const contacts = await contactModel.find(query)
        res.status(200).json({msg:"All contacts",contacts})
    } catch (error) {
        res.status(500).json({msg:error})
    }
})

contactsRouter.post("/contacts",async(req,res)=>{
    
    try {
     const newContact = new contactModel(req.body);
     await newContact.save();
     res.status(200).json({msg:"New Contact Added Successfully",newContact})
        
    } catch (error) {
        
    res.status(500).json({msg:error})
}
})

contactsRouter.patch("/contacts/edit/:id",async(req,res)=>{
    const {id} = req.params;
    const payload = req.body;

    try {
        const contact = await contactModel.findById({_id:id})
        if(contact){
            await contactModel.findByIdAndUpdate({_id:id},payload)

        }
        res.status(200).json({msg:`Contact with id ${id} Updated Successfull`,payload})
        
    } catch (error) {
        
    res.status(500).json({msg:error})
}
})

contactsRouter.delete("/contacts/delete/:id",async(req,res)=>{
    const {id} = req.params;
 

    try {
        const contact = await contactModel.findById({_id:id})
        if(contact){
            await contactModel.findByIdAndDelete({_id:id})

        }
        res.status(200).json({msg:`Contact with id ${id} Deleted Successfull`,contact})
        
    } catch (error) {
        
    res.status(500).json({msg:error})
}
})

module.exports=contactsRouter