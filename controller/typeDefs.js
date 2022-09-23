import { gql } from "apollo-server-express";
export const typeDefs = gql`

scalar Upload

type File{
    url:String!
    mimetype:String!
    encoding:String!
}

type Post {
    id:ID,
    title:String, 
    description:String
    file:String!
}

type Query {
  getAll:[Post]
  getById(id:ID!):Post!
}

input PostInput{
    title:String,
    description:String
    file:Upload!
}
input PostUpdateInput{
    title:String,
    description:String
    file:Upload
    id:ID
}

type Mutation{
    createPost(post:PostInput):Post!
    updatePost(post:PostUpdateInput):Post!
    deletePost(id:String):Post
    uploadFile(file:Upload!):File!
}
`;

