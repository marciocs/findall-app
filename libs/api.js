export class Api {

    constructor(api_url){
        this.api_url = api_url;
    }

    login(usuario_email, senha, stay_connected=false, callback=null){

        if (typeof callback != 'function') return { error : true, msg : 'invalid function' };
        
        fetch(this.api_url + '/login',
            {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify({
                    usuario_email,
                    senha,
                    stay_connected
                })
            }
        )
        .then(resp => resp.json())
        .then(resp_json => callback(resp_json))
        .catch(err => console.log(err));

    }

    register(nome, usuario, senha, email, tipo, endereco, telefone, cpf, callback){
        
        if (typeof callback != 'function') return { error : true, msg : 'invalid function' };
        
        fetch(this.api_url + '/register',
            {
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify({
                    nome : nome,
                    usuario : usuario,
                    senha : senha,
                    email : email,
                    tipo : tipo,
                    endereco : endereco,
                    telefone : telefone,
                    cpf : cpf
                })
            }
        )
        .then(resp => resp.json())
        .then(resp_json => callback(resp_json))
        .catch(err => console.log(err));

    }

    user_info(token, callback=null){

        if (typeof callback != 'function') return { error : true, msg : 'invalid callback' };

        if(!token) return { error : true, msg : 'invalid token' };

        fetch(this.api_url + '/user_info',
            {
                method : 'GET',
                headers : {
                    'Content-type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }                
            }
        )
        .then(resp => resp.json())
        .then(resp_json => callback(resp_json))
        .catch(err => console.log(err));

    }

    add_points(destino, token, callback=null){

        if (typeof callback != 'function') return { error : true, msg : 'invalid function' };

        if(!token) return { error : true, msg : 'invalid token' };

        fetch(this.api_url, + '/add_points', 
            {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify({
                    destino : destino
                })
            }
        )
        .then(resp => resp_json)
        .then(resp_json => callback(resp_json))
        .catch(err => console.log(err));

    }

};