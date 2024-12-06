// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Maintain a directory structure
let currentPath: string = '~/';
let directoryTree: Record<string, string[]> = {
  '/': [], // Root directory
};

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort();
  const commandsPerRow = 7; // Number of commands per row
  let formattedCommands = '';

  // Build rows of commands
  for (let i = 0; i < commands.length; i++) {
    formattedCommands += commands[i].padEnd(15); // Adjust padding for alignment
    if ((i + 1) % commandsPerRow === 0 || i === commands.length - 1) {
      formattedCommands += '\n'; // Add a newline after every row
    }
  }

  return `Welcome! Here are all the available commands:
\n${formattedCommands}
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// Directories
export const mkdir = async (args: string[]): Promise<string> => {
  if (!args[0]) {
    return 'usage: mkdir \'directory_name\'';
  }

  const newDir = args[0];
  if (!/^[a-zA-Z0-9-_]+$/.test(newDir)) {
    return `mkdir: '${newDir}' is an invalid directory name`;
  }

  // Get the current directory list
  const currentDirs = directoryTree[currentPath] || [];
  if (currentDirs.includes(newDir)) {
    return `mkdir: cannot create directory '${newDir}': File exists`;
  }

  // Create the directory
  currentDirs.push(newDir);
  directoryTree[currentPath] = currentDirs;

  // Initialize subdirectory for the new directory
  directoryTree[`${currentPath}${newDir}/`] = [];

  return `Directory '${newDir}' created at ${currentPath}`;
};

// ls
export const ls = async (args: string[]): Promise<string> => {
  const dirs = directoryTree[currentPath] || [];
  return dirs.length > 0 ? dirs.join('\n') : 'No directories found';
};

// pwd
export const pwd = async (args: string[]): Promise<string> => {
  return currentPath;
};

// cd
export const cd = async (args: string[]): Promise<string> => {
  if (!args[0]) {
    return 'cd: missing directory name';
  }

  const targetDir = args[0];

  if (targetDir === '..') {
    // Navigate up a directory
    if (currentPath === '~/') {
      return 'cd: already at root directory';
    }
    currentPath = currentPath.substring(0, currentPath.lastIndexOf('/', currentPath.length - 2) + 1);
    return `Moved to ${currentPath}`;
  }

  const newPath = `${currentPath}${targetDir}/`;
  if (!directoryTree[newPath]) {
    return `cd: no such directory: ${targetDir}`;
  }

  currentPath = newPath;
  return `Moved to ${currentPath}`;
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
Welcome to my website! 

I’m a junior at Boise State University, majoring in Computer Science. 
I’m passionate about building innovative projects and solving complex problems through code. 
Whether it’s creating efficient algorithms or designing fun, user-friendly applications 
like this one, I love turning ideas into reality.

More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'readme' - my github readme.`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
 █████╗ ██╗     ███████╗██╗  ██╗    ████████╗ █████╗ ██╗   ██╗██╗      ██████╗ ██████╗ 
██╔══██╗██║     ██╔════╝╚██╗██╔╝    ╚══██╔══╝██╔══██╗╚██╗ ██╔╝██║     ██╔═══██╗██╔══██╗
███████║██║     █████╗   ╚███╔╝        ██║   ███████║ ╚████╔╝ ██║     ██║   ██║██████╔╝
██╔══██║██║     ██╔══╝   ██╔██╗        ██║   ██╔══██║  ╚██╔╝  ██║     ██║   ██║██╔══██╗
██║  ██║███████╗███████╗██╔╝ ██╗       ██║   ██║  ██║   ██║   ███████╗╚██████╔╝██║  ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝       ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═╝
                                                                                       

Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
`;
};
