import { Router } from 'express';
import logger from '../helpers/logger';

const router = Router();

router.get('/', (req, res) => {
    logger.info('Inside the ChampionHub root path'); 
    const title = process.env.APP_TITLE || 'ChampionHub Server'; 
    res.send({ msg: title });
});

export default router;
