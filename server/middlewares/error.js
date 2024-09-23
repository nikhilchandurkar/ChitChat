

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    console.log(err.statusCode)
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
    
}

const tryCatch = (passedFunction)=> async(req,res,next)=>{
    try {
        await passedFunction(req,res,next);
    } catch (error) {
        next(error);
    }

};

export { errorMiddleware ,tryCatch}