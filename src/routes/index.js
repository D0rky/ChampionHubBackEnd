import { Router } from 'express';
import root from './root'; // Assuming 'root.js' contains your root path logic
import ChampionControlRouter from './api/ChampionControl'; // Assuming 'ChampionControl.js' contains ChampionHub-related logic

const router = Router();

router.use('/', root); // Using the root path logic
router.use('/championhub', ChampionControlRouter); // Using ChampionHub-related routes under '/championhub'



// Handling the favicon.ico request with a 204 status
router.use('/favicon.ico', (req, res) => res.status(204).end());

export default router;
