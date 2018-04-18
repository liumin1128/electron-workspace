export function run(script, cb, options) {
  const [cmd, ...args] = script.split(' ');
  const { spawn } = window.require('child_process');
  const child = spawn(cmd, args, options);
  let result = '';
  child.stdout.on('data', (data) => {
    result += data.toString();
  });
  child.stdout.on('end', () => {
    cb(result);
  });
  child.stderr.on('data', (data) => {
    console.log(`Error: \n${data}`);
  });
  child.on('exit', (code, signal) => {
    console.log(`Exit: ${code}`);
  });
}
