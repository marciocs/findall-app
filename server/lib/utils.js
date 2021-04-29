String.prototype.empty = function() {
    return this.length === 0 || this == " " || /^\s*$/.test(this);
}

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config');

module.exports = {

    error_handle : (is_dev, err) => {

        if(is_dev){
            throw err;
        }else{
            console.error(`[ERROR (${err.code})] =>`, err.message);
        }

    },

    check_params : (params) => {

        let valid = true;

        Object.keys(params).forEach((key) => {

            if(typeof params[key] == 'string' && params[key].empty()){
                valid = false;
            }
            
            if(typeof params[key] == 'number' && parseInt(params[key]) == NaN){
                valid = false;
            }

        });

        return valid;

    },

    get_session_id : (req, res) => {

        const token = req.headers.authorization.split(' ')[1];
        
        try{            
            const s_id = jwt.verify(token, config.security.session.sess_key);
            return parseInt(s_id.id);
        }catch(e){
            return res.status(401).json({ error : true, msg : 'Não autorizado(a)' });
        }


    },

    hash_password : (plain_password, callback) => {

        if (typeof callback != 'function') throw new Error('Invalid callback');

        bcrypt.genSalt(config.security.encryptation.salt_rounds, (err, salt) => {
            bcrypt.hash(plain_password, salt, (err, hash) => { callback(err, hash) });
        });

    },

    compare_password : (plain_password, hash, callback) => {

        if (typeof callback != 'function') throw new Error('Invalid callback');

        bcrypt.compare(plain_password, hash, (err, result) => { callback(err, result) });

    },


};