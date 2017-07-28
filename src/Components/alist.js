import React, {Component} from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies'
import Token from './Service/Token'
import {browserHistory} from '../../node_modules/react-router';
class Alist extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            page : 1
        }
    }

    componentWillMount() {
    //kategoriler linki    
    //https://gentle-mesa-67339.herokuapp.com/kategori/v2/list
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
      
      instance.get(`post/kategori/english/${this.state.page}`)
            .then(res => {                
              this.setState({ articles : res.data.data.docs });
            }).catch(function (error) {   
              console.log("Hata burada: ",error);                  
             Token.checkToken();
              browserHistory.push(window.location.href);                    
        });
        
      }
     
}



    render(){
       
        const articles = this.state.articles;
        const articleNode = articles.map((article) =>{
            return(
                    <Link
                    to={"/post/ruh-ve-madde/"+article.PageURL}
                    className="list-group-item"
                    key={article._id}>
                    {article.Title}
                    </Link>
                  )
        });
        return (
            <div>
                <h1>Articles </h1>
                <div className="list-group">
                    {articleNode}
                </div>
            </div>
        )
    }
}

export default Alist;