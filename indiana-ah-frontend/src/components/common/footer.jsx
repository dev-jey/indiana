import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import {
  facebook, twitter, logo, logo2
} from '../../assets/images/svg';

const Footer = () => (
  <div className='footer'>
    <div className='container'>
      <Row>
        <Col
          className='col-lg-4 col-md-5 col-sm-4 col-3
          d-none d-sm-block pl-0 align-self-center'>
          <div className='d-flex'>
            <img src={logo2} alt='facebook logo' className='feather' />
            <img src={logo} alt='facebook logo' className='d-block app-logo' />
          </div>
        </Col>
        <Col className='d-flex align-items-center flex-column'>
          <h2 className='mb-5'>Help</h2>
          <Link to='#'>
            <h4 className='mb-4'>Profile</h4>
          </Link>
          <Link to='#'>
            <h4>Blog</h4>
          </Link>
        </Col>
        <Col className='d-flex align-items-center flex-column'>
          <h2 className='mb-5'>Contact Us</h2>
          <Link to='#'>
            <h4 className='mb-4'>Faqs</h4>
          </Link>
          <Link to='#'>
            <h4>Contact us</h4>
          </Link>
        </Col>
        <Col className='d-flex align-items-center flex-column'>
          <h2 className='mb-4'>Social Media</h2>
          <div className='d-flex justify-evenly w-75 mb-4'>
            <Link to='#'>
              <img src={facebook} alt='facebook logo' className='mr-6 d-block logo2' />
            </Link>
            <Link to='#'>
              <img src={twitter} alt='twitter logo' className='d-block logo3' />
            </Link>
          </div>
          <div className='d-flex justify-content-between w-75'>
            <Link to='#'>
              <h4>Facebook</h4>
            </Link>
            <Link to='#'>
              <h4>Twitter</h4>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default Footer;
