import Joi from 'joi';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// eslint-disable-next-line camelcase
import data_storage from '../models';

dotenv.config();

const controller = {
  createUser(req, res) {
    const validUser = {
      firstName: Joi.string().alphanum().min(4).required(),
      lastName: Joi.string().alphanum().min(4).required(),
      email: Joi.string().email().required(),
      address: Joi.string().min(4).required(),
      expertise: Joi.string().min(4).required(),
      password: Joi.string().min(6).max(24).required(),
      confirmPassword: Joi.string().min(6).max(24).required(),
    };
    const result = Joi.validate(req.body, validUser);
    if (result.error) {
      res.status(400)
        .send({
          status: 400,
          error: result.error.details[0].message,
        });
      return;
    }
    const verifEmail = data_storage.findEmailUser(req, res);
    if (!verifEmail) {
      if (req.body.password === req.body.confirmPassword) {
        data_storage.save(req, res);
      } else {
        res.status(401)
          .send({
            status: 401,
            error: 'The first password is not the same to the second!',
          });
      }
    } else {
      res.status(409)
        .send({
          status: 409,
          error: 'Email already exist!',
        });
    }
  },

};

export default controller;
