import express from 'express';
import controller from '../controllers';
import authantification from '../middleware/auth';

const routes = express.Router();

routes.get('/', (res) => { res.send('Hello world'); });
routes.post('/auth/signup', controller.createUser);
routes.post('/auth/signin', controller.userlogin);
// routes.get('/select/users/:id', controller.connected);
routes.patch('/users/:userId', authantification, controller.userToMentor);
routes.get('/mentors', authantification, controller.canViewAllMentors);
routes.get('/mentors/:mentorId', authantification, controller.specific_mentor);
routes.post('/sessions/:userId', authantification, controller.requestMS);
routes.patch('/sessions/:mentorId/:sessionId/accept', authantification, controller.mentorAccept_Decline);
routes.patch('/sessions/:mentorId/:sessionId/decline', authantification, controller.mentorAccept_Decline);
routes.get('/mentorship/users/:userId', authantification, controller.usersViewAllMSR);
routes.get('/mentorship/mentor/:mentorId', authantification, controller.mentorViewAllMSR);
routes.patch('/users/:id/update-my-info', authantification, controller.updateInfo);


export default routes;
