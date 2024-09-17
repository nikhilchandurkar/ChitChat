import { isValidUsername } from "6pp"


export const usernamevalidator = (username)=>{
    if (!isValidUsername(username)) {
        
        return {isValid : false , errorMessage :"usename is invalid"}
    }
}