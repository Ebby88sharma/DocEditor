import React ,{useEffect, useState} from 'react'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import "./Login.css";

import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';


    const Login = ({history}) => {
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const dispatch = useDispatch();
      const userLogin = useSelector(state => state.userLogin);
      const {loading, error, userInfo}= userLogin;


      useEffect(() => {
          if(userInfo){
              history.push('/mydocs')
          }
      }, [history,userInfo]);


      const submitHandler = async(e) =>{
          e.preventDefault();
          dispatch(login(email,password));
      }


        return (
            <MainScreen title="Login">
             <div className="loginContainer">
                 {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                   
                  <FormGroup controlId='formBasicEmail'>
                      <FormLabel>Email</FormLabel>
                      <FormControl value={email} type="email" placeholder='Email address' onChange={(e) => setEmail(e.target.value)}/>
                  </FormGroup>


                  <FormGroup controlId='formBasicPassword'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control value={password} type="Password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>
                  <Button variant="primary" type="submit">Submit</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                    New Here ? <Link to="/signup">Register Here</Link>
                    </Col>
                </Row>

            </div>
            </MainScreen>
        )
    }
    
    export default Login
    