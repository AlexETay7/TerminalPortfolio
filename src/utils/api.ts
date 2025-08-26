import axios from 'axios';
import config from '../../config.json';

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );
  return data;
};

export const getReadme = async () => {
  const { data } = await axios.get(config.readmeUrl);
  return data;
};

export const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATm`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getQuote = async () => {
  return {
    quote: `"In times of change, learners inherit the earth, while the learned find themselves beautifully equipped to deal with a world that no longer exists." — Eric Hoffer (1898-1983)`,
  };
};

export const getCrypto = async (crypto: string) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_COINCAP_API_KEY;
    const { data } = await axios.get(`https://rest.coincap.io/v3/assets/${crypto}?apiKey=${apiKey}`);
    return data.data.priceUsd;
  } catch (error) {
    return 'Invalid currency name.'
  }
}