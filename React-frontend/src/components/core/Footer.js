/*
* Component for footer.
*/


import React from 'react';
import Cpr from '../../images/copyright.png';
import Glogo from '../../images/github.png';
import { Navbar, Nav} from 'react-bootstrap';

function Ftr() {
  return (
    <div>
      <Navbar fixed="bottom" expand="lg" bg="dark" variant="dark">
      <Nav className="mr-auto">
        <span className='text-white text-lg'>by: Husain Mamuwala & Hamza Dhuru</span>
      </Nav>
    </Navbar>
    </div>
  );
}

export default Ftr;
