import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch, useHistory} from 'react-router-dom';
//import Login from './Login';
import Home from './Home';

import ManageDoctor from './Admin/ManageDoctor';
import ShowDoctor from './Admin/ShowDoctor';
import EditDoctor from './Admin/EditDoctor';

import ManagePharmacy from './Admin/ManagePharmacy';
import ShowPharmacy from './Admin/ShowPharmacy';
import EditPharmacy from './Admin/EditPharmacy';

import ManageUser from './Admin/ManageUser';
import ShowUser from './Admin/ShowUser';
import EditUser from './Admin/EditUser';

import ManageMedicine from './Admin/ManageMedicine';
import AdminShowMedicine from './Admin/ShowMedicine';
import AdminEditMedicine from './Admin/EditMedicine';


import Buy from './user/Buy';
import IndexUser from './user/IndexUser';
import ShowMap from './user/ShowMap';
import Test from './user/Test';
import ShowMedicineUser from './user/ShowMedicineUser';
import Cart from './user/Cart';
import Doctor from './user/Doctor';
import ShowPrescription from './user/ShowPrescription';

import ListMedicine from './pharmacy/ListMedicine';
import AddMedicine from './pharmacy/AddMedicine';
import ShowMedicine from './pharmacy/ShowMedicine';
import Customer from './pharmacy/Customer';


import Profile from './Profile';
import Chat from './Chat';


import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ForgetPassword from './auth/ForgetPassword';

import api from '../api';

function App(){
  const [detail, setDetail] = useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        details();
     },[]);

    function details(){
        api.details().then(response => {
            setDetail(response.data);
            setRole(response.data.roles[0])
            
        }).catch(error => {
          //  history.push('/');
        })
      }

      function admin(){
        return(
           <Switch>
              <Route exact path='/manageMedicine' component={ManageMedicine} />
            <Route exact path='/manageMedicine/show/:id' component={AdminShowMedicine} />
            <Route exact path='/manageMedicine/edit/:id' component={AdminEditMedicine} />

            <Route exact path='/manageUser' component={ManageUser} />
            <Route exact path='/manageUser/show/:id' component={ShowUser} />
            <Route exact path='/manageUser/edit/:id' component={EditUser} />

            <Route exact path='/managePharmacy' component={ManagePharmacy} />
            <Route exact path='/managePharmacy/show/:id' component={ShowPharmacy} />
            <Route exact path='/managePharmacy/edit/:id' component={EditPharmacy} />

            <Route exact path='/manageDoctor' component={ManageDoctor} />
            <Route exact path='/manageDoctor/show/:id' component={ShowDoctor} />
            <Route exact path='/manageDoctor/edit/:id' component={EditDoctor} />
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

            <Route exact path='/customer' component={Customer} />
            </Switch>
        )
      }


      function user(){
          return(
            <Switch>
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/user/medicine/show/:id' component={ShowMedicineUser} />
            <Route exact path='/doctor' component={Doctor} />
            <Route exact path='/doctor/prescription/:id' component={ShowPrescription} />
            <Route exact path='/buy' >
              <Buy props={detail}/>
            </Route>

                <Route exact path='/profile'>
             <Profile props={detail}/>
          </Route>
            <Route exact path='/map' component={ShowMap} />
            <Route exact path='/test' component={Test} />
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
          
      
          <Route exact path='/chat' component={Chat} />
          </Switch>
        )
      }


      function redirect(){
        window.location.href = '/'; 
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
