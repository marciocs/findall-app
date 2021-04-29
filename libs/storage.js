import * as SecureStore from 'expo-secure-store';
 
const get = async (key) => {
    try{
        const value = await SecureStore.getItemAsync(key);
        return value;
    }catch(err){
        throw err;
    }
}

const save = async (key, value) => {
    try{
        await SecureStore.setItemAsync(key, value);
    }catch(err){
        throw err;
    }
}

const del = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    }catch(err){
        throw err;
    }
}

export { get,save,del }