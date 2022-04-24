const Doc = require("../models/docModel");
const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");

const getDocs = asyncHandler(
    async(req,res) => {
        const docs = await Doc.find({user:req.user._id})
        res.json(docs)
    }
)
const createDoc = asyncHandler(
    async(req,res) => {
        const {title, content,category} = req.body;

        if(!title || !content || !category){
            res.status(400)
            throw new Error("Please fill the fields");
        }
        else{
            const doc = new Doc({user: req.user._id, title, content, category});
            const createdDoc = await doc.save();
            res.status(201).json(createdDoc);  
        }
    }
)

const getDocByID = asyncHandler(
    async (req,res) => {
        const doc = await Doc.findById(req.params.id);

        if(doc){
            res.json(doc);
        }else{
            res.status(404).json({message:"Document not found"});
        }
        res.json(doc);
    }
)
const updateDoc = asyncHandler(
    async(req,res) => {
        const {title,content,category} = req.body;

        const doc = await Doc.findById(req.params.id);

        if(doc.user.toString()!== req.user._id.toString()){
            res.status(401);
            throw new Error("You can not perform this action");
        }
        if(doc){
            doc.title = title;
            doc.content = content;
            doc.category = category;

            const updatedDoc = await doc.save();
            res.json(updatedDoc); 
        }else{
            res.status(404);
            throw new Error("Document not found");
        }
    }
)

const deleteDoc = asyncHandler(
    async(req,res) => {
        const doc = await Doc.findById(req.params.id);
        if(doc.user.toString()!== req.user._id.toString()){
            res.status(401);
            throw new Error("You can not perform this action");
        }
     if(doc){
         await doc.remove();
         res.json({message:"Document Removed"});
     }
     else{
        res.status(404);
        throw new Error("Document not found"); 
     }
     
     
    } 
)


module.exports = {getDocs, createDoc, getDocByID,updateDoc,deleteDoc}