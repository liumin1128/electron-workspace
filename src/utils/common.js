
export const run = (script, options) =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = script.split(' ');
    console.log('cmd, args');
    console.log(cmd, args);

    const { spawn } = window.require('child_process');
    const child = spawn(cmd, args, options);
    let result = '';
    child.stdout.on('data', (data) => {
      result += data.toString();
    });
    child.stdout.on('end', () => resolve(result));
    child.stderr.on('data', (data) => {
      console.log(`Error: \n${data}`);
      reject(data);
    });
    child.on('exit', (code, signal) => {
      console.log(`Exit: ${code} ${signal}`);
      // reject(code);
    });
  });
