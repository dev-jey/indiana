import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const BookmarkComponent = ({ color }) => (
<Fragment>
<svg
     width='40'
     height='40'
     viewBox='0 0 40 40'
     xmlns='http://www.w3.org/2000/svg'>
     <g clipPath='url(#clip0)'>
     <path d='M33.0126 0.00773721V0H7.05069C4.68873
     0 2.76709 1.92094 2.76709 4.2836V40L16.1314
     31.0909L29.4956 40V22.5083V17.5846V9.84736H30.9024V17.5846H37.2329V4.31596C37.2329
     1.98284 35.3534 0.0675248 33.0126 0.00773721Z'
     fill={color}
/>
</g>
<defs>
<clipPath id='clip0'>
<rect width='40' height='40' fill='white' transform='matrix(-1 0 0 1 40 0)'/>
</clipPath>
</defs>
</svg>
</Fragment>
);

BookmarkComponent.propTypes = {
  color: PropTypes.string.isRequired,
};

export default BookmarkComponent;
