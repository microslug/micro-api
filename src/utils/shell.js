import util  from 'util';
const exec = util.promisify(require('child_process').exec);

export async function shell(cmd) {
    try {
  const { stdout, stderr } = await exec(cmd);
  if (!stderr) {
      return stdout;
  } else {
      return stderr
  }
    } catch( err ) {
        return `Error: Command ${cmd} failed`;
    }
}

