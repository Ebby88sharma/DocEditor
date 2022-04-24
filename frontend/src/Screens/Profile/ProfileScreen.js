import React, { useEffect, useState } from 'react'
import { Col, Row,Button, Form } from 'react-bootstrap';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from "../../components/MainScreen";
import {updateProfile} from "../../actions/userActions"
import ErrorMessage from "../../components/ErrorMessage"
import Loader from "../../components/Loader"

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const[password,setPassword]= useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    

     const dispatch = useDispatch();

     const userLogin = useSelector(state => state.userLogin);
     const {userInfo} = userLogin;

     const userUpdate = useSelector(state => state.userUpdate);
     const{loading, error, success} = userUpdate;
     const history = useHistory();

     useEffect(()=>{
         if(!userInfo){
           history.push("/")
         }else{
             setName(userInfo.name)
             setEmail(userInfo.email)
             
         }
     },[history,userInfo])

     
     const submitHandler=(e) => {
         e.preventDefault();
         if(password === confirmPassword)
         dispatch(updateProfile({name,email,password}));    
     };

    return (
       <MainScreen title= "Edit Profile">
           <div>
               <Row className='profileContainer'>
                  <Col md={6}>
                      <Form onSubmit={submitHandler}>
                          {loading && <Loader/>}
                          {success && (
                              <ErrorMessage variant="success">
                                  Updated Successfuly
                              </ErrorMessage>
                          )}
                          <Form.Group controlId="name">
                              <Form.Label>
                                  Name
                              </Form.Label>
                              <Form.Control type="text" placeholder='Enter Name' value={name} 
                              onChange={(e) => setName(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="email">
                              <Form.Label>
                                  Email
                              </Form.Label>
                              <Form.Control type="email" placeholder='Enter email' value={email} 
                              onChange={(e) => setEmail(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="password">
                              <Form.Label>
                                  Password
                              </Form.Label>
                              <Form.Control type="password" placeholder='Enter Password' value={password} 
                              onChange={(e) => setName(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="confirmPassword">
                              <Form.Label>
                                  Confirm Password
                              </Form.Label>
                              <Form.Control type="text" placeholder='Confirm Password' value={confirmPassword} 
                              onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="name">
                              <Button type="submit" varient="primary">Update</Button>
                          </Form.Group>
                      </Form>
                  </Col>
                  {/* <Col style={{display:"flex", alignItems:"center", justifyContent:"center"}}></Col> */}
               </Row>
           </div>
       </MainScreen>
    )
}

export default ProfileScreen
