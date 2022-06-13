import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
  return (
    <Navbar bg='primary' expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>NOTEBOARD</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto '>
            <Form inline>
              <FormControl
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
            </Form>
          </Nav>
          <Nav>
            <Nav.Link>
              <Link to='/myNotes'>MyNotes</Link>
            </Nav.Link>
            <NavDropdown title='Profile' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='#action3'>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action4'>LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default header;
