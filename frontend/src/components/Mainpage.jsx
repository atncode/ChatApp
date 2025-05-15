import React from 'react';
import Card from './Card.jsx';

const Mainpage = () => {
  return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card />
          </div>
        </div>
      </div> 
  )
};

export default Mainpage;