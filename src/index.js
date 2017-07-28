import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './Components/Layout';
import App from './Components/App';
import Car from './Components/Car';
import About from './Components/About';
import Admin from './Components/Admin';
import CarDetail from './Components/CarDetail'
import NotFound from './Components/NotFound'
import Alist from './Components/alist'
import registerServiceWorker from './registerServiceWorker';
import cookie from 'react-cookies'
// Import routing components
import {Router, Route, browserHistory, IndexRoute} from '../node_modules/react-router';
import Token from './Components/Service/Token'

/**
 * izlenen videolar
 * https://www.youtube.com/watch?v=fPgE67iLkns
 * https://marmelab.com/blog/2016/09/20/custom-react-router-component.html
 * http://ricostacruz.com/cheatsheets/react-router.html
 * https://codeburst.io/react-router-v4-unofficial-migration-guide-5a370b8905a
 * https://www.youtube.com/watch?v=UVQ0ATR0vpI (React Route v4 against V2)
 * https://www.youtube.com/watch?v=VdyORTskPGA (React Route v4)
 * https://www.youtube.com/channel/UC-4UaMoSmZxS8q_6v-va6Mw/videos
 * https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237 (axios post)
 * https://github.com/mzabriskie/axios
 * http://paulsturgess.co.uk/blog/2017/02/08/making-and-testing-ajax-requests-with-axios-in-a-redux-app/
 * OKU BU KIZI
 * https://medium.com/@harinilabs/day-5-making-server-request-in-react-with-axios-8e85549caf62
 * Burada Mathieu yorumunu dikkat et
 * https://daveceddia.com/ajax-requests-in-react/
 * https://www.w3schools.com/bootstrap/bootstrap_templates.asp
 * bunu kullan
 * https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_temp_blog&stacked=h
 * https://stackoverflow.com/questions/42907713/export-and-import-the-ecma6-class
 * https://stackoverflow.com/questions/43262599/call-js-function-from-another-file-in-react
 */

//
const data = [
    {
        id: 1,
        name: 'Honda Accord Crosstour',
        year: '2010',
        model: 'Accord Crosstour',
        make: 'Honda',
        media: 'http://media.ed.edmunds-media.com/honda/accord-crosstour/2010/oem/2010_honda_accord-crosstour_4dr-hatchback_ex-l_fq_oem_4_500.jpg',
        price: '$16,811'

    },
    {
        id: 2,
        name: 'Mercedes-Benz AMG GT Coupe',
        year: '2016',
        model: 'AMG',
        make: 'Mercedes Benz',
        media: 'http://media.ed.edmunds-media.com/mercedes-benz/amg-gt/2016/oem/2016_mercedes-benz_amg-gt_coupe_s_fq_oem_1_717.jpg',
        price: '$138,157'

    },
    {
        id: 3,
        name: 'BMW X6 SUV',
        year: '2016',
        model: 'X6',
        make: 'BMW',
        media: 'http://media.ed.edmunds-media.com/bmw/x6/2016/oem/2016_bmw_x6_4dr-suv_xdrive50i_fq_oem_1_717.jpg',
        price: '$68,999'
    },
    {
        id: 4,
        name: 'Ford Edge SUV',
        year: '2016',
        model: 'Edge',
        make: 'Ford',
        media: 'http://media.ed.edmunds-media.com/ford/edge/2016/oem/2016_ford_edge_4dr-suv_sport_fq_oem_6_717.jpg',
        price: '$36,275'
    },
    {
        id: 5,
        name: 'Dodge Viper Coupe',
        year: '2017',
        model: 'Viper',
        make: 'Dodge',
        media: 'http://media.ed.edmunds-media.com/dodge/viper/2017/oem/2017_dodge_viper_coupe_acr_fq_oem_3_717.jpg',
        price: '$123,890'
    }
];


var auth = {
    isAdmin : function(){
        return true;
    }
}

const requireAuth = (nextState, replace) => {    
    if (!auth.isAdmin()) {
        // Redirect to Home page if not an Admin
        replace({ pathname: '/' })
    }
}





ReactDOM.render(
    <Router history={browserHistory}>       
        <Route path="/" component={Layout}>
            <IndexRoute component={App}/>
            {/*<Route path="/" component={App}/>*/}
            <Route path="/cars" component={Car} data={data} />
                {/* Parameter route*/}
            <Route path="/cars/:id" component={CarDetail} data={data}/>
            <Route path="/alist" component={Alist} onEnter={() => {
                console.log(cookie.load('token'))
                if(cookie.load('token') === undefined || cookie.load('token') === ''){
                        Token.checkToken();
                }
            }}/>
            <Route path="/about" component={About} onEnter={() => {
                console.log(cookie.load('token'))
                if(cookie.load('token') === undefined || cookie.load('token') === ''){
                        Token.checkToken();
                }
            }}/>
            <Route path="/admin" component={Admin} onEnter={requireAuth} />
            <Route path="*" component={NotFound}/>            
        </Route>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
