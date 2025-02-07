var connection = require('./config');
module.exports.authenticate=function(req,res){
    var username=req.body.username; //vandana@gmail.com
    var password=req.body.userpassword;
	
	var sellername=req.body.sellername;
    var sellerpassword=req.body.sellerpassword;
    
    
	if(typeof username !== 'undefined')
	{	
	connection.query('SELECT * FROM users WHERE Name = ? AND Password = ?', [username, password],function (error, results, fields) {
      if(results.length >0)
	  {
		 res.sendFile(__dirname +"/home.html");
	  }
	 else{
       console.log("wrong details")
          res.json({
            status:false,
            message:'Incorrect username and password'
            })        
        }
              
    });
	}else{
	console.log("inside seller");
	
	connection.query('SELECT * FROM seller WHERE Name = ? AND Password = ?', [sellername, sellerpassword],function (error, results, fields) {
      if(results.length >0){
		 res.sendFile(__dirname +"/home-seller.html");
	  }
	 else{
       console.log("wrong details")
          res.json({
            status:false,
            message:'Incorrect username and password'
            })
                  
        }
             
    });	
		
	}
	
}




