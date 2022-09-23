import crudModel from "../model/crud.js";
import path from "path";
import fs from 'fs'
import  GraphQLUpload  from "graphql-upload/GraphQLUpload.js";
import fileModel from "../model/file.js";
import { v4 as uuidv4 } from 'uuid';


const __dirname = path.resolve();


export const resolvers = {

  Upload: GraphQLUpload,
  Query: {
    getAll: async () => {
      return await crudModel.find();
    },
    getById: async (parent,args) => {
     // console.log(args);
      return await crudModel.findById({_id:args.id});
    },
  },
  Mutation: {
    createPost: async (parent,args, context, info) => {
      console.log(args.post.file);
      const { file,...rest } = args.post;
      const body = {...rest}
      const { createReadStream, filename, mimetype } = await file;
      const stream = createReadStream();
      const assetUniqName = uuidv4()+filename;
      const pathName = path.join(__dirname, `public/images/${assetUniqName}`);
      await stream.pipe(fs.createWriteStream(pathName));
      const url = `http://localhost:8000/images/${assetUniqName}`;
      const newPost = {...body,file:assetUniqName}
      const post = await new crudModel(newPost).save();
      console.log(post);
      return post;
    },
    updatePost: async (parent, args, context, info) => {
     try{
      const {id, file,...rest} = args.post; 
      const newUser={...rest}
      const savedUser=await crudModel.findById({_id:id});
      if(savedUser){
        if(file){
          const { createReadStream, filename, mimetype } = await file;
          const stream = createReadStream();
          const assetUniqName = uuidv4()+filename;
          const pathName = path.join(__dirname, `public/images/${assetUniqName}`);
          await stream.pipe(fs.createWriteStream(pathName));
          newUser.file=assetUniqName;
          if(assetUniqName){
            fs.unlink(path.join(__dirname, `public/images/${savedUser.file}`), (err) => {
              if (err) {
                  console.log(err);
              }
            });
          }
        }
        const post = await crudModel.findByIdAndUpdate({_id:id},newUser,{new:true});
        return post;
      }
     }
     catch(err){
       throw err;
     }
    },

    deletePost:async(parent,args,context,info)=>{
        const {id} = args;
        const savedUser=await crudModel.findById({_id:id});
        if(savedUser?.file){
          fs.unlink(path.join(__dirname, `public/images/${savedUser.file}`), (err) => {
            if (err) {
                console.log(err);
            }
          });
        }
        await crudModel.findByIdAndDelete(id);
        return "delete";
    },

    uploadFile: async (_, { file }) => {
      const { createReadStream, filename, mimetype } = await file;
      const stream = createReadStream();
      const assetUniqName = uuidv4()+filename;
      const pathName = path.join(__dirname, `public/images/${assetUniqName}`);
      await stream.pipe(fs.createWriteStream(pathName));
      const url = `http://localhost:8000/images/${assetUniqName}`;
      await new fileModel({file:assetUniqName}).save();
      return url;
      // return { url };
    },
  },
};
