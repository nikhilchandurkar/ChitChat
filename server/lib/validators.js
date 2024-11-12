import { body, check, validationResult } from 'express-validator'
import { ErrorHandler } from '../utils/utility.js   ';


const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
    const errorMessage = errors.array().map((error) => error.msg).join(",");
    console.log(errorMessage);
    if (errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessage, 400));
}

const registerValidator = () => [
    body("name", "please enter name").notEmpty(),
    body("username", "please enter username").notEmpty(),
    body("password", "please enter password").notEmpty(),
    check("avatar", "please upload avatar/ image").notEmpty(),
]

const loginValidator = () => [
    body("username", "please enter username").notEmpty(),
    body("password", "please enter password").notEmpty()
]

const newGroupValidator = () => [
    body("name", "please enter name ").notEmpty(),
    body("members", "please add members")
    .notEmpty().withMessage("enter member in group ")
    .isArray({min:2, max:100})
    .withMessage("members must between 2 to 100")
]

const addMembersValidator = () => [
    body("chatId", "please enter chat ID ").notEmpty(),
    body("members", "please add members")
    .notEmpty().withMessage("enter member in group ")
    .isArray({min:1, max:97})
    .withMessage("members must between 1 to 97")
]

const removeMembersValidator = () => [
    body("chatId", "please enter chat ID ").notEmpty(),
    body("userId", "please enter user ID ").notEmpty(),
    
]

export {
    validateHandler,
    registerValidator,
    loginValidator,
    newGroupValidator,
    addMembersValidator,
    removeMembersValidator,
}