import {Document} from 'mongoose';P

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