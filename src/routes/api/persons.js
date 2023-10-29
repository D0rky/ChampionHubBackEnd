import { Router } from 'express'

import {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} from '../../models/persons'

const router = Router()

router.get('/', (req, res) => {
  const persons = getPersons()
  return res.send(persons)
})

router.get('/:id', (req, res) => {
  const person = getPerson(req.params.id);
  if (person) {
    return res.send(person);
  }
  return res.status(404).send({ msg: 'Person not found' });
})

router.post('/', (req, res) => {
  const newPerson = createPerson(req.body);
  if (newPerson) {
    return res.status(201).send(newPerson);
  }
  return res.status(400).send({ msg: 'Bad request' });
})

router.put('/:id', (req, res) => {
  const updatedPerson = updatePerson(req.params.id, req.body);
  if (updatedPerson) {
    return res.send(updatedPerson);
  }
  return res.status(404).send({ msg: 'Person not found' });
})

router.delete('/:id', (req, res) => {
  const deleted = deletePerson(req.params.id);
  if (deleted) {
    return res.send({ msg: `Person ${req.params.id} Deleted` });
  }
  return res.status(404).send({ msg: 'Person not found' });
})

export default router
