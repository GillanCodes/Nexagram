const changeUsernameErrors = (error:any) =>  {
    let errors = {
        username: ""
    }

    if (error.message === "user_patch_empty_field_username")
        errors.username = "Username must be specified !";
    if (error.message === "user_username_patch_already_used")
        errors.username = "Username already taken";

    return errors
}

const changeAvatarErrors = (error:any) =>  {
    let errors = {
        file: ""
    }

    if (error.message === "user_patch_empty_filed_file")
        errors.file = "File cant be empty !";
    if (error.message === "user_patch_invalid_type_file")
        errors.file = "Invalid File type";
    if (error.message === "user_patch_file_max_size")
        errors.file = "File is too big";

    return errors
}

export {changeUsernameErrors, changeAvatarErrors}
