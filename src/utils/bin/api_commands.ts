// // List of commands that require API calls

import { getCrypto, getProjects } from '../api';
import { getQuote } from '../api';
import { getReadme } from '../api';
import { getWeather } from '../api';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();
  return projects
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join('\n');
};

export const quote = async (args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const readme = async (args: string[]): Promise<string> => {
  const readme = await getReadme();
  return `Opening GitHub README...\n
  ${readme}`;
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather casablanca';
  }
  const weather = await getWeather(city);
  return weather;
};

export const crypto = async (args: string[]): Promise<string> => {
  if (args.length === 0 || args.some(arg => arg.trim() === '')) {
    return `Usage: crypto 'cryptocurrency name'\nExample: crypto bitcoin`;
  }
  const crypto = args.join('+');
  const data = await getCrypto(crypto);
  if (data === 'Invalid currency name.') {
    return `Error: ${crypto} is not a valid cryptocurrency name.`;
  }

  return `Price of ${crypto}: $${data}`;
}