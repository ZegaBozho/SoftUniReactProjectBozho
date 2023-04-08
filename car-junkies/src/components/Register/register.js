import { useState, useContext, useEffect } from 'react'; 
import { TextField, Button } from '@mui/material';
import styles  from '../Login/Login.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { REGISTER_ERROR_MESSAGES, REGISTER_REGEX } from '../constatnts/constants';

const inputStyles = {
    marginTop: "1em",
    width:'35%',
    marginLeft: 'auto',
    marginRight: 'auto',
}

const Register = () => {
    
    const [newUserValues, setNewUserValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        imgUrl: '',
    })
    const [validationError, setValidationError] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        imgUrl: '',
        
    });

    const { onRegisterSubmit } = useContext(AuthContext);

    
    const [authError, setAuthError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleValidateAll()
        const checkForErrors = Object.values(validationError).filter( value => value !== '');
        if ( !checkForErrors.length ) {
            onRegisterSubmit(newUserValues).catch(error => {
                setAuthError(error.message)
            });
        }
    }

    const handleValidateAll = () => {
        for (const key of Object.keys(REGISTER_ERROR_MESSAGES)) {
            handleValidate(key);
        }
    };

    const handleValidate = (key) => {
        let validate = true
        if (key === 'confirmPassword') {
                 validate = REGISTER_REGEX.confirmPassword(newUserValues.password, newUserValues.confirmPassword)
        }else if(key === 'imgUrl') {
            validate = true
        }  else {
            const value = newUserValues[key];
            const regex = REGISTER_REGEX[key];
            validate =  value !== ''? value.match(regex): false;
        }
        handleErrorMessages(validate, key);
    };


    const handleErrorMessages = (validate, key) => {
        if (!validate) {
            setValidationError(state => {return {...state, [key]: REGISTER_ERROR_MESSAGES[key]}});
        } else {
            setValidationError(state => {return {...state, [key]: ''}});
        }
    };

    const handleChange = (e) => {
        const newValue = e.target.value
        setNewUserValues(state => {return {...state, [e.target.id]: newValue.trim()}})
    }

    return(
        <div className = {styles['login-page']}>
            <form onSubmit = {handleSubmit}  className = {styles['login-form']}>
                <TextField
                    error = {validationError.username || authError? true : false}
                    id="username"
                    type ="text"
                    label = "Username"
                    sx = {inputStyles}
                    onChange = {handleChange}
                    helperText= {validationError.username!== ''? validationError.username: authError}
                />
                <TextField
                    error = {validationError.password? true : false}
                    id="password"
                    type="password"
                    label = "Password"
                    sx = {inputStyles}
                    onChange = {handleChange}
                    helperText= {validationError.password}
                />
                <TextField
                    error = {validationError.confirmPassword? true : false}
                    id="confirmPassword"
                    type="password"
                    label = "Confirm Password"
                    sx = {inputStyles}
                    onChange = {handleChange}
                    helperText= {validationError.confirmPassword}
                />
                <TextField
                    error = {validationError.email? true : false}
                    id="email"
                    type="email"
                    label = "Email"
                    sx = {inputStyles}
                    onChange = {handleChange}
                    helperText= {validationError.email}
                />
                  <TextField
                    error = {validationError.imgUrl? true : false}
                    id="imgUrl"
                    type="text"
                    label = "Profile picture url"
                    sx = {inputStyles}
                    onChange = {handleChange}
                    helperText= {validationError.imgUrl}
                />
                  <Button 
                    variant="contained" type='Submit' 
                    sx= {inputStyles}
                >Register</Button>
            </form>
        </div>
    )
}

export default Register;