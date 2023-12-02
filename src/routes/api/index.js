import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import ChampionControlRouter from './ChampionControl'; 

const router = Router();

router.get('/', basicAuth({
  users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD },
}), (req, res) => {
  res.send({ msg: 'Welcome to ChampionHub API' }); // Update the welcome message if needed
});

router.use('/champions', ChampionControlRouter);

export default router;
