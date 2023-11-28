import { Router } from 'express';
import {
  getChampions,
  getChampion,
  addChampion,
  updateChampion,
  deleteChampion
} from '../../models/ChampionInfo';

const router = Router();

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10;
  const page = Number(req.query.page) || 1;
  const skip = size * (page - 1);
  const take = size;

  try {
    const champions = await getChampions(page - 1, 'en', size);
    // Assuming your getChampions function handles pagination and returns champion data
    res.set({
      'X-Total-Count': champions.totalCount, // Assuming totalCount is available in the response
      'X-Total-Pages': Math.ceil(champions.totalCount / size)
    });
    res.send(champions.data); // Assuming champions.data contains the list of champions
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const champion = await getChampion(id, 'en');
    if (champion) {
      res.send(champion);
    } else {
      res.status(404).send({ msg: 'Champion not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const championData = req.body;

  try {
    const newChampion = await addChampion(championData);
    res.send(newChampion);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const championData = req.body;

  try {
    const updatedChampion = await updateChampion(id, championData);
    if (updatedChampion) {
      res.send(updatedChampion);
    } else {
      res.status(404).send({ msg: 'Champion not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedChampion = await deleteChampion(id);
    if (deletedChampion) {
      res.send(deletedChampion);
    } else {
      res.status(404).send({ msg: 'Champion not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default router;
