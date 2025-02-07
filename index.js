var express=require("express");
var bodyParser=require('body-parser');
var multer = require('multer');
var connection = require('./config');
var app=express();
var path = require("path");
var fs = require("fs");
app.use(express.static('images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  dest: "./images/"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post("/upload", upload.single("file"), function(req, res){
	
    var tempname = Math.random().toString(36).substring(7);
		tempname = tempname.concat('.jpg');
	const tempPath = req.file.path;
	const targetPath = path.join(__dirname, "./images/"+tempname);
	 
	 if (path.extname(req.file.originalname).toLowerCase() === ".jpg")
	 {
		fs.rename(tempPath, targetPath, () => {
			
		var product={
		
        "Name":req.body.productname,
        "Price":req.body.productprice,
        "Description":req.body.productdescription,
		"Imageid": tempname,
		"Sellername": req.body.cookiesellername,
		"Type": req.body.producttype
		}
		
		//console.log(req.body.cookiesellername);
	  
	  connection.query('INSERT INTO products SET ?',product, function (error, results, fields) {
      if (error){
        res.json({
            status:false,
            message:'there are some error with sql query while uploading product'
                })
      }else{
          res.sendFile(__dirname + "/home-seller.html");
		}
		});
		
		});
		
	}else {
	
		res.json({
          status:false,
          message:'Only .jpg files allowed'
		})
	
	}		
	
  }
);

//Load seller products

app.post('/loadsellerproducts', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	
	console.log("seller name is");
	console.log(request.body.sellername);
	
	connection.query('SELECT * FROM products where Sellername="'+request.body.sellername+'"', function(err, rows){
		var list = rows;
		console.log("sending rows");
  response.send(rows);    // echo the result back
	})
  });
  
//all products
app.post('/loadallproducts', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	connection.query('SELECT * FROM products', function(err, rows){
		var list = rows;
		console.log("sending rows");
  response.send(rows);    // echo the result back
	})
  });  
  
  //wood
  
  app.post('/loadwoodproducts', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	connection.query('SELECT * FROM products where Type="wood"', function(err, rows){
		var list = rows;
		console.log("sending rows");
		//console.log(list[0].Type);
		//console.log(list.length);
  response.send(rows);    // echo the result back
	})
  });  

//metal
app.post('/loadmetalproducts', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	connection.query('SELECT * FROM products where Type="metal"', function(err, rows){
		var list = rows;
		console.log("sending rows");
		//console.log(list[0].Type);
		//console.log(list.length);
  response.send(rows);    // echo the result back
	})
  });  

//jute
app.post('/loadjuteproducts', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	connection.query('SELECT * FROM products where Type="jute"', function(err, rows){
		var list = rows;
		console.log("sending rows");
		//console.log(list[0].Type);
		//console.log(list.length);
  response.send(rows);    // echo the result back
	})
  });  

//terracotta
app.post('/loadterracottaproducts', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	connection.query('SELECT * FROM products where Type="terracotta"', function(err, rows){
		var list = rows;
		console.log("sending rows");
		//console.log(list[0].Type);
		//console.log(list.length);
  response.send(rows);    // echo the result back
	})
  });  


app.post('/addtocart', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	
	var addtocart = {Imageid:"", username:""}; 
	addtocart.Imageid = request.body.Imageid;
	addtocart.username = request.body.username;
	
	connection.query('SELECT * FROM wishlist where Imageid="'+request.body.Imageid+'" and username="'+request.body.username+'"', function(err, rows){
	if(rows.length>0)
	{
		
	response.send("Already in the cart");    // echo the result back	
	
	}else{
	
	connection.query('INSERT INTO wishlist SET ?',addtocart, function (error, results) {

	response.send("Added");    // echo the result back
	});	
	
	}	
		
	});

  });

app.post('/removefromcart', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	
	var remove = {Imageid:"", username:""}; 
	remove.Imageid = request.body.Imageid;
	remove.username = request.body.username;
	
	console.log(remove.Imageid);
	console.log(remove.username);
		
	connection.query("DELETE FROM wishlist WHERE Imageid = ? AND username = ?", [remove.Imageid, remove.username], function(err, rows){
	response.send("Removed from cart");    // echo the result back	 
	
	});
	
  });


app.post('/loadcart', function(request, response){
	response.setHeader('Content-Type', 'application/json');    // your JSON
	connection.query('SELECT * FROM wishlist where username="'+request.body.username+'"', function(err, rows){
		var list = rows;
		console.log("sending rows");

  response.send(rows);    // echo the result back
	})
  });

var authenticateController=require('./authenticate-controller');
var registerController=require('./register-controller');
 
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/index.html" );  
})  
 
app.get('/login', function (req, res) {  
   res.sendFile( __dirname + "/login.html" );
}) 

 
app.post('/login', function (req, res) {  
   res.sendFile( __dirname + "/login.html" );  //   C:\Users\VANDANA\Desktop\nodejs\login.html
})  										  // __dirname = "C:\Users\VANDANA\Desktop\nodejs"
											  // ("__dirname + /login.html" )  ===> (__dirname + /login.html)
											  // (__dirname + "/login.html" ) 	==> (C:\Users\VANDANA\Desktop\nodejs\login.html ) 			
//

app.get("/home-seller", function (req, res) {
    res.sendFile(__dirname + "/home-seller.html");
})

//

app.get("/home", function (req, res) {
    res.sendFile(__dirname + "/home.html");
})


app.get('/addproduct', function (req, res) {  
   res.sendFile( __dirname + "/home-seller.html" );  
})


app.post('/payment', function (req, res) {  
   res.sendFile( __dirname + "/payment.html" );  
}) 

app.get('/logout', function (req, res) {  
   res.sendFile( __dirname + "/login.html" );  
}) 

/* route to handle login and registration */
 
app.post('/register-controller', registerController.register);
app.post('/authenticate-controller', authenticateController.authenticate);

app.listen(3000);

