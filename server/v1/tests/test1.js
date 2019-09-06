import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../../index';

chai.user(chaihttp);

describe('User tests', () => {
  it('should signup a user', ((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'sonia',
        lastName: 'Rwicha',
        email: 'sonia@gmail.com',
        password: 'myPassword',
        confirmPassword: 'myPassword',
        address: 'kigali/Rwanda',
        expertise: 'build trust',
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(201);
        chai.expect(res.body).to.have.an('object');
        chai.expect(res.body).to.have.property('message');

        done();
      });
  }));
});








// "start": "babel-node index.js",
// "test": "cross-env NODE_ENV=test nyc --reporter=html --reporter=text mocha --exit server/v1/tests/*js",