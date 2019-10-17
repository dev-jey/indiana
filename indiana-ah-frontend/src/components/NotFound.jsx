import React from 'react';
import { Link } from 'react-router-dom';
import { notFoundImage } from '../assets/images/svg';
import Footer from './common/footer.jsx';


const NotFound = () => {
  const imageStyle = {
    backgroundImage: `url(${notFoundImage})`,
    backgroundSize: '45%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  };
  return (
    <React.Fragment>
    <div className='NotFound'>
      <div className="page-info">
        <p className="NotFound-text"> Oops, we could not find what you are looking for </p>
        <Link to='/' className="NotFound-btn">Back to home</Link>
      </div>
      <div className="image-container" style={imageStyle} />
    </div>
    <Footer/>
    </React.Fragment>
  );
};

export default NotFound;
