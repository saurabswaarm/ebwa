import mongoose, {Schema, Model, Document} from 'mongoose';

export interface IPost extends Document  {
    _id?:number,
    title:string,
    subject:string,
    message:string,
    date:Date,
    author:{
        id:string,
        name:string,
        designation:string
    }
}


let postSchema:Schema<IPost> = new Schema({
   title:{type:String},
   subject:{tpye:String},
   message:{type:String},
   date:{type:Date},
   author:{
       id:{type:String},
       name:{type:String},
       designation:{type:String}
   }
})

let Post: Model<IPost> = mongoose.model('posts', postSchema);

export default Post;