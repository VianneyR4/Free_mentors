/* eslint-disable radix */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const users = [];
const mentorshipSession = [];

// eslint-disable-next-line camelcase
const data_storage = {

  findEmailUser(req) {
    return users.find((vP) => vP.email === req.body.email);
  },

  findIdUser(req) {
    return users.find((uc) => uc.id === parseInt(req.params.userId));
  },

  selectMentorByBody(req) {
    return users.find((mb) => mb.id === parseInt(req.body.mentorId) && mb.status === 'mentor');
  },

  selectMentorByParams(req) {
    return users.find((mb) => mb.id === parseInt(req.params.mentorId) && mb.status === 'mentor');
  },

  selectAllMSR(req) {
    return mentorshipSession.filter((sr) => sr.mentorId === parseInt(req.params.mentorId));
  },
  oneMSR(req) {
    // eslint-disable-next-line max-len
    return mentorshipSession.find((om) => om.mentorId === parseInt(req.params.mentorId) && om.sessionId === parseInt(req.params.sessionId));
  },

  selectAllMSR_forUser(req) {
    return mentorshipSession.filter((srU) => srU.menteeId === parseInt(req.params.userId) && srU.answer === 'accept');
  },
  oneMSR_forUser(req) {
    // eslint-disable-next-line max-len
    return mentorshipSession.find((omU) => omU.menteeId === parseInt(req.params.userId) && omU.sessionId === parseInt(req.params.sessionId));
  },

  save(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      password: hashedPassword,
      expertise: req.body.expertise,
      status: 'mentee',
    };
    const token = jwt.sign({ user }, process.env.mySecretKey);
    users.push(user);
    res.status(201)
      .send({
        status: 201,
        message: 'User created successfully',
        data: { token, user },
      });
  },

  selectAllUsers() {
    return users;
  },

  selectAllMentors() {
    return users.filter((mb) => mb.status === 'mentor');
  },

  saveMS(req, res, menteeForMS) {
    // eslint-disable-next-line camelcase
    const m_session = {
      sessionId: mentorshipSession.length + 1,
      firstName: menteeForMS.firstName,
      lastName: menteeForMS.lastName,
      email: menteeForMS.email,
      address: menteeForMS.address,
      status: 'mentee',
      menteeId: menteeForMS.id,
      mentorId: parseInt(req.body.mentorId),
      question: req.body.question,
      answer: 'wait',
    };
    mentorshipSession.push(m_session);
    res.status(201)
      .send({
        status: 201,
        message: 'Mentorship session created successfully',
        m_session,
      });
  },

};

// eslint-disable-next-line camelcase
export default data_storage;
