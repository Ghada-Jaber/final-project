import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import $ from 'jquery';


export  default function Pharmacy(){

  useEffect(() => {

    const css = document.createElement("link");
    css.href ="https://cdn.datatables.net/1.10.13/css/dataTables.bootstrap.min.css";
    const script = document.createElement("script");
    script.src = "https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js";
    script.async = true;

    const boot = document.createElement("script");
    boot.src = "https://cdn.datatables.net/1.10.13/js/dataTables.bootstrap.min.js";
    
    

    document.body.appendChild(css);
     document.body.appendChild(script);
     document.body.appendChild(boot);
    $(document).ready(function() {
      $('#example').DataTable();
  });


 },[]);

  
    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">				 
              
              <div className="templatemo-content-widget no-padding">
            <div className="panel panel-default table-responsive">
            <table id="example" className="table table-striped table-bordered templatemo-user-table"
             cellSpacing="0" width="100%">
                <thead>
                  <tr>
                    <td><a href="" className="white-text templatemo-sort-by"># <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">First Name <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">Last Name <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">User Name <span className="caret"></span></a></td>
                    <td><a href="" className="white-text templatemo-sort-by">Email <span className="caret"></span></a></td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1.</td>
                    <td>John</td>
                    <td>Smith</td>
                    <td>@jS</td>
                    <td>js@company.com</td>
                    <td>
                    <div className="btn-group " role="group">
                               <Link to="#" className="btn btn-success"
                                   title="Show Category">
                                   Show
                                </Link>
                                <Link to="#" className="btn btn-primary"
                                   title="Edit Category">
                                   Edit
                                </Link>
                            
                                <Link to="#" className="btn btn-danger"
                                   title="Edit Category">
                                   Delete
                                </Link>
                            </div>
                            </td>
                  </tr>
                  <tr>
                    <td>1.</td>
                    <td>John</td>
                    <td>Smith</td>
                    <td>@jS</td>
                    <td>js@company.com</td>
                    <td>
                    <div className="btn-group " role="group">
                               <Link to="#" className="btn btn-success"
                                   title="Show Category">
                                   Show
                                </Link>
                                <Link to="#" className="btn btn-primary"
                                   title="Edit Category">
                                   Edit
                                </Link>
                            
                                <Link to="#" className="btn btn-danger"
                                   title="Edit Category">
                                   Delete
                                </Link>
                            </div>
                            </td>
                  </tr>
                  <tr>
                    <td>1.</td>
                    <td>John</td>
                    <td>Smith</td>
                    <td>@jS</td>
                    <td>js@company.com</td>
                    <td>
                    <div className="btn-group " role="group">
                               <Link to="#" className="btn btn-success"
                                   title="Show Category">
                                   Show
                                </Link>
                                <Link to="#" className="btn btn-primary"
                                   title="Edit Category">
                                   Edit
                                </Link>
                            
                                <Link to="#" className="btn btn-danger"
                                   title="Edit Category">
                                   Delete
                                </Link>
                            </div>
                            </td>
                  </tr>
                  <tr>
                    <td>1.</td>
                    <td>John</td>
                    <td>Smith</td>
                    <td>@jS</td>
                    <td>js@company.com</td>
                    <td>
                    <div className="btn-group " role="group">
                               <Link to="#" className="btn btn-success"
                                   title="Show Category">
                                   Show
                                </Link>
                                <Link to="#" className="btn btn-primary"
                                   title="Edit Category">
                                   Edit
                                </Link>
                            
                                <Link to="#" className="btn btn-danger"
                                   title="Edit Category">
                                   Delete
                                </Link>
                            </div>
                            </td>
                  </tr>
                  <tr>
                    <td>1.</td>
                    <td>John</td>
                    <td>Smith</td>
                    <td>@jS</td>
                    <td>js@company.com</td>
                    <td>
                    <div className="btn-group " role="group">
                               <Link to="#" className="btn btn-success"
                                   title="Show Category">
                                   Show
                                </Link>
                                <Link to="#" className="btn btn-primary"
                                   title="Edit Category">
                                   Edit
                                </Link>
                            
                                <Link to="#" className="btn btn-danger"
                                   title="Edit Category">
                                   Delete
                                </Link>
                            </div>
                            </td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Bill</td>
                    <td>Jones</td>
                    <td>@bJ</td>
                    <td>bj@company.com</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3.</td>
                    <td>Mary</td>
                    <td>James</td>
                    <td>@mJ</td>
                    <td>mj@company.com</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>4.</td>
                    <td>Steve</td>
                    <td>Bride</td>
                    <td>@sB</td>
                    <td>sb@company.com</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>5.</td>
                    <td>Paul</td>
                    <td>Richard</td>
                    <td>@pR</td>
                    <td>pr@company.com</td>
                    <td></td>
                  </tr>  
                   <tr>
                    <td>6.</td>
                    <td>Will</td>
                    <td>Brad</td>
                    <td>@wb</td>
                    <td>wb@company.com</td>
                    <td></td>
                  </tr>  
                   <tr>
                    <td>7.</td>
                    <td>Steven</td>
                    <td>Eric</td>
                    <td>@sE</td>
                    <td>se@company.com</td>
                    <td></td>
                  </tr>  
                   <tr>
                    <td>8.</td>
                    <td>Landi</td>
                    <td>Susan</td>
                    <td>@lS</td>
                    <td>ls@company.com</td>
                    <td></td>
                  </tr>                    
                </tbody>
              </table>    
            </div>                          
          </div>   
  
                 
  
       </div>                       
            </div> 
                     
             <Footer />
          </div>

          
        </div>

    )

}
