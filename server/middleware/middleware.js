import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/* 
Middleware is a function that runs before the main request handler in an application 
Middleware can modify the request (req), response (res), or stop the request.
It is essential in Express.js for security, logging, error handling, and modifying requests before reaching the route handler.
Also used here to protect routes by ensuring that only authenticated users can access them.
To protect the routes, we call the middleware first before handling the request, to verify the user details (our use_case)
*/

const middleware = async (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if(!token) {
            return res.status(401).json({ success: false, message: "Unauthorized"})
        }

        const decoded = jwt.verify(token, "uniqueKeyNotes1"); // verify token

        if(!decoded) {
            return res.status(401).json({ success: false, message: "Invalid JWT"})
        }

        const user = await User.findById({ _id: decoded.id}) // find user by the id
 
        if(!user) {
            return res.status(404).json({ success: false, message: "No user found"})
        }
        const userObj = { name: user.name, id: user._id} 
        // once we find the user by the token, we will store that user details to the req.user and pass it to the request
        req.user = userObj;
        next()
    }catch (error) {
        return res.status(500).json({ success: false, message: "Please login"})

    }
}

export default middleware;