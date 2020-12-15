import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import api from '../api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';

export  default function ListMedicine(){

  const [medicine, setMedicine] = useState([]);

  const [pageCount, setPageCount] = useState(1);

  const [currentPage, setCurrentPage] = useState();

      
  const history = useHistory();

  

  useEffect(() => {
    //const page = getQueryStringValue('page');
    setCurrentPage(1)

    fetchMedicine();
 
    
 },[]);


 useEffect(() => {

console.log(currentPage)
  
},[currentPage]);





 function  handlePageClick(data) {
  const page = data.selected >= 0 ? data.selected + 1 : 0;

  setCurrentPage(2)

  fetchMedicine();
}

 

 function fetchMedicine(){
    const newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?page=' +
      currentPage;
    window.history.pushState({ path: newUrl }, '', newUrl);

    const response = axios.post(newUrl);
  // Progress.show();
    api.getMedicine().then(response => {
      setMedicine(response.data.data);
      setCurrentPage(response.data.current_page);
      setPageCount(response.data.last_page);
      
      window.scrollTo(0, 0);
      // Progress.hide();
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

function renderMedicine(){
  return medicine.map(medicine => {
      return(
        <div className="col-sm-6 col-lg-4 text-center item mb-4" key={medicine.id}>
        
        <a href="/medicine/info"> 
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


    return(
        <div className="templatemo-flex-row">
	  
        <div className="templatemo-content col-1 light-gray-bg">
        
         <Header />
          <div className="templatemo-flex-row flex-content-row " style={{ marginTop:'100px' }}>
              <div className="col-1">				 
              <div className="bg-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-0">
          <a href="/home">Home</a> 
          <span className="mx-2 mb-0">/</span> 
          <strong className="text-black">Store</strong></div>
        </div>
      </div>
    </div>

    <div className="container">

    <div className="row">
          <div className="col-lg-6">
            <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
            <div id="slider-range" className="border-primary"></div>
            <input type="text" name="text" id="amount" className="form-control border-0 pl-0 bg-white" disabled="" />
          </div>
          <div className="col-lg-6">
            <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Reference</h3>
            <button type="button" className="btn btn-secondary btn-md dropdown-toggle px-4" id="dropdownMenuReference"
              data-toggle="dropdown">Reference</button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
              <a className="dropdown-item" href="#">Relevance</a>
              <a className="dropdown-item" href="#">Name, A to Z</a>
              <a className="dropdown-item" href="#">Name, Z to A</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Price, low to high</a>
              <a className="dropdown-item" href="#">Price, high to low</a>
            </div>
          </div>
        </div>
  
    <div className="row">
    {/* <Progress.Component
					style={{ background: '#99999978', height: '5px' }}
					thumbStyle={{ background: '#5900b3', height: '5px' }}
				/> */}
      {renderMedicine()}

      <ReactPaginate
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
				/>

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
