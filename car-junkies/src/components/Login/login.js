import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button} from '@mui/material';
import { AuthContext } from "../../contexts/AuthContext";
import { LOGIN_ERROR_MESSAGES, REGISTER_REGEX } from '../constatnts/constants';
import styles from './Login.module.css';

const inputStyles = {
        marginTop: "1em",
        width:'35%',
        marginLeft: 'auto',
        marginRight: 'auto',
        bgcolor: 'white', 
        borderRadius:'5%'
}

const registerStyles = {
    marginTop: "1em",
    width:'35%',
    marginLeft: 'auto',
    marginRight: 'auto',
    bgcolor: 'white',
    
}

const Login = () => {

    const { onLoginSubmit } = useContext(AuthContext);
    const [userCredentials, setUserCredentials] = useState({
        email:'',
        password:''
    });

    const [validationError, setValidationError] = useState({
        password: '',
        email: '',
    });

    const [authError, setAuthError] = useState('');

    const navigate = useNavigate();

    const handleValidateAll = () => {
        for (const key of Object.keys(userCredentials)) {
            handleValidate(key);
        }
    };

    const handleValidate = (key) => {
        const value = userCredentials[key];
        const regex = REGISTER_REGEX[key];
        const validate = value !== ''? value.match(regex): false;
        
        handleErrorMessages(validate, key);
    };


    const handleErrorMessages = (validate, key) => {
        if (!validate) {
            setValidationError(state => {return {...state, [key]: LOGIN_ERROR_MESSAGES.loginError}});
        } else {
            setValidationError(state => {return {...state, [key]: ''}});
        }
    };

    const showError = () => {
        const errors = Object.values(validationError).filter(error => error !== '')
        return errors.length;
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleValidateAll()
        if (!showError()) {
            onLoginSubmit(userCredentials).catch(error => {
                console.log("ERROR HANDLING" , error);
                setAuthError(error.message);
            });
        }

    }

    const handleChange = (e) => {
        const newValue = e.target.value
        setUserCredentials(state => {return {...state, [e.target.id]: newValue.trim()}})
    }

    return (
        <div className = {styles['login-page']}> 
            <form onSubmit = {handleSubmit} className = {styles['login-form']}>
                <TextField
                    error = {showError() || authError!== ''? true : false}
                    id="email"
                    type ="text"
                    label = "Email"
                    sx = {inputStyles}
                    onChange = {handleChange}
                />
                <TextField
                    error = {showError() || authError!== ''? true : false}
                    id="password"
                    label = "Password"
                    type="password"
                    sx = {inputStyles}
                    onChange = {handleChange}
                    helperText = {showError()? LOGIN_ERROR_MESSAGES.loginError: authError }
                />
                <Button 
                    variant="contained" type='Submit' 
                    sx= {inputStyles}
                >Login</Button>
        
            </form>
       
            
            <div className = {styles['go-to-register']}>
                <div>Don't have an account yet?</div>
                <Button  sx= {registerStyles} variant="outlined" onClick = {() => navigate('/register')} >Register</Button>
                
            </div>
        </div>
    );
}

export default Login;