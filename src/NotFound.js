import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <div className="home-link">
      <Link to="/">Return home and try again</Link>
    </div>
  </div>
);

export default NotFound;