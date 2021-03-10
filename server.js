import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleImage from './controllers/image.js';
import handleApiCall from './controllers/imageUrl.js';

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ryozen7',
    database : 'brain'
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get ('/', (req, res)=>{
	res.send(database.users);
})

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',(req, res) => {handleProfile(req, res, db )})
app.put('/image', (req, res) => {handleImage(req, res, db )})
app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(3005, () => {
	console.log('App is running');
}) 