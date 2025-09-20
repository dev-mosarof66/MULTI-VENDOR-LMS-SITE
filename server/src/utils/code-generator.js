import jwt from 'jsonwebtoken'

const generateVerificationCode = (user) => {
    const code = Math.floor(1000 + Math.random() * 9000);
    const token = jwt.sign({ code, user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {
        code: code.toString(),
        redirectedLink: token
    };
}

export default generateVerificationCode
