import db from '../helpers/db';

export const getChampions = async (skip, take) => {
  const count = await db.Champions.count(); 
  const champions = await db.Champions.findMany({
    skip,
    take,
  });
  return { count, champions };
}


export const getChampion = async (id) =>
  db.Champions.findUnique({ where: { championId: id } });



export const addChampion = async (championData) =>
  db.Champions.create({ data: { ...championData } });




export const updateChampion = async (id, championData) => {
  const champion = await getChampion(id);
  if (champion) {
    return db.Champions.update({
      where: { championId: id },
      data: { ...champion, ...championData, updatedAt: new Date() },
    });
  }
  return null;
};




export const deleteChampion = async (id) =>
  db.Champions.delete({ where: { championId: id } });