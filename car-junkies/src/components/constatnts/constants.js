export const REGISTER_ERROR_MESSAGES = {
    username: 'The user name should be between atleas 2 charecters long.',
    password: 'The password must be at least 8 characters and contain at least 1 digit, and one special symbol.',
    confirmPassword: 'The passwords do not match.',
    email: 'Please provide a valid email.',
    imgUrl: 'Please provide a valid url.',
};

export const LOGIN_ERROR_MESSAGES = {
    loginError: 'Please provide a valid username or password',
};
 
const checkMatchingPassowrds = (pass, confirmPass) => {
    return pass === confirmPass;
};

export const REGISTER_REGEX = {
    username: /^([a-zA-Z0-9_-]){2,80}$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, 
    confirmPassword: checkMatchingPassowrds,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

