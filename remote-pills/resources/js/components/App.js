import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';
//import Login from './Login';
import Home from './Home';

import Pharmacy from './Admin/Pharmacy';
import ManageMedicine from './Admin/ManageMedicine';
import AdminShowMedicine from './Admin/ShowMedicine';
import AdminEditMedicine from './Admin/EditMedicine';


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

import api from '../api';

function App(){
    const [role, setRole] = useState('');

    useEffect(() => {
        details();
     },[]);

    function details(){
        api.details().then(response => {
            setRole(response.data.roles[0])
            
        }).catch(error => {
           history.push('/');
        })
      }

      function admin(){
        return(
           <Switch>
              <Route exact path='/manageMedicine' component={ManageMedicine} />
            <Route exact path='/manageMedicine/show/:id' component={AdminShowMedicine} />
            <Route exact path='/manageMedicine/edit/:id' component={AdminEditMedicine} />
            <Route exact path='/managePharmacy' component={Pharmacy} />
            </Switch>
        )
      }

      function doctor(){
          return(
           <Switch>
                 {/* <Route exact path='/patient' component={Patient} />  */}
                 </Switch>
          )
      }

      function pharmacy(){
        return(
          <Switch>
            <Route exact path='/medicine' component={ListMedicine} />
            <Route exact path='/medicine/add' component={AddMedicine} />
            <Route exact path='/medicine/show/:id' component={ShowMedicine} />
            </Switch>
        )
      }


      function user(){
          return(
            <Switch>
            <Route exact path='/cart' component={IndexUser} />
            {/* <Route exact path='/doctor' component={Doctor} /> */}
            <Route exact path='/buy' component={Buy} />
            <Route exact path='/map' component={Map} />
            </Switch>
          )
      }


      function other(){
        return(
          <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />

          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/forpass' component={ForgetPassword}/>
          
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/chat' component={Chat} />
          </Switch>
        )
      }

    return(

    <BrowserRouter>
       
            
            {other()}

            {role == 'ROLE_ADMIN' ? admin() : ''}

            {role == 'ROLE_DOCTOR' ? doctor() : ''}

            {role == 'ROLE_PHARMACY' ? pharmacy() : ''}

            {role == 'ROLE_NORMALUSER' ? user() : ''}

            


        
    </BrowserRouter>

    )

}

ReactDOM.render(<App />,document.getElementById('root'));
