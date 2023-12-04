import { PrismaClient } from '@prisma/client';
import db from '../helpers/db'

const prisma = new PrismaClient();


export const getChampions = async (skip, take) => {
  const count = await db.Champion.count()
  const champions = await db.Champion.findMany({
    skip,
    take,
  })
  return { count, champions }
}

export const getChampion = async (id) =>
  db.Champion.findUnique({ where: { championId: id } })

export const addChampion = async (championData) =>
  db.Champion.create({ data: { ...championData } })

  
export const updateChampion = async (id, championData) => {
  const champion = await getChampion(id)
  if (champion) {
    return db.Champion.update({
      where: { championId: id },
      data: { ...champion, ...championData, updatedAt: new Date() },
    })
  }
  return null
}

export const deleteChampion = async (id) =>
  db.Champion.delete({ where: { championId: id } })

