import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './Screens/LandingPage/LandingPage';
import { BrowserRouter, Route } from 'react-router-dom'
import MyDocuments from './Screens/MyDocuments/MyDocuments';
import Login from "./Screens/Login/Login";
import SignUp from "./Screens/Signup/SignUp"
import createDoc from "./Screens/createDoc/createDoc";
import UpdateDocument from './Screens/createDoc/UpdateDocument';
import ProfileScreen from './Screens/Profile/ProfileScreen';
import { useState } from 'react';

const App=() => {
  const [search, setSearch] = useState("");
  return(
  <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route path='/' component={LandingPage} exact/> 
        <Route path='/login' component={Login} exact/> 
        <Route path='/profile' component={ProfileScreen} exact/> 
        <Route path='/signup' component={SignUp} exact/> 
        <Route path='/createDoc' component={createDoc} exact/> 
        <Route path='/doc/:id' component={UpdateDocument} exact/> 
        <Route path='/mydocs' component={() => <MyDocuments search= {search}/>}/> 
      </main>
      <Footer/>
  </BrowserRouter>
)}

export default App;
