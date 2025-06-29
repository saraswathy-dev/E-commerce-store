import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const protectRoute =async (req, res,next) => {
    try {
 const accessToken = req.cookies.accessToken;
 if( !accessToken) {
     return res.status(401).json({ message: "Unauthorized-no access token found" });
    } 
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user=await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();

    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Access token expired" });
        }
       throw new Error("Invalid access token");
    }
    } catch (error) {
        console.error("Error in protectroute middleware:", error);
        return res.status(500).json({ message: "Unauthorized-Invalid access token" });
    }
};
export const adminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden-You do not have permission to access this resource-Only admin can access" });
    }
};
