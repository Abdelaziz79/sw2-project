import jwt from 'jsonwebtoken'


export const authentication = (req, res,next) => {
    const { token } = req.cookies;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {

        return res.redirect('/login');
    }
}