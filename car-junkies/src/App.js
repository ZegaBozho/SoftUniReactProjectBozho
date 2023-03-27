import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';

import Loader from './components/Loader/loader';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Home from './components/Home/home';
import Login from './components/Login/login';
import Register from './components/Register/register';
import News from './components/News/news';
import MyPosts from './components/MyPosts/myPosts';
import { Logout } from './components/Logout/logout';

import { authServiceFactory } from './services/authenticationService';
import { AuthContext } from './contexts/AuthContext';



function App() {
  const [isLoading, setIsLoadig] = useState(true);
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const authService = authServiceFactory(auth.accessToken);

  useEffect ( () => {
    setIsLoadig(false);
  }, []);


  const onLoginSubmit = async (data) => {
    try {
        const result = await authService.login(data);

        setAuth(result);

        navigate('/');
    } catch (error) {
       
        console.log('There is a problem');
    }
};

const onRegisterSubmit = async (values) => {
    const { confirmPassword, ...registerData } = values;
    if (confirmPassword !== registerData.password) {
        return;
    }

    try {
        const result = await authService.register(registerData);

        setAuth(result);

        navigate('/');
    } catch (error) {
        console.log(error);
        console.log('There is a problem');
    }
};
const onLogout = async () => {
  await authService.logout();

  setAuth({});
};


const contextValues = {
  onLoginSubmit,
  onRegisterSubmit,
  onLogout,
  userId: auth._id,
  token: auth.accessToken,
  username: auth.username,
  userEmail: auth.email,
  userPic: auth.imgUrl,
  isAuthenticated: !!auth.accessToken,
};

  return (
    <AuthContext.Provider value={contextValues}>
       { isLoading && <Loader/> } 
       <Header/>
          <Routes>
              <Route path='/' element = {<Home/>}/>
              <Route path='/news' element={<News/>}/>
              <Route path='/login' element = {<Login/>}/>
              <Route path='/logout' element = {<Logout/>}/>
              <Route path='/myPosts' element={<MyPosts/>}/>
              <Route path='/register' element = {<Register/>}/>
          </Routes>
       <Footer/>
    </AuthContext.Provider>
  );
}

export default App;
