* 启动：node server.js（没监控） 或 nodemon --watch template server.js
* 功能：1）数据模拟，2）路由模拟，3）可配置；
* reference.js可以写常用的mockjs语法模板；

### 预研：
1）搭建脚手架，一键安装；
指标：
全局按照：
npm install -g @sae/mock-cli
建立项目：
mk new  <name> [options] 
options:--port=3000  --watch=true/false
运行：
mk run [options]
options:--platform=cmd/pm2

(
    利用pm2管理服务；
    https://segmentfault.com/a/1190000015222967；
    https://www.jb51.net/article/155518.htm；
    https://segmentfault.com/a/1190000016487610；
    https://juejin.im/post/5d85e9bbe51d4561af16ddd7；*
)

2）watch文件改变，自动启动；
利用的是nodemon来动态监控，我简单看了下nodemon的源码，它的监控利用的文件监控组件chokidar，事件组件events，重启用到了childProcess和process，先结束pid（taskkill /pid  /T /F）再启动。
nodemon --watch template server.js启动
1-2-3









