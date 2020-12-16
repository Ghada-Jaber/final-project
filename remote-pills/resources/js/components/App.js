import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';
//import Login from './Login';
import Home from './Home';

import Pharmacy from './Admin/Pharmacy';
import ManageMedicine from './Admin/ManageMedicine';


import Buy from './user/Buy';
import IndexUser from './user/IndexUser';
import Map from './user/Map';

import ListMedicine from './pharmacy/ListMedicine';
import AddMedicine from './pharmacy/AddMedicine';
import ShowMedicine from './pharmacy/ShowMedicine';
import Profile from './Profile';
import Chat from './Chat';


import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ForgetPassword from './auth/ForgetPassword';

function App(){

    return(

    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />

            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/forpass' component={ForgetPassword}/>
            

            <Route exact path='/cart' component={IndexUser} />
            <Route exact path='/buy' component={Buy} />
            <Route exact path='/map' component={Map} />

            <Route exact path='/profile' component={Profile} />
            <Route exact path='/chat' component={Chat} />

            <Route exact path='/manageMedicine' component={ManageMedicine} />

            <Route exact path='/managePharmacy' component={Pharmacy} />


            <Route exact path='/medicine' component={ListMedicine} />
            {/* <Route exact path='/map' component={Map} /> */}

            

        </Switch>
    </BrowserRouter>

    )

}

ReactDOM.render(<App />,document.getElementById('root'));
