import cookie from 'react-cookies'
import axios from 'axios'; 

export default class Token {

  static checkToken = () => {
    axios.post('https://xx-xx-xx.xxx.com/authenticate/login', {username: 'xxx',password: 'zzz'})
        .then(res => {                 
                cookie.save('token', res.data.token);
            })
        .catch(function (error) {           
                console.log(error);
            });
  };
 
}




