import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // get array divid by spaces
    const decoded = jwt.verify(token, process.env.mySecretKey);
    req.userTokenData = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ status: 401, error: 'The Token authentification is faild' });
  }
};
