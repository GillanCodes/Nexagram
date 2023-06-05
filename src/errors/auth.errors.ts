const registerErrors = (error:any) => {
    let errors = {
        username: "",
        email: "",
        password: "",
    }

    if(error.message === 'register_empty_field_username')
        errors.username = "Username is empty !";
    if (error.message === 'register_field_too_short_username')
        errors.username = "Username must be at least 5 length";
    if (error.message === 'register_field_too_long_username')
        errors.username = "Username must shorter than 32";
    
    if (error.message === 'register_empty_field_email')
        errors.email = "Email must be valid or not empty";

    if (error.message === 'register_empty_field_password')
        error.password = "Password must not be empty !";
    if (error.message === 'register_field_too_short_password')
        error.password = "Password must be a least 8 long";
    if (error.message === 'register_field_too_long_password')
        error.password =   "Password couldn't be longer than 255";
    
    return errors;
}

const loginErrors = (error:any) => {
    return {username: "username not found or password incorrect", password: "username not found or password incorrect"}
};

export {registerErrors, loginErrors};