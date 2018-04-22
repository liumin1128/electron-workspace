
export const run = (script, options, push) =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = script.split(' ');
    console.log('cmd, args');
    console.log(cmd, args);

    const { spawn } = window.require('child_process');
    const child = spawn(cmd, args, options);
    const result = '';
    child.stdout.on('data', (data) => {
      console.log('data.toString()');
      console.log(data.toString());
      push(data.toString());
      // result += data.toString();
    });
    child.stdout.on('end', () => resolve(result));
    child.stderr.on('data', (data) => {
      console.log(`Error: \n${data}`);
      reject(data);
    });
    child.on('exit', (code, signal) => {
      console.log(`Exit: ${code} ${signal}`);
      if (code !== 0) {
        // reject(code);
      }
      // reject(code);
    });
  });
