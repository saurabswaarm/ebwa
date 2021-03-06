import express, { response } from 'express';
const authApiRouter = express.Router();
import User from '../schema/userSchema';
import { IUserD, IUser } from '../../types/authTypes'
import { EbwaError } from '../middleware/errorHandler';
// import logger from '../logger';
import passport from 'passport';

import sendMail from '../lib/mailerModule';
import { isAdmin, isLogInNecessary } from '../middleware/authMiddleware';
import { trimUserObject } from '../lib/userDbUtil';
import { create } from 'node:domain';

authApiRouter.post('/createaccount', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  // logger('boop');
  try {

    let user: IUserD = await User.findOne({ email: req.body.email }).exec();

    if (user) {

      if (user.activated) {
        next(new EbwaError('User already activated, please login', 200, 2, '/login'))
      } else {

        try {
          let [password, passHash] = await user.activateAccount()
          let message = 'Your EBWA portal password is ' + password;
          let activatedUser = await user.save();

          if (password && activatedUser) {
            let info = await sendMail(req.body.email, "Welcome to EBWA", message);
            console.log(info);
            res.json({
              code: 1,
              payload: {
                message: 'Account details have been mailled to ' + info.accepted[0],
                redirect: '/login'
              }
            })
          }
        } catch (err) {
          user.activated = false;
          await user.save();
          next(new EbwaError('Failled to generate a password or send mail, reverting user to inactive, please try again or contant sys admin.', 500, 500));
        }
      }
    } else {
      next(new EbwaError('User not found, we have not yet received or processed your records.', 200, 455));
    }

  } catch (err) {
    console.log(err);
    next(new EbwaError(err.message, 500, 500));
  }
});

authApiRouter.post('/login', isLogInNecessary, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return next(new EbwaError(info, 401, 401))
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.json({
        code: 2,
        payload: {
          user: trimUserObject(user)
        }
      });
    })
  })(req, res, next);

});

authApiRouter.post('/logout', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.user) {
    let user = <IUser>req.user!;
    console.log('logging out ' + user.email);

    req.session.destroy((err) => {
      if (err) { return next(new EbwaError(err.message, 200, 458)) }
      req.logOut();
      res.clearCookie('session-ebwa');
      res.json({
        code: 3,
        payload: {
          userEmail: user.email
        }
      })
    });
  } else {
    next(new EbwaError('No such session exists', 401, 401))
  }

})

authApiRouter.get('/resumesession', (req: express.Request, res: express.Response, next: express.NextFunction) => {

  if (req.user) {
    let user = <IUser>req.user!;
    res.json({
      code: 2,
      payload: {
        user: trimUserObject(user)
      }
    });
  } else {
    next(new EbwaError('No such session exists', 401, 401))
  }
})

authApiRouter.post('/adduser', isAdmin, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
console.log('add user route fired'+req.body.email);
  if (req.user && req.body.email && req.body.phone && req.body.name && req.body.cid) {
    let user = <IUser>req.user!;

    try {
      let userWithExistingEmail = await User.findOne({ email: req.body.email });
      let userwithExistingCID = await User.findOne({ cid: req.body.cid });

      if (userWithExistingEmail !== null || userwithExistingCID !== null) {
        next(new EbwaError('Cannot create user as they already exist', 200, 459))
      }

      let createdUser = await User.create({
        email: req.body.email,
        phone: req.body.phone,
        name: req.body.name,
        cid: req.body.cid,
        verified: true,
        activated:false,
        verifiedBy: {
          _id: user._id,
          name: user.name,
          cid: user.cid
        },
        designation:'MC Member',
        admin:false
      });
  
      res.json({
        code: 6,
        payload: {
          user: createdUser
        }
      });

      console.log('user created'+ createdUser.email);

    } catch(err) {
      next(new EbwaError(err.message, 500, 500))
    }

    
  } else {
    next(new EbwaError('Incomplete user data submitted', 200, 460));
  }
})


export default authApiRouter