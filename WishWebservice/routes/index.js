
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

// exports.getWishCardInfo = function(req,res){
// 	// res.render('name':'shuaidai');
// 	// res.send({"name":"许愿卡","num":"1"});
	// console.log(req.query);
	// console.log("================");
	// console.log(req.body);
	// res.send({});
// };
var mongodb = require('../models/db');

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: '主页' });
  });
 //  app.get('/getWishCardInfo', function (req, res) {

 // });
 //   app.get('/saveWishCardInfo', function (req, res) {

 // });
  app.post('/getWishCardInfo', function (req, res) {
	console.log("===getWishCardInfo========");
	console.log(req.body.username);

		var name=req.body.username;

	mongodb.open(function (err, db) {
		if (err) {
      // return callback(err);//错误，返回 err 信息
      res.send({"code":"0","msg":err});
  }
    //读取 users 集合
    db.collection('users', function (err, collection) {
    	if (err) {
    		mongodb.close();
        // return callback(err);//错误，返回 err 信息
        res.send({"code":"0","msg":err});
    }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
      	username: name
      }, function (err, user) {
      	mongodb.close();
      	if (err) {
          // return callback(err);//失败！返回 err 信息
          res.send({"code":"0","msg":err});
      }
        // callback(null, user);//成功！返回查询的用户信息
        if (user != null) {
            res.send({"code":"1","info":user});
        }else{
          res.send({"code":"0","msg":"未找到"});
        }
        
    });
  });
});

 });

  app.post('/saveWishCardInfo', function (req, res) {
	console.log("=====saveWishCardInfo=======");
	console.log(req.body.username);
	//打开数据库
			var user = {
		username:req.body.username,
		cardName:req.body.cardName,
		cardDesc:req.body.cardDesc,
		endTime:req.body.endTime
};
mongodb.open(function (err, db) {
    if (err) {
      res.send({"code":"0","msg":err});//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
       res.send({"code":"0","msg":err});//错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user, {
        safe: true
      }, function (err, user) {
        mongodb.close();
        if (err) {
          res.send({"code":"0","msg":err});//错误，返回 err 信息
        }
        res.send({"code":"1","msg":""});//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });

 });};