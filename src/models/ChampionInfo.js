import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export const getChampions = async (page = 0, lang = 'en', size = 10, name, role) => {
  try {
    const response = await axios.get('https://league-of-legends-champions.p.rapidapi.com/champions/' + lang, {
      params: {
        page: page.toString(),
        size: size.toString(),
        name: name ? name : '',
        role: role ? role : '',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RapidAPI_API_KEY,
        'X-RapidAPI-Host': 'league-of-legends-champions.p.rapidapi.com'
      }
    });

    const champions = response.data;

    console.log('Response Data:', champions); // Log the response data

    if (!Array.isArray(champions)) {
      throw new Error('Champions data is not an array');
    }

    return champions;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch League of Legends champions from the API');
  }
};

export const getChampion = async (id, lang = 'en') => {
  try {
    const response = await axios.get(`https://league-of-legends-champions.p.rapidapi.com/champions/${id}/${lang}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RapidAPI_API_KEY,
        'X-RapidAPI-Host': 'league-of-legends-champions.p.rapidapi.com'
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch details for champion ID ${id} from the API`);
  }
};

export const getRegions = async () => {
  try {
    const response = await axios.get('https://league-of-legends-champions.p.rapidapi.com/regions/en-us', {
      headers: {
        'X-RapidAPI-Key': process.env.RapidAPI_API_KEY,
        'X-RapidAPI-Host': 'league-of-legends-champions.p.rapidapi.com'
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch regions from the API');
  }
};

export const getDetail = async (slug, lang = 'en') => {
  try {
    const response = await axios.get(`https://league-of-legends-champions.p.rapidapi.com/regions/${lang}/${slug}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RapidAPI_API_KEY,
        'X-RapidAPI-Host': 'league-of-legends-champions.p.rapidapi.com'
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch region detail for slug ${slug} from the API`);
  }
};

export const getStatics = async (period = 'week', tier = 'platinum') => {
  try {
    const response = await axios.get('https://league-of-legends-champions.p.rapidapi.com/statics/en-us', {
      params: {
        period: period,
        tier: tier
      },
      headers: {
        'X-RapidAPI-Key': process.env.RapidAPI_API_KEY,
        'X-RapidAPI-Host': 'league-of-legends-champions.p.rapidapi.com'
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch champion statics from the API');
  }
};
