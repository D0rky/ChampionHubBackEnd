import { Router } from "express";

import root from './root'
import api from './api'

const router = Router()

router.use('/', root)
router.use('/api', api)
router.use('/favicon.ico', (req, res) => res.status(204))



export default router