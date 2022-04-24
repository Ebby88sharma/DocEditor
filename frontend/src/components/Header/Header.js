import React from 'react';
import { Container, Form, FormControl, Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {logout} from "../../actions/userActions";

function Header({setSearch}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler=()=>{
    dispatch(logout());
    history.push("/");
  }


    return (
        <Navbar bg="dark" expand="lg" variant="dark">
        <Container >
          <Navbar.Brand >
            <Link to='/'>
            Documentor
            </Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className='m-auto'>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=> setSearch(e.target.value)}
              />
            </Form>
            </Nav>
            {userInfo ?<Nav
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
               <Nav.Link>
                <Link to='/mydocs'>
                My Documents
                </Link>
                </Nav.Link>
            
              <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
               
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler} >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
             
            </Nav>:<Nav><Nav.Link>
                <Link to='/login'>
                Login
                </Link>
                </Nav.Link></Nav>}
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Header
