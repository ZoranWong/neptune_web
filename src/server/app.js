let express = require('express');
let bodyParser = require("body-parser");
let os = require('os');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
let hostName = 'activity.node';
let port = 8090;

app.all('*', (req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


app.get("/get",(req,res) => {
	console.log("请求url：",req.path);
	console.log("请求参数：",req.query);
	res.send("这是get请求");
});


app.post("/post",(req,res) => {
	console.log("请求参数：", req.body);
	var result = {code: 200, msg: "post请求成功"};
	res.send(result);
});

app.listen(port,hostName,() => {
	
	console.log(`服务器运行在http://${hostName}:${port}`);
	
});
