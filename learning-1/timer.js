// 重构
// const printProgramInfo = require('./info');
// const dateTime = require('./dateTime');
setTimeout(() => {
    console.log('Hello World!');
}, 3000);

console.log('当前进程 ID', process.pid);
console.log('当前脚本路径', __filename);

const time = new Date();
console.log('当前时间', time.toLocaleString());

// 重构
// printProgramInfo();
// console.log('当前时间', dateTime.getCurrentTime());
