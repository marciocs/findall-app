/**
 * 
 * @author Daniel Victor Freire Feitosa
 * @version 0.0.1
 * @package server.js
 */

String.prototype.replaceAll = () => {

    var str = this;

};

String.prototype.empty = () => {
    
    var str = this;
    
    if(str.length == 0 || str == null || str == '' || !str) 
        return true;
    return false;

};

String.prototype.sqlSafe = () => {

    var str = this;

};

Array.prototype.in_array = (needle) => {

    var arr = this;

    for(let i = 0; i < arr.length; i++){
        if(arr[i].toLowerCase().indexOf(needle.toLowerCase())) return true;
    }

    return false;

};

// imports
const express = require('express');
const app = express();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require('http');
const https = require('https');
const fs = require('fs');

//libs da app
const utils = require('./lib/utils');
const config = require('./lib/config');
const middlewares = require('./lib/middlewares');
const { exit } = require('process');
const cursor = mysql.createConnection(config.mysql);

cursor.connect(function(err){
    if(err) utils.error_handle(config.dev, err);
});

app.use(helmet());
app.use(cors());
//app.use(middlewares.redirect_https);
app.use(cookieParser(config.security.cookies.secret));
app.use(express.urlencoded({ extended : false }));
app.use(express.json())

app.get('/', middlewares.csrf_verification, (req, res, next) => {
    res.status(200).send('index');
});

// cadastrar usuarios
app.post('/register', middlewares.csrf_verification, (req, res, next) => {
    
    const check = utils.check_params(req.body);

    if(!check){
        return res.json(check);
    }else{

        const { nome, usuario, senha, email, tipo, endereco, telefone, cpf } = req.body;

        utils.hash_password(senha, (err, hash) => {

            if (err) utils.error_handle(config.dev, err);

            cursor.query(`INSERT INTO usuarios (nome,usuario,senha,email,tipo,pontos,endereco,telefone,cpf) VALUES (?,?,?,?,?,?,?,?,?)`, [nome,usuario,email,hash,tipo,endereco,telefone,cpf], (err, results) => {
    
                if(err) utils.error_handle(config.dev, err);

                if(tipo == 'CLIENTE'){
                
                    cursor.query(`INSERT INTO configuracao_pontos (valor,pontos,usuario_id) VALUES (?,?,?)`, [1,1,results.insertId], (_err, _results) => {

                        if (_err) utils.error_handle(config.dev, _err);

                        return res.json({ error : false, msg : 'Cadastrado(a) com sucesso' });

                    });
                
                }
                
                return res.json({ error : false, msg : 'Cadastrado(a) com sucesso' });
    
            });

        });

    }

});

// login diferenciando cliente do usuario
app.post('/login', middlewares.csrf_verification, (req, res, next) => {

    console.log(req.body);

    if(!cursor) return res.status(500).json({ error : true, msg : 'Erro na conexão com a base de dados' });

    const { usuario_email, senha, stay_connected } = req.body;

    if(typeof usuario_email != 'string'){
        return res.json({ error : true, msg : 'Usuário/Email inválido' });
    }

    if(typeof senha != 'string'){
        return res.json({ error : true, msg : 'Senha inválida' });
    }

    if((usuario_email || senha) == null){
        return res.json({ error : true, msg : 'Preencha todos os campos' });
    }

    if(usuario_email.empty() || senha.empty()) return res.json({ error : true, msg : 'Usuário e/ou senha não preenchido(s) ' });

    cursor.query(`SELECT id,senha FROM usuarios WHERE usuario = ? OR email = ?`, [usuario_email,usuario_email], (err, results) => {

        if (err) utils.error_handle(config.dev, err);

        if(results.length>0){

            utils.compare_password(senha, results[0].senha, (_err, result) => {

                if(_err) utils.error_handle(config.dev, _err);

                if(result){

                    const sess_timeout = stay_connected ? config.security.session.sess_timeout_max : config.security.session.sess_timeout;
                    const token = jwt.sign({ id : results[0].id }, config.security.session.sess_key, { expiresIn : sess_timeout });
            
                    return res.json({ error : false, token : token });


                }else{
                    return res.json({ error : true, msg : 'Senha incorreta.' });
                }

            });

        }else{
            return res.json({ error : true, msg : 'Usuário não encontrado.' });
        }

    });

});

// sair do app
app.get('/logout', middlewares.sess_verification, (req, res, next) => {
    
    req.signedCookies = [];
    req.cookies = [];

    res.json({ error : false, msg : 'Descontado(a)' });

});

//pontos
app.post('/add_points', middlewares.sess_verification, (req, res, next) => {
    
    const session_id = utils.get_session_id(req, res);
    
    cursor.query('SELECT (valor/pontos) as constante FROM configuracao_pontos WHERE usuario_id = ? AND tipo = ? LIMIT 1', [session_id, 'CLIENTE'], (err, results) => {

        if(err) utils.error_handle(config.dev, err);

        if(results.length==0){
            return res.status(401).json({ error : true, msg : 'Ocorreu um erro ao enviar os pontos. 1' });
        }

        const constante = results[0].constante;
        const { valor, destino } = req.body;

        // constante = 1
        // valor = 100
        // 100/1 = 100 pontos

        const pontos = valor/constante;

        cursor.query('UPDATE usuarios SET pontos = (pontos + ?) WHERE id = ? AND tipo = ?', [pontos, destino, 'USUARIO'], (err, results) => {
            
            if (err) utils.error_handle(config.dev, err);

            return res.json({ error : false, msg : 'Pontos enviados!' });

        });

    });

});

app.post('/transfer_points', middlewares.sess_verification, (req, res, next) => {
    res.send('points');
});

// relatorios POWER BI
app.get('/reports', middlewares.sess_verification, (req, res, next) => {
    res.send('reports');
});

// informacoes do usuario a partir da sessao
app.get('/user_info', middlewares.sess_verification, (req, res, next) => {

    const session_id = utils.get_session_id(req, res);

    cursor.query(`SELECT nome,pontos,endereco,telefone,cpf FROM usuarios WHERE id = ? LIMIT 1`, [session_id], (err, results) => {

        if (err) utils.error_handle(config.dev, err);

        if(results.length>0){
            return res.json({ error : false, results });
        }

        return res.json({ error : true, msg : 'Usuário não encontrado' });

    });

});

app.get('/test', (req, res) => {
    res.status(200).json(req.body);
});

/*const https_server = https.createServer({
    key : fs.readFileSync('./lib/ssl/localhost.key'),
    cert : fs.readFileSync('./lib/ssl/localhost.crt')
}, app);*/

const http_server = http.createServer(app, (req, res) => {
    /*return res.writeHead(301, { 'Location' : `https://${req.headers.host}${req.url}` });*/
});

/*https_server.listen(config.server.https_port, () => {
    console.log(`[SSL_API] on https://127.0.0.1:${config.server.https_port}`);
});*/

http_server.listen(config.server.http_port, '0.0.0.0', () => {
    console.log(`[API] on http://127.0.0.1:${config.server.http_port}`);
});

/**
// UP da api
app.listen(config.port, () => {
    console.log(`[API] on http://localhost:${config.port}`);
}); */