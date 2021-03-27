import express from 'express';
import {isAdmin, isLoggedIn} from '../middleware/authMiddleware';
import { EbwaError } from '../middleware/errorHandler';
import Post, {IPost} from '../schema/postSchema';
import {IUser} from '../schema/userSchema';

let postsApiRouter = express.Router();


postsApiRouter.get('/', isLoggedIn, async function(req: express.Request, res: express.Response, next: express.NextFunction){
    try {
        let posts:IPost[] = await Post.find();
        res.json({
            posts:posts
        })
    } catch(err){
        next(new EbwaError(err.message, 500, 500));
    }
})

postsApiRouter.post('/', isAdmin, async function(req: express.Request, res: express.Response, next: express.NextFunction){

    let user:IUser = <IUser>req.user;

    console.log(user.name);

    if(req.body.title && req.body.subject && req.body.message){
        try {
            let postCreated = await Post.create({
                title:req.body.title,
                subject:req.body.subject,
                message:req.body.message,
                date:new Date(),
                author:{
                    id: user._id,
                    name: user.name,
                    designation: user.designation
                }});
            res.json({
                post:postCreated
            })
        } catch(err){
            next(new EbwaError(err.message, 500, 500));
        }

    } else {
        next(new EbwaError('Incomplete Post Submitted', 200, 457))
    }
});

    
export default postsApiRouter;
    