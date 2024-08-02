import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" style={{ backgroundColor: 'black', color: 'white' }}>
      <div className="col-md-4 d-flex align-items-center">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Home
        </Link>
        <span style={{ marginLeft: '10px', color: 'white' }}>© 2024 GoFood, Inc</span>
      </div>
    </footer>
  );
}
