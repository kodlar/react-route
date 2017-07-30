import React, { Component } from 'react';
import {browserHistory} from '../../node_modules/react-router';

class CarDetail extends Component {
      
    handleRedirect(){
        browserHistory.push('/cars');
    }

    render(){
        const cars = this.props.route.data;
        //console.log("Data: ",cars);
        const id = this.props.params.id;
        //console.log("Id: ",id);
        /*
        let i = 0;
        let mycar = {};
        for (i = 0; i < cars.length; i++) {
            var car = cars[i];
            //console.log(car.id);
            if(car.id == id){
                mycar = car;
                console.log(mycar);
            }
        } 
        */
        /*
        var ages = [32, 33, 16, 40];

        function checkAdult(age) {
            return age >= 18;
        }

        function myFunction() {
            document.getElementById("demo").innerHTML = ages.filter(checkAdult);
        } 
        */

         const car = cars.filter(car => {
             if(car.id === id){
                 return car;
             }
            return null;
         });
      

        return (
            <div>
                <h1>{car[0].name}</h1>
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <div className="thumbnail">
                            <img src={car[0].media} alt={car[0].name} />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                       <ul>
                           <li><strong>Model</strong>: {car[0].model}</li>
                           <li><strong>Make</strong>: {car[0].make}</li>
                           <li><strong>Year</strong>: {car[0].year}</li>
                           <li><strong>Price</strong>: {car[0].price}</li>
                       </ul>
                    </div>
                </div>
                <div className="col-md-12">
                        <button className="btn btn-default" onClick={this.handleRedirect.bind(this)}>Go to Cars</button>
                </div>
            </div>
        );
    }
}

export default CarDetail