import axios from "axios";


export default class BaseService{
    
    request(data){
        let request = axios({...data});
        return request;
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
            method : 'get',
            url : path,
            data : data
        })
    }

}


