import { Router } from 'express'

import {
  getChampions,
  addChampion,
  updateChampion,
  deleteChampion,
} from '../../models/ChampionInfo'

const router = Router()

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10
  const page = Number(req.query.page) || 1
  const skip = size * (page - 1)
  const take = size
  const { count, Champions } = await getChampions(skip, take)
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  })
  res.send(Champions)
})

router.get('/:id', async (req, res) => {
  const Champion = await getChampion(req.params.id)
  if (Champion) {
    res.send(Champion)
  } else {
    res.status(404).send({ msg: 'Champion not found' })
  }
})

router.post('/', async (req, res) => {
  const Champion = await addChampion(req.body)
  res.send(Champion)
})

router.put('/:id', async (req, res) => {
  const Champion = await updateChampion(req.params.id, req.body)
  if (Champion) {
    res.send(Champion)
  } else {
    res.status(404).send({ msg: 'Champion not found' })
  }
})

router.delete('/:id', async (req, res) => {
  const Champion = await deleteChampion(req.params.id)
  if (Champion) {
    res.send(Champion)
  } else {
    res.status(404).send({ msg: 'Champion not found' })
  }
})

export default router
