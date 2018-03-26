import axios from "axios";
import store from "store";

export default class BaseService{
    
    request(data){
        let token = this.getToken()
        if(token){
            axios.defaults.headers.common['Authorization'] = 'Bearer '+this.getToken();
        }
        let request = axios({...data,baseURL:window.app.api.baseURL});
        return request;
    }

    getToken(){
        if(store.getState() && store.getState().auth && store.getState().auth.user){
            return store.getState().auth.user.token;
        }
    }
  
    get(path,queryParam){
        return this.request({
            method : 'get',
            url : path,
            params : queryParam
        })
    }

    post(path,data){
        return this.request({
            method : 'post',
            url : path,
            data : data
        })
    }

}


