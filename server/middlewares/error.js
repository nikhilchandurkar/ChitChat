

const errorMiddleware = (err, req, res, next) => {

    try {
        err.message = err.message || "Internal Server Error";
        err.statusCode = err.statusCode || 500;
        console.log(err.statusCode)
        if (err.code === 11000) {
            err.message =Object.keys(err.keyPattern)
            err.statusCode =400;
        }
        if (err.message ==="CasteError") {
            errorPath = err.path 
            err.message  =`Invalid format of path${errorPath}`,
            err.statusCode = 400
        }
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        })

    } catch (error) {
        console.log(error);
    }

}

const tryCatch = (passedFunction) => async (req, res, next) => {
    try {
        await passedFunction(req, res, next);
    } catch (error) {
        next(error);
    }

};

export { errorMiddleware, tryCatch }