class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorMiddleware = (err,req,res,next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if(err.code == 11000){
        const message= `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err= new ErrorHandler(message,400)
    }
    if(err.name === "jsonWebTokenError"){
        const message = "JSon web token is invalid,Try again"
        err= new ErrorHandler(message,400)
    }
    //1:1
}