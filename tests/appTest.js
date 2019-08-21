import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'

chai.use(chaiHttp);
chai.should();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoib2x1YnVubWlAeWF3LmNvbSIsImZpcnN0bmFtZSI6Ik9sdWJ1bm1pIiwibGFzdG5hbWUiOiJZYXciLCJhZGRyZXNzIjoiR2lzZW55aSIsInN0YXR1cyI6InVzZXIiLCJpYXQiOjE1NjYyMjk1Mzh9.2imFsSzBamjP1REeMgBhXXjP6qH4A3yERmnc8EQU_HI';

//User
describe('User tests', () => {

    it('should be signup', (done) => {
        const user =
        {
            firstname: 'Josue',
            lastname: 'Muhire',
            email: 'josue09@gmail.com',
            password: 'example12',
            address: 'kigali-rwanda',
            bio: 'DevOp manager',
            occupation: 'software engineer',
            expertise: 'backend engineer',
            status: 'user'

        };
        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((error, res) => {
                res.body.status.should.be.equal(201);
                res.body.should.be.an('object');
                res.body.data.should.have.property('firstname');
                res.body.data.should.have.property('lastname');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('password');
                res.body.data.should.have.property('address');
                res.body.data.should.have.property('bio');
                res.body.data.should.have.property('occupation');
                res.body.data.should.have.property('expertise');
                res.body.data.should.have.property('status');
            });
        done();
    });
    it('Should not work if all fields are not filled', (done) => {

        const user = {
            firstname: 'Josue',
            email: 'josue@gmail.com',
            password: 'example12',
            address: 'kigali-rwanda',
            bio: 'DevOp manager',
            occupation: 'software engineer',
            expertise: 'backend engineer',
            status: 'user'
        }
        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((req, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(400);
                res.body.error.should.be.a('string');
            });
        done();
    });

    it('Should not sign up existing email', (done) => {
        const user = {
            firstname: 'Josue',
            email: 'muhirejosue@gmail.com',
            password: 'example12',
            address: 'kigali-rwanda',
            bio: 'DevOp manager',
            occupation: 'software engineer',
            expertise: 'backend engineer',
            status: 'user'
        }

        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((req, res) => {
                res.body.status.should.be.equal(400);
                res.body.should.be.an('object');
                res.body.error.should.be.a('string');
            });
        done();
    });

    it('Should not accept incorrect firstname input format', (done) => {
        const user = {
            firstname: 123,
            lastname: "Muhire",
            email: 'muhirejosue@gmail.com',
            password: 'example12',
            address: 'kigali-rwanda',
            bio: 'DevOp manager',
            occupation: 'software engineer',
            expertise: 'backend engineer',
            status: 'user'
        };

        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((req, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(400);
                res.body.error.should.be.a('string');
            });

        done();
    });


    it('Should not accept incorrect email input format', (done) => {
        const user = {
            firstname: "Josue",
            lastname: "Muhire",
            email: 123,
            password: 'example12',
            address: 'kigali-rwanda',
            bio: 'DevOp manager',
            occupation: 'software engineer',
            expertise: 'backend engineer',
            status: 'user'
        };

        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((req, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(400);
                res.body.error.should.be.a('string');
            });

        done();
    });

    it('Should not accept incorrect lastname input format', (done) => {
        const user = {
            firstname: "Josue",
            lastname: 1234,
            email: 'muhirejosue@gmail.com',
            password: 'example12',
            address: 'kigali-rwanda',
            bio: 'DevOp manager',
            occupation: 'software engineer',
            expertise: 'backend engineer',
            status: 'user'
        };

        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((req, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(400);
                res.body.error.should.be.a('string');
            });

        done();
    });

    it('Should not accept an already used email', (done) => {
        const user = {
            firstname: 'Josue',
            email: 'muhirejosue09@gmail.com',
            password: 'example12',
            address: 'kigali-rwanda',
            bio: 'DevOp manager',
            occupation: 'software engineer',
            expertise: 'backend engineer',
            status: 'user'
        };

        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((req, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(401);
                res.body.error.should.be.a('string');
            });
        done();
    });

    it('Should accept mentor, user and admin as status', (done) => {
        const user = {
            firstname: 'Josue',
            email: 'muhirejosue09@gmail.com',
            password: 'example12',
            address: 'kigali-rwanda',
            bio: 'DevOp manager',
            occupation: 'software engineer',
            expertise: 'backend engineer',
            status: 'developer'
        };

        chai.request(server)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((req, res) => {
                res.body.should.be.an('object');
                res.body.status.should.be.equal(401);
                res.body.error.should.be.a('string');
            });

        done();
    });

});