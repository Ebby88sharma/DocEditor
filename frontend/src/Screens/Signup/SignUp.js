import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from "react-router-dom";
import { register } from "../../actions/userActions"
import ErrorMessage from "../../components/ErrorMessage";

import "./SignUp.css";
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';



const SignUp = ({history}) => {
      const [email, setEmail] = useState("")
      const [name, setName] = useState("")
      const [password, setPassword] = useState("")
      const [confirmpassword, setConfirmPassword] = useState("")
      const [message, setMessage] = useState(null)
     
      const dispatch = useDispatch();

      const userRegister = useSelector((state) => state.userRegister);
      const {loading, error, userInfo} = userRegister;
      useEffect(() => {
        if(userInfo){
          history.push("/mydocs");
        }
      }, [history,userInfo]);

      const submitHandler = async(e) =>{
        e.preventDefault();

        if(password !==confirmpassword){
          setMessage('Passwords do not match');
        }
        else{
          dispatch(register(name,email,password));
        }
      }



    return (
        <MainScreen title="SignUp">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant ="danger">{message}</ErrorMessage>}
          {loading && <Loader />} 
          <Form onSubmit={submitHandler} >
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter email"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter email"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
  
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    );
  }
export default SignUp
