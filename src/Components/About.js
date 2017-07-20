import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
var HtmlToReactParser = require('html-to-react').Parser;

class About extends Component {

 constructor(props) {
     super(props);   
    this.state = {
      post : [],
      pageUrl : 'astral-seyahat-nicin-yapilir'
    };
   }
/*componentWillMount() {
}*/
componentWillMount() {
  //this.state =  { token: cookie.load('token'), pageUrl : '' }  
  //https://gentle-mesa-67339.herokuapp.com/post/ruh-ve-madde/astral-seyahat-nicin-yapilir
 var instance = axios.create({
   baseURL: 'https://gentle-mesa-67339.herokuapp.com',
   timeout: 5000,
   headers: {'x-access-token': cookie.load('token')}
 });
   instance.get(`/post/ruh-ve-madde/${this.state.pageUrl}`)
      .then(res => {  
        console.log('çekilen data: ',res.data.data)       
        this.setState({ post : res.data.data });
      });
}

    render(){
        console.log('gelen data',this.state.post);
        const pageUrl = this.state.pageUrl;        
        const post = this.state.post.filter(post => {
              if(post.PageURL == pageUrl){
                  return post;
              }
          });

    if(post.length > 0 )
    {
      //console.log(post[0].Content);
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