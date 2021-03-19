let mongoose = require('mongoose');
let genpass = require('generate-password');
let bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: String,
    activated: Boolean,
    cid: String,
    passHash: {
        type:String,
        required:true
    },

});

userSchema.methods.activateAccount = async function(){

    let password = genpass.generate({
        length:5,
        numbers:false
    });
    
    try {
        let passHash = await bcrypt.hash(password,10);
        this.passHash = passHash ? passHash : this.passHash;
        return [password, passHash];
    } catch(err) {
        throw mongoose.Error('Failled to activate account');
    }

}

let User = mongoose.model('users', userSchema);


export default User;