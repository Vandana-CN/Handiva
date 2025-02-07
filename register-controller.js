var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./config');
// cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.register=function(req,res){
    var today = new Date();
  //var encryptedString = cryptr.encrypt(req.body.password);
    var users={
		
        "Name":req.body.username,
        "Email":req.body.useremail,
        "Password":req.body.userpassword
    }
	
		var seller={
		
        "Name":req.body.sellername,
        "Email":req.body.selleremail,
        "Password":req.body.sellerpassword
    }
	
	if(typeof users.Name !== 'undefined')
    {
		
	console.log("inside users");
	
	connection.query('SELECT * FROM users WHERE Name = ? AND Email = ?', [users.Name, users.Email],function (error, results, fields) {
      if(results.length >0)
	  {
		 res.sendFile(__dirname +"/index.html");
	  }
	 else{
      
      connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error){
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          
            res.sendFile(__dirname +"/home.html");
          
      }
		});          
                  
        }
        
    });
	
	}
	else{
		
	connection.query('SELECT * FROM seller WHERE Name = ? AND Email = ?', [seller.Name, seller.Email],function (error, results, fields) {
      if(results.length >0)
	  {
		 res.sendFile(__dirname +"/index.html");
	  }
	 else{
      
      connection.query('INSERT INTO seller SET ?',seller, function (error, results, fields) {
      if (error){
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          
            res.sendFile(__dirname +"/home-seller.html");
          
      }
		});          
                  
        }
              
    });
		
	}
		
}

//res.sendFile(path.join(__dirname, 'login.html'));