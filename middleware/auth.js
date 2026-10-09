import jwt from "jsonwebtoken";

// "protect" = a security guard. Put it in front of any route that only the admin may use.
// It checks the login token that the browser sends in the "Authorization" header.
function protect(req, res, next) {

    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized" });
    }

    const token = header.slice(7);   // remove the word "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id;
        next();                       // token is good -> let the request continue
    } catch (error) {
        res.status(401).json({ message: "Not authorized" });
    }
}

export default protect;
