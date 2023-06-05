const createPostErrors = (error:any) => {
    const errors = {
        id: "",
        caption: "",
        file: ""
    };

    if (error.message === "post_create_invalid_format_id")
        errors.id = "Specified ID is invalid";
    if (error.message === "post_create_empty_caption")
        errors.caption = "Caption cant be empty !"
    if (error.message === "post_create_empty_file")
        errors.file = "File cant be empty !";
    if (error.message === "user_patch_invalid_type_file")
        errors.file = "Invalid File type";
    if (error.message === "user_patch_file_max_size")
        errors.file = "File is too big";

    return errors
}

const postCommentErrors = (error:any) => {
    const errors = {
        content: ""
    }

    if (error.message = "comment_post_create_field_content_empty")
        errors.content = "Comment cant be empty !"
    
    return errors;
}

export {createPostErrors, postCommentErrors};