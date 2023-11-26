
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';


const { expect } = chai;

chai.use(chaiHttp);
const host = 'http://localhost';
const port = 5000;
const mockToken = jwt.sign({ user: { userId: 'testuser' } }, 'jwtConfig');

describe('POST /tasks', () => {
  it('should create a new task', (done) => {
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      assignedUser: 'testuser',
      dueDate: '2023-12-31',
    };

    chai.request(`${host}:${port}`)
      .post('/createTask')
      .set('Authorization', `Bearer mockToken`)
      .send(taskData)
      .end((err, res) => {
        
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title', 'Test Task');
        
        done(); 
      });
  });
});

describe('GET /task', () => {
  it('should retrieve a list of all tasks', (done) => {
   chai.request(`${host}:${port}`)
        .get('/task')
        .end((err, res) => {
          
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0]).to.have.property('title');
          done(); 
          
        });
    });

    describe('GET /task/:id', () => {
        it('should retrieve a single task by ID', (done) => {
          
          chai.request(`${host}:${port}`)
            .get('/task') 
            .end((err, res) => {
              const id = res.body[0]._id;
      
              chai.request(`${host}:${port}`)
                .get(`/task/${id}`)
                .end((err, res) => {
                 
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('_id', id);
                  expect(res.body).to.have.property('title');
                  done(); 
                });
            });
        });
})
})

