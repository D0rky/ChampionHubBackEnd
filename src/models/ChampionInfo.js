import db from '../helpers/db';

export const getChampions = async (skip, take) => {
  const count = await db.champion.count();
  const champions = await db.champion.findMany({
    skip,
    take,
  });
  return { count, champions };
};

export const getChampion = async (id) =>
  db.champion.findUnique({ where: { championId: id } });

export const addChampion = async (championData) =>
  db.champion.create({ data: { ...championData } });

export const updateChampion = async (id, championData) => {
  const champion = await getChampion(id);
  if (champion) {
    return db.champion.update({
      where: { championId: id },
      data: { ...champion, ...championData, updatedAt: new Date() },
    });
  }
  return null;
};

export const deleteChampion = async (id) =>
  db.champion.delete({ where: { championId: id } });
