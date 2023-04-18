import { NavLink } from 'react-router-dom';
import { Tabs, Tab, Avatar, Stack } from '@mui/material';
import { useState, useContext, useEffect} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Navigation.module.css';


const Navigation = () => {
    const [currentTab, setCurrentTab] = useState('/home');
    const { userId, userPic } = useContext(AuthContext)
    const handleChange = (e, newValue) => {
        setCurrentTab(newValue);
  };

  useEffect( () => {
    setCurrentTab('/home');
  }, [userId])

    return (
        <div className = {styles['nav-wrapper']}>
            <Tabs 
                value={currentTab} 
                onChange = {handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                sx={{
                    float: 'right',
                }}
            >
                <Tab label = "Home" value = "/home" to = "/" component = {NavLink}/>
                {/* <Tab label = "News" value = '/news' to = '/news' component ={NavLink}/> */}
                {userId && <Tab label = "My Posts" value = "/myPosts" to = "/myPosts" component = {NavLink} /> }
                {userId && <Tab label = "Logout" value = "/" to ="/logout" component = {NavLink} /> }
                {!userId && <Tab label = "Login / Register" value = "/" to = "/login" component = {NavLink} /> }
            </Tabs>
            {
                userId?  <Stack 
                    sx={{
                        float:'right',
                        padding:'0.4em'
                    }}
                    >
                    <Avatar alt='' src={userPic} />
                </Stack> :null
            }
           
        </div>
         
    );
}

export default Navigation;