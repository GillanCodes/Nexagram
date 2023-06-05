const registerErrors = (error:any) => {
    let errors = {
        username: "",
        email: "",
        password: "",
    }

    if (error.message.includes('username'))
        errors.username = error.message;
    if (error.message.includes('password'))
        errors.password = error.message;
    if (error.message.includes('email'))
        errors.email = error.message;
    return errors;
}

const loginErrors = (error:any) => {
    return {username: "username not found or password incorrect", password: "username not found or password incorrect"}
};

export {registerErrors, loginErrors};