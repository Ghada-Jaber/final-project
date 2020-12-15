import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../../api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ReactDOM from 'react-dom';
// import ReactPaginate from 'react-paginate';
// import Progress from 'react-progress-2';
// import 'react-progress-2/main.css';

export  default function ListMedicine(){

  const [medicine, setMedicine] = useState([]);

  // const [pageCount, setPageCount] = useState(1);

  // const [currentPage, setCurrentPage] = useState();

      
  const history = useHistory();

  

  useEffect(() => {

    fetchMedicine();
 
    
 },[]);


//  useEffect(() => {

// console.log(currentPage)
  
// },[currentPage]);





 function  handlePageClick(data) {
  const page = data.selected >= 0 ? data.selected + 1 : 0;

  setCurrentPage(2)

  fetchMedicine();
}

 

 function fetchMedicine(){
    // const newUrl =
    //   window.location.protocol +
    //   '//' +
    //   window.location.host +
    //   window.location.pathname +
    //   '?page=' +
    //   currentPage;
    // window.history.pushState({ path: newUrl }, '', newUrl);

    // const response = axios.post(newUrl);
  // Progress.show();
    api.getMedicine().then(response => {
      setMedicine(response.data);
      console.log(response.data)
      // setMedicine(response.data.data);
      // setCurrentPage(response.data.current_page);
      // setPageCount(response.data.last_page);
      
      // window.scrollTo(0, 0);
      // // Progress.hide();
  }) .catch(error => {
    // Progress.hide();
    console.log(error)
    //history.push('/');
  })

}


function getQueryStringValue(key) {
  const value = decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );
  return value ? value : null;
}

function handleReferenceChange(event){
  var reference = event.target.value;
  if(reference == 'getNameOrderAsc'){
    api.getOrderMedicineByNameAsc().then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })
  }

  if(reference == 'getNameOrderDesc'){
    api.getOrderMedicineByNameDesc().then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })
  }

  if(reference == 'getPriceOrderAsc'){
    api.getOrderMedicineByPriceAsc().then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })
  }

  if(reference == 'getPriceOrderDesc'){
    api.getOrderMedicineByPriceDesc().then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })
  }

}


function renderMedicine(){
  return medicine.map(medicine => {
      return(
        <div className="col-sm-6 col-lg-4 text-center item mb-4" key={medicine.id}>
        
        <a href={"/medicine/show/"+medicine.id} > 
        <img src={`./images/medicine/${medicine.image}`} width="350px" height="200px" alt="Image"/>
        </a>
        <h3 className="text-dark"><a href="shop-single.html">{medicine.name}</a></h3>
        <p className="price"><del>95.00</del> &mdash; 
        {medicine.price}
        
        </p>
      </div>
        )
      })
  }


  function handleSearchChange(event){
    var searchByName = event.target.value;

    const search = {
      name: searchByName
  }

    api.getMedicineByName({search}).then(response => {
      setMedicine(response.data);
  }) .catch(error => {
    console.log(error)
  })

  }

  function filterFunction(event){
    var search = event.target.value;
    var filter, option, i;
     filter = search.toUpperCase();
     var div = document.getElementById("showSearch");
     option = div.getElementsByTagName("div");
     for (i = 0; i < option.length; i++) {
       var txtValue = option[i].textContent || option[i].innerText;
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
         option[i].style.display = "";
       } else {
         option[i].style.display = "none";
       }
     }
   }

    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " >
              <div className="col-1">		
      <div className="container"  >
        <div className="row" style={{  display: 'flex'}}>

        <div style={{ marginRight:'10px' }}>
          <a className='btn btn-primary' title='Add Medicine' href='/medicine/add'>
                    Add
                </a> 
                </div>  

        <div className="input-group" style={{ marginRight:'10px' }}>
		        		<div className="input-group-addon"><i className="fa fa-search fa-fw"></i></div>	        		
		              	<input type="text" className="search form-control"
						   placeholder="Serach"  
               onChange={filterFunction}
               />   
		          	</div>
            <select className="form-control" style={{ width: '200px'}}
            onChange={handleReferenceChange}>
            <optgroup label="Filter by Reference" >
              <option value="getAll">All Medicine</option>
              <option value="getNameOrderAsc">Name, A to Z</option>
              <option value="getNameOrderDesc">Name, Z to A</option>
              {/* <div className="dropdown-divider"></div> */}
              <option value="getPriceOrderAsc">Price, low to high</option>
              <option value="getPriceOrderDesc">Price, high to low</option>
            </optgroup>
            </select>
            </div>

            <div style={{ marginTop:'10px' }} >
        </div>
  
    <div className="row">
    {/* <Progress.Component
					style={{ background: '#99999978', height: '5px' }}
					thumbStyle={{ background: '#5900b3', height: '5px' }}
				/> */}
        <div id="showSearch">
      {renderMedicine()}
      </div>

      {/* <ReactPaginate
					pageCount={pageCount}
					initialPage={currentPage - 1}
					forcePage={currentPage - 1}
					pageRangeDisplayed={4}
					marginPagesDisplayed={2}
					previousLabel="&#x276E;"
					nextLabel="&#x276F;"
					containerClassName="uk-pagination uk-flex-center"
					activeClassName="uk-active"
					disabledClassName="uk-disabled"
					onPageChange={handlePageClick}
					disableInitialCallback={true}
				/> */}

          {/* <div className="row mt-5">
          
            <div className="col-md-12 text-center">
            <div className="site-block-27">
              <ul>
                <li><a href="#">&lt;</a></li>
                <li className="active"><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&gt;</a></li>
              </ul>
            </div>
          </div>
          </div> */}
        </div>     
      </div>
       </div>                       
            </div>      
             <Footer />
          </div>
        </div>

    )

}
