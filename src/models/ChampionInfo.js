import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addChampion = async (championData) => {
  try {
    const newChampion = await prisma.champion.create({
      data: championData,
    });
    return newChampion;
  } catch (error) {
    throw new Error('Failed to add champion to the database');
  }
};

export const updateChampion = async (id, championData) => {
  try {
    const updatedChampion = await prisma.champion.update({
      where: { championId: id },
      data: championData,
    });
    return updatedChampion;
  } catch (error) {
    throw new Error(`Failed to update champion with ID ${id}`);
  }
};

export const deleteChampion = async (id) => {
  try {
    const deletedChampion = await prisma.champion.delete({
      where: { championId: id },
    });
    return deletedChampion;
  } catch (error) {
    throw new Error(`Failed to delete champion with ID ${id}`);
  }
};

export const getChampions = async (page = 0, size = 10) => {
  try {
    const skip = size * (page - 1);
    const take = size;

    const champions = await prisma.champion.findMany({
      skip,
      take,
    });

    const count = await prisma.champion.count(); 

    return { count, champions };
  } catch (error) {
    throw new Error('Failed to fetch champions from the database');
  }
};

