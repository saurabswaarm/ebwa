import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { IUser, IUserM } from "../../types/authTypes";
import { PassportStatic } from "passport";


function passportInit(passport: PassportStatic, User:IUserM ) {
    async function authenticateLocal(email: String, password: String, done: Function) {
        try {
            let user:IUser = await User.getUserByEmail(email);
            if (!user) return done(null, false, { message: 'Email Id Does not exist' });
            let activated = user.activated;

            let validated = false;
            if (user.passHash) {
                validated = await bcrypt.compare(password, user.passHash);
            }

            if (validated && activated) {
                return done(null, user);
            } else if (!activated) {
                return done(null, false, {
                    message: 'Please Activate Your Account first',
                    link: '/createaccount'
                });

            } else {
                return done(null, false, { message: 'Incorrect Password' });
            }

        } catch (err) {
            done(err, false, { message: err.message });
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateLocal));

    passport.serializeUser(function (user:IUser, done:Function) {
        console.log('Serialized:' + user.email);
        done(null, user._id);
    })

    passport.deserializeUser(async function (id: string, done: Function) {
        try {
            let user = await User.getUserById(id)
            console.log('Deserialized:' + user.email);
            done(null, user);
        } catch (err) {
            done(err);
        }
    })
}

export default passportInit;