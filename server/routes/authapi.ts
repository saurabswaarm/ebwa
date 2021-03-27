import express from 'express';
const authApiRouter = express.Router();
import User, { IUser } from '../schema/userSchema';
import { EbwaError } from '../middleware/errorHandler';
// import logger from '../logger';
import passport from 'passport';

import sendMail from '../lib/mailerModule';
import { isLogInNecessary } from '../middleware/authMiddleware';

authApiRouter.post('/createaccount', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  // logger('boop');
  try {

    let user:IUser = await User.findOne({ email: req.body.email }).exec();

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
                message: 'Account details have been mailled to '+ info.accepted[0],
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
        code:2,
        payload:{
          user
        }
      });
    })
  })(req, res, next);

});

authApiRouter.post('/logout', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let user = <IUser>req.user!;
  req.session.destroy((err) => {
    if (err) { return next(err) }
    res.clearCookie('session-ebwa');
    req.logOut();
    res.json({
      code:3,
      payload:{
        userEmail:user.email
      }
    })
  });
})


export default authApiRouter