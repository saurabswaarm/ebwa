import mongoose, {Schema, Model} from 'mongoose';
import {IPost} from '../../types/postTypes';


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