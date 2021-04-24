/**
 * 
 * @author Daniel Victor Freire Feitosa
 * @version 0.0.1
 * @package config.js
 */

module.exports = {

    server : {
        http_port : 80,
        https_port : 443
    },
    mysql : {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'db_findall'
    },

    security : {
        session : {
            sess_key : '$2b$10$zzNkvLHEUdWqiCLC306I0evit4YfmOXtaxirlcw51d/Qq5ZSKYbVS',
            sess_timeout : 60 * 30, // 30 minutos
            sess_timeout_max : (60 * 60 * 24) * 7 // 7 dias
        },
        cookies : {
            secret : '$2b$10$RPmLbyZBnXPxGZwuH0jp5uAhQeK/VrBlY8TfX/OfQN5iDQreOhmmK'
        },
        encryptation : {
            algorithm : 'aes256',
            salt_rounds : 10
        }
    },

    google : {
        analitytcs : {

        },
        ouath2 : {

        }
    },

    dev : true,

};