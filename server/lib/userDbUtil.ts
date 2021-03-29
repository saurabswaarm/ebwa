import {IUser, IUserF} from '../../types/authTypes'

export const trimUserObject = function(userObject:IUser){
    let trimmedUserObject:IUserF ={
        _id:userObject._id,
        name:userObject.name,
        email:userObject.email,
        cid:userObject.cid,
        designation:userObject.designation,
        admin:userObject.admin,
        phone:userObject.phone
    }
    return trimmedUserObject;
}

