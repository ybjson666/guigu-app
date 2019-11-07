import axios from 'axios';

export default (url="",data={},type="")=>{
    if(type === 'GET'){
        let dataStr="";
        Object.keys(data).forEach(key=>{
            dataStr+=key+'='+data[key]+"&"
        })

        if(dataStr !==""){
            dataStr=dataStr.substring(0,dataStr.lastIndexOf('&'));
            url=`${url}?${dataStr}`
        }

        return axios.get(url);

    }else{
        return axios.post (url,data);

    }
}