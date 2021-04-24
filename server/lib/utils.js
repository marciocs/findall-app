String.prototype.empty = () => {
    
    var str = this;
    
    if(str.length == 0 || str == null || str == '' || !str) 
        return true;
    return false;

};

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

        if(params.length==0){
            return false;
        }

        for(let i = 0; i < params.length; i++){

            if(typeof params[i] == 'str' && params[i].empty()){
                return { error : true, msg : 'Campo(s) inválido(s)' };
            }else if(typeof params[i] == 'number' && parseInt(params[i]) == NaN){
                return { error : true, msg : 'Campo(s) inválido(s)' };
            }

        }

        return true;

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