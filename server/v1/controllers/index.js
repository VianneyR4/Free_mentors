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

  userlogin(req, res) {
    const validUser = {
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(6).max(24).required(),
    };
    const result = Joi.validate(req.body, validUser);
    if (result.error) {
      res.status(401)
        .send({
          status: 401,
          error: result.error.details[0].message,
        });
      return;
    }
    const user = data_storage.findEmailUser(req, res);
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, success) => {
        if (success) {
          const token = jwt.sign({ user }, process.env.mySecretKey);
          res.status(200)
            .send({
              status: 200,
              message: 'User connected successfully',
              data: { token, user },
            });
        } else {
          res.status(401)
            .send({
              status: 401,
              error: 'Incorrect password!',
            });
        }
      });
    } else {
      res.status(401)
        .send({
          status: 401,
          error: 'Email doesn\'t exist!',
        });
    }
  },

  userToMentor(req, res) {
    const userToChange = data_storage.findIdUser(req, res);
    if (!userToChange) {
      res.status(404)
        .send({
          status: 404,
          message: 'The user with the given ID was not found',
        });
    } else if (userToChange.status === 'mentee') {
      userToChange.status = 'mentor';
      res.status(200)
        .send({
          status: 200,
          message: 'User change to mentor successfully!',
          userToChange,
        });
    } else {
      res.status(401)
        .send({
          status: 401,
          message: 'Already a mentor',
        });
    }
  },

  canViewAllMentors(req, res) {
    const allMentors = data_storage.selectAllMentors();
    res.send({
      status: 200,
      message: 'selected successfully!',
      allMentors,
    });
  },
  
  specific_mentor(req, res) {
    const thismentors = data_storage.selectMentorByParams(req, res);

    if (!thismentors) {
      res.status(401)
        .send({
          status: 401,
          message: 'The mentor with the given ID was not found',
        });
    } else {
      res.status(200)
        .send({
          status: 200,
          message: 'User connected successfully',
          thismentors,
        });
    }
  },


  requestMS(req, res) {
    const menteeForMS = data_storage.findIdUser(req, res);
    if (menteeForMS) {
      const validDataForMS = {
        mentorId: Joi.string().min(1).required(),
        question: Joi.string().min(6).max(64).required(),
      };
      const result = Joi.validate(req.body, validDataForMS);
      if (result.error) {
        res.status(400)
          .send({
            status: 400,
            error: result.error.details[0].message,
          });
        return;
      }
      const mentorForMS = data_storage.selectMentorByBody(req, res);
      if (!mentorForMS) {
        res.status(404)
          .send({
            status: 404,
            message: 'The mentor with the given ID was not found',
          });
      } else {
        data_storage.saveMS(req, res, menteeForMS);
      }
    } else {
      res.status(401)
        .send({
          status: 401,
          error: 'The user with the given ID was not found!',
        });
    }
  },

  mentorAccept_Decline(req, res) {
    const verifMentorExist = data_storage.selectMentorByParams(req);
    if (verifMentorExist) {
      const oneMSRToUpdate = data_storage.oneMSR(req);
      if (oneMSRToUpdate) {
        if (oneMSRToUpdate.answer !== 'accept') {
          oneMSRToUpdate.answer = 'accept';
          res.status(200).send({
            status: 200,
            message: 'Accepted successfully',
            oneMSRToUpdate,
          });
        } else if (oneMSRToUpdate.answer !== 'decline') {
          oneMSRToUpdate.answer = 'decline';
          res.status(200).send({
            status: 200,
            message: 'Declined successfully',
            oneMSRToUpdate,
          });
        } else {
          res.status(401)
            .send({
              status: 401,
              message: 'Action already passed',
            });
        }
      }
    } else {
      res.status(404)
        .send({
          status: 404,
          message: 'The mentor with the given params.id was not found',
        });
    }
  },

};

export default controller;
