import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TextField, Button} from '@mui/material';
import { AuthContext } from "../../contexts/AuthContext";
import styles from './Login.module.css';

const inputStyles = {
        marginTop: "1em",
        width:'35%',
        marginLeft: 'auto',
        marginRight: 'auto',
}

const Login = () => {

    const { onLoginSubmit } = useContext(AuthContext);
    const [userCredentials, setUserCredentials] = useState({
        username:'',
        password:''
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();
        onLoginSubmit(userCredentials);
    }

    const handleChange = (e) => {
        const newValue = e.target.value
        setUserCredentials(state => {return {...state, [e.target.id]: newValue}})
    }

    return (
        <div className = {styles['login-page']}> 
            <form onSubmit = {handleSubmit} className = {styles['login-form']}>
                <TextField
                    id="username"
                    type ="text"
                    label = "Username"
                    sx = {inputStyles}
                    onChange = {handleChange}
                />
                <TextField
                    id="password"
                    label = "Password"
                    type="password"
                    sx = {inputStyles}
                    onChange = {handleChange}
                />
                <Button 
                    variant="contained" type='Submit' 
                    sx= {inputStyles}
                >Login</Button>
        
            </form>
       
            
            <div className = {styles['go-to-register']}>
                <div>Don't have an account yet?</div>
                <Link to="/register" >Register</Link>
                
            </div>
        </div>
    );
}

export default Login;