import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization
    if(authHeader === null || authHeader===undefined)
    {
        return res.status(401).json({
            status:401,
            message:"Unauthorized"
        })
    }

    const token = authHeader.split(" ")[1]

    // * verify token

    jwt.verify(token, process.env.SECRET_KEY!, (err,user)=>{

        if(err)
        {
            return res.status(401).json({
                status:401,
                message:"Unauthorized"
            })
        }

        /* if everything is good, save to request for use in other routes */

        req.user = user as Authuser

        next()
    })

};

export default authMiddleware