import { Router } from 'express';
import {
  getChampions,
  addChampion,
  updateChampion,
  deleteChampion,
  getChampion,
} from '../../models/ChampionInfo';

const router = Router();

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10;
  const page = Number(req.query.page) || 1;
  const skip = size * (page - 1);
  const take = size;
  const { count, champions } = await getChampions(skip, take);
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  });
  res.send(champions);
});

router.get('/:id', async (req, res) => {
  const champion = await getChampion(req.params.id);
  if (champion) {
    res.send(champion);
  } else {
    res.status(404).send({ msg: 'Champion not found' });
  }
});

router.post('/', async (req, res) => {
  const champion = await addChampion(req.body);
  res.send(champion);
});

router.put('/:id', async (req, res) => {
  const champion = await updateChampion(req.params.id, req.body);
  if (champion) {
    res.send(champion);
  } else {
    res.status(404).send({ msg: 'Champion not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const champion = await deleteChampion(req.params.id);
  if (champion) {
    res.send(champion);
  } else {
    res.status(404).send({ msg: 'Champion not found' });
  }
});

export default router;
