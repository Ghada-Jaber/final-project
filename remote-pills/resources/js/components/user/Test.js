import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export function Test() {
    return (
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
      
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBp6txXqL4CpgictG68veqo6MmEb89yFE4'
})(Test);