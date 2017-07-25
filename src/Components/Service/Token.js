import cookie from 'react-cookies'
import axios from 'axios'; 

const Token = () => {

    checkToken : () => {

        
      axios.post('https://gentle-mesa-67339.herokuapp.com/authenticate/login', {username: 'okeskiner',password: '1qaz2wsx'})
      .then(res => {                 
              cookie.save('token', res.data.token);
          })
      .catch(function (error) {           
              console.log(error);
        });
        

      
  }
    
   return {
       checkToken : this.checkToken
   }
  
  
  

}

  export default Token;