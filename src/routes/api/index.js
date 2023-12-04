import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import champions from './ChampionControl'; 

const router = Router();

router.get('/', basicAuth({
  users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASS },
}), (req, res) => {
  res.send({ msg: 'Welcome to ChampionHub API' }); // Update the welcome message if needed
});

router.use('/champions', champions);

export default router;
