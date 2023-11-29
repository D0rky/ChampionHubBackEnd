import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import dotenv from 'dotenv';
import ChampionControlRouter from './ChampionControl';

const router = Router();

dotenv.config();

// Using basicAuth middleware for a specific route ('/')
router.get('/', basicAuth({
  users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD },
}), (req, res) => {
  res.send({ msg: 'Welcome to ChampionHub API' }); // Update the welcome message if needed
});

// Using ChampionControlRouter for champion-related endpoints
router.use('/champions', ChampionControlRouter);

// Handle other route handlers if necessary (persons, companies, departments, employees, etc.)

export default router;
