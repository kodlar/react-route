import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
import Token from './Service/Token'
//import { withRouter } from 'react-router'
import {browserHistory} from '../../node_modules/react-router';
var HtmlToReactParser = require('html-to-react').Parser;


class About extends Component {

 constructor(props) {
     super(props);  
     //console.dir(this.props) 
    this.state = {
      post : [],
      pageUrl : 'astral-seyahat-nicin-yapilir'
    };
   }

componentWillMount() {
      //https://gentle-mesa-67339.herokuapp.com/post/ruh-ve-madde/astral-seyahat-nicin-yapilir    
     
     var mytoken  = cookie.load('token');
     if(mytoken === undefined){     
          Token.checkToken();
          browserHistory.push(window.location.href);  
     }
     else
      {
        var instance = axios.create({
        baseURL: 'https://gentle-mesa-67339.herokuapp.com',
        timeout: 50000,
        headers: {'x-access-token': mytoken}
      });
      
      instance.get(`/post/ruh-ve-madde/${this.state.pageUrl}`)
            .then(res => {  
             //console.log('çekilen data: ',res.data.data)       
              this.setState({ post : res.data.data });
            }).catch(function (error) {   
              console.log("Hata burada: ",error);      
              //Token.checkToken;
             Token.checkToken();
              browserHistory.push(window.location.href);                    
        });
        
      }
     
}

render(){

          const pageUrl = this.state.pageUrl;
     
          const post = this.state.post.filter(post => {
              if(post.PageURL === pageUrl){
                  return post;
              }
             return null;
          });

          if(post.length > 0 )
            {              
              var htmlInput = post[0].Content;
              var htmlToReactParser = new HtmlToReactParser();
              var reactContentElement = htmlToReactParser.parse(htmlInput);
            return(
                <div>        
                  <h1><strong>{post[0].Title}</strong></h1>
                  <h2>{post[0].Spot}</h2>      
                  <p>{reactContentElement}</p>
                </div>
                )
            }
            else
            {
              return(<div></div>)
            }
             
    }
}

export default About;