
// 导入路由
const http = require('http');
const express = require('express');
const server = express();
const data = require('./router.js');
server.use('/mock', data);
const log = console.log.bind(console);
const config = require('./config.json');
const ip = require('./lib/IP.js').IPv4;
//启动服务
http.createServer(server).listen(config.port);

log(`服务启动, http://${ip}:${config.port}`);
log(`------------------------------------------`);

// server.use("/mock/sys/menu",function (req, res, next) {
//     console.log("ceshi");
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     next();
// });

// const chokidar = require('chokidar');
// const watcher = chokidar.watch('./template', {
//     ignored: /(^|[\/\\])\../, // ignore dotfiles
//     persistent: true
// });
// let curtime = new Date().getTime();
// watcher
//     .on('add', path => dealChange(path, "添加"))
//     .on('change', path => dealChange(path, "修改"))
//     .on('unlink', path => dealChange(path, "删除"));
// function dealChange(path, text) {
//     let t = new Date().getTime()
//     if (t - curtime > 200) {
//         log(`${text}文件：${path}，服务重新加载！ `);
//     }
//     curtime = t
// }
