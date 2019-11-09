const express = require('express');
const Mock = require('mockjs');
const router = express.Router();
const fs = require("fs");
const ROOTPATH = './template';
const ip = require('./tool/IP.js').IPv4;
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
    let template = require(path);
    let data = Mock.mock(template);
    let url = `http://${ip}:${config.port}/mock${rout}`;


    let m = data.CLIENTMETHOD ? data.CLIENTMETHOD.toLocaleUpperCase() : CLIENTMETHOD.get;
    data.CLIENTMETHOD = undefined;
    let requ = (res) => {
        res.json(data);
        if (config.watch == "true") {
            console.log(`${m}请求：${url}`);
        }
    }
    let get = () => {
        router.get(rout, (req, res, next) => {
            requ(res);
        });
    }
    let post = () => {
        router.post(rout, (req, res, next) => {
            requ(res);
        });
    }
    switch (m) {
        case CLIENTMETHOD.post:
            post();
            break;
        case CLIENTMETHOD.get:
            get();
        default:
            get();
    }

    console.log(`${++total}）${m.toLocaleUpperCase()}：${url}`);

}
total = 0;

findfile("", "");

console.log(`一共${total}个接口`);
module.exports = router;

