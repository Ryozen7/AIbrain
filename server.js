import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleImage from './controllers/image.js';
import handleApiCall from './controllers/imageUrl.js';
import { Pool } from 'pg';

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get ('/', (req, res)=>{res.send('It is working')})
app.get('/db', async (req, res) => {
    try {
      const client = await db.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',(req, res) => {handleProfile(req, res, db )})
app.put('/image', (req, res) => {handleImage(req, res, db )})
app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(process.env.PORT || 3005, () => {
	console.log('App is running on port ' + process.env.PORT );
}) 