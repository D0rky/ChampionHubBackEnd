import db from '../helpers/db';

export const getChampions = async (skip, take) => {
  const count = await db.Champions.count(); 
  const champions = await db.Champions.findMany({
    skip,
    take,
  });
  return { count, champions };
}


export const getChampion = async (championId) =>
  db.Champions.findUnique({ where: { id: championId } });




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




export const deleteChampion = async (championId) => {
  try {
    // Check if the record exists before attempting to delete
    const existingChampion = await db.Champions.findUnique({
      where: {
        id: championId // Assuming 'id' is the field name for championId
      }
    });

    if (!existingChampion) {
      // If the record doesn't exist, handle the scenario accordingly
      console.log(`Champion with ID ${championId} does not exist.`);
      return null; // Or throw an error, depending on your application flow
    }

    // If the record exists, proceed with deletion
    const deletedChampion = await db.Champions.delete({
      where: {
        id: championId // Assuming 'id' is the field name for championId
      }
    });

    console.log(`Champion with ID ${championId} has been deleted successfully.`);
    return deletedChampion;
  } catch (error) {
    console.error(`Error deleting champion with ID ${championId}:`, error);
    throw new Error(`Error deleting champion with ID ${championId}: ${error.message}`);
  }
};

