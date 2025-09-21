import jwt from 'jsonwebtoken'

const middleware = async (req, res, next) => {
    const token = await req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Login session expired.' });
    }

    try {
        const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: 'Login session expired.' });
        }

        req.user = decoded.id
        next()
    } catch (error) {
        return res.status(404).json({ message: 'Error while decoding the acess token' });
    }
};

export default middleware
