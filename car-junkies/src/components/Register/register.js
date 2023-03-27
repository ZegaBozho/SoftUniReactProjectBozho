import { useState, useContext } from 'react'; 
import { TextField, Button } from '@mui/material';
import styles  from '../Login/Login.module.css';
import { AuthContext } from '../../contexts/AuthContext'

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
    const { onRegisterSubmit } = useContext(AuthContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const checkIfEmptyValues = Object.values(newUserValues).filter(value => value === '');
        if ( !checkIfEmptyValues.length ) {
            onRegisterSubmit(newUserValues);
        }
    }

    const handleChange = (e) => {
        const newValue = e.target.value
        setNewUserValues(state => {return {...state, [e.target.id]: newValue}})
    }

    return(
        <div className = {styles['login-page']}>
            <form onSubmit = {handleSubmit}  className = {styles['login-form']}>
                <TextField
                    id="username"
                    type ="text"
                    label = "Username"
                    sx = {inputStyles}
                    onChange = {handleChange}
                />
                <TextField
                    id="password"
                    type="password"
                    label = "Password"
                    sx = {inputStyles}
                    onChange = {handleChange}
                />
                <TextField
                    id="confirmPassword"
                    type="password"
                    label = "Confirm Password"
                    sx = {inputStyles}
                    onChange = {handleChange}
                />
                <TextField
                    id="email"
                    type="email"
                    label = "Email"
                    sx = {inputStyles}
                    onChange = {handleChange}
                />
                  <TextField
                    id="imgUrl"
                    type="text"
                    label = "Profile picture url"
                    sx = {inputStyles}
                    onChange = {handleChange}
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