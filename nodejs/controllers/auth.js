const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.adduser = (req, res) => {
    // console.log("req.body", req.body);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            username,
            address,
            contact,
            email
        } = fields;

        if (
            !username ||
            !address ||
            !contact ||
            !email 
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
       
       
        let product = new User(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            console.log(fs.readFileSync(files.photo.path));
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.display = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
   

    User.find()
        
        .sort([[sortBy, order]])
      
        .exec((err, User) => {
            if (err) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            res.json(User);
        });
};

exports.remove = (req, res) => {
    User.remove({
        _id: req.params._id
    }, function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Deleted' });
    });
    
};

exports.update = (req, res,next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
               delete fields.photo;
    
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            data = fs.readFileSync(files.photo.path);
            contentType = files.photo.type;
            fields["photo.data"]=data;
            fields["photo.contentType"]=contentType;
        }
        
        try{
            const id=req.params.id;
            const options={new:true};
            const result=await User.findByIdAndUpdate(id,fields,options);
            res.send(result);
        }catch(error){
            console.log(error.message);
        }
    });
};

exports.displaybyid = (req, res) => {

    User.find({ _id: req.params.id})

        .exec((err, User) => {
            if (err) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            res.json(User);
        });
};

exports.displayimg = (req, res) => {
    User.findOne({ _id: req.params.id }, function(err, results){
     if (err) {
                 return res.status(400).json({
                     error: "User not found"
                 });
             }
          res.setHeader('content-type', results.photo.contentType);
          res.send(results.photo.data);
       });
 };