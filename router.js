const express = require('express');
const Mock = require('mockjs');
const router = express.Router();
const fs = require("fs");
const ROOTPATH = './template';
const ip = require('./lib/IP.js').IPv4;
const config = require('./config.json');
const CLIENTMETHOD = {
    post: "POST", get: "GET"
}

/**
 * 发现文件并形成路由
 * @param {*} rout 路由
 * @param {*} file 文件或目录名称
 */
function findfile(rout, file) {
    let path = `${ROOTPATH}${rout}/${file}`;
    let stat = fs.lstatSync(path);
    let fileName = file.split(".")[0];
    let r = "";
    if (file != "") {
        r = `${rout}/${fileName}`;//路由
    }
    let isDir = stat.isDirectory();
    if (!isDir) {//如果是文件
        mock(r, path);
        return;
    }
    //如果是目录
    let files = fs.readdirSync(path);
    for (let f of files) {
        findfile(r, f);
    }
}

/**
 * 模仿数据
 * @param  rout  url请求路径
 * @param  path 文件路径
 */
let mock = (rout, path) => {
    rout=`${rout.toLowerCase()}`
    let template = require(path); 
    let data = Mock.mock(template);
    let url = `http://${ip}:${config.port}/mock${rout}`;
    let requ = (req, res) => {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", "*");
        //允许的header类型
        res.header("Access-Control-Allow-Headers", "Content-Type, api_key, Authorization,*");
        //跨域允许的请求方式 
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

        if (req.method.toLowerCase() == 'options')
            res.send(200);  //让options尝试请求快速结束
        else
            res.json(data);

        if (config.watch == "true") {
            console.log(`请求：${url}`);
        }
    }
    router.post(rout, (req, res, next) => {
        requ(req, res);
    });
    router.options(rout, (req, res, next) => {
        requ(req, res);
    });
    router.get(rout, (req, res, next) => {
        requ(req, res);
    });
    router.get(`${rout}/:id`, (req, res, next) => {
        requ(req, res);
    });
    router.options(`${rout}/:id`, (req, res, next) => {
        requ(req, res);
    });
    console.log(`${++total}）：${url}`);

}
total = 0;

findfile("", "");

console.log(`一共${total}个接口`);
module.exports = router;

