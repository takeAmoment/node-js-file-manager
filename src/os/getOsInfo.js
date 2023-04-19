import os from 'os';

export const getOsInfo = async (arg) => {
  if( !arg || !arg.startsWith('--')) {
    console.log('Input invalid: you should pass argument using "--"');
    return;
  }
  const param = arg.slice(2);

  switch(param) {
    case 'EOL':
      console.log(`EOL: ${JSON.stringify(os.EOL)}`);
      break;
    case 'cpus':
      const cpus = os.cpus();
      console.log(`Total amount of CPUS: ${cpus.length}`);

      cpus.forEach((item, index) => {
        console.log(`${index + 1}: ${item.model} ${item.speed / 1000} GHz`);
      });
      break;
    case 'homedir':
      console.log(`Homedir: ${os.homedir()}`);
      break;
    case 'username':
      console.log(`System username: ${os.userInfo().username}`);
      break;
    case 'architecture':
      console.log(`CPU architecture: ${os.arch()}`);
      break;
    default:
      console.log('Input invalid: you pass an incorrect arg');
  }

};