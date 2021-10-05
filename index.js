/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const fs = require('fs');
const admin = require("firebase-admin");
const bodyParser=require('body-parser');
const cors = require('cors');

/*
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({ });

let bucketName = "gs:terminal-8c860.appspot.com";
let bucket = storage.backet(bucketName);
*/
/*
const gcloud = require('@google-cloud/storage');

const storage = gcloud.storage({
    projectId: 'terminal-8c860',
    keyFilename: 'service-account-credentials.json',
});
*/
//const bucket = storage.bucket('terminal-8c860.appspot.com');

//const sharp = require('sharp');
//const pixi = require('pixi.js');
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

// The Firebase Admin SDK to access Firestore.

const app = express();
app.use(cors({
	origin: '*', //アクセス許可するオリジン
	credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
	optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}))

//const firebase = require("firebase-database");
admin.initializeApp({
	databaseURL: "https://terminal-8c860-default-rtdb.firebaseio.com/",
	storageBucket: 'gs://terminal-8c860.appspot.com/',
	client_email: "taisey02@gmail.com"
});
app.use(bodyParser.urlencoded({ extended: true }));
const bucket = admin.storage().bucket();
/*
var database = admin.database();
var db = admin.firestore();
var storage = require('@google-cloud/storage');
const bucket = storage.bucket('terminal-8c860.appspot.com');
*/

var database = admin.database();
var db = admin.firestore();
function writeUserData(userId, name, date, query) {
	database.ref('users/' + userId + '/' + date).set({
			username: name,
			date: date,
			query: query
	});
}
//app.set('views', '../public/');
//app.engine('ejs', require('ejs').__express);
app.get('/timestamp', (request, response) => {
	response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	response.send(`${Date.now()}`);
});
/*
let pi_app = new pixi.Application({
	width: 600,
	height: 600,
	backgroundClolor:0x1099bb,
});
*/
app.get('/querycheck', (request, response) => {
	response.send({queries: request.query});
});

//const generator = require('./generator_jimp');
//const gen = new generator("../public/img/background.png");
app.get('/photo', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	console.log('image');
	//response.type('png');
	//response.send(image);
	let blended = gen.photos_mix("../public/img/boy.png", "../public/img/train.png");
	//response.type('png');
	//response.send(blended);

	fs.readFile('../public/img/output.png', (err, data) => {
		response.type('png');
		response.send(data);
	});
});

app.get('/', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	console.log("query check:", {queries: request.query});
	//response.render("../public/pixi.ejs", request.query);
	response.render("pixi.ejs", request.query);
	/*fs.readFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.ejs", "UTF-8", function (err, data) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
		});
		*/
	})

app.get('/pixi', (request, response) => {
//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
console.log("query check:", {queries: request.query});
response.render("pixi.ejs", request.query);
/*fs.readFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.ejs", "UTF-8", function (err, data) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(data);
	response.end();
	});
	*/
})

app.get('/index.js', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
		fs.readFile("../public/sample.js", "UTF-8", function (err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.write(data); 
		response.end();
		});
})

app.get('/bundle.css', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
		fs.readFile("../bundle.css", "UTF-8", function (err, data) {
		response.writeHead(200, {"Content-Type": "text/javascript"});
		response.write(data); 
		response.end();
		});
})

app.get('/img/boy', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	fs.readFile("../public/img/boy.png", function (err, data) {
		//response.writeHead(200, {"Content-Type": "image/png"});
		response.type("png");
		response.send(data);
		response.end();
	});
});

app.get('/img/train', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	fs.readFile("../public/img/train.png", function (err, data) {
		//response.writeHead(200, {"Content-Type": "image/png"});
		response.type("png");
		response.send(data);
		response.end();
	});
});
		
app.get('/img/girl1', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	fs.readFile("./img/girl1.png", function (err, data) {
		//response.writeHead(200, {"Content-Type": "image/png"});
		response.type("png");
		response.send(data);
		response.end();
	});
});
app.get('/img/girl2', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	fs.readFile("./public/img/girl2.png", function (err, data) {
		//response.writeHead(200, {"Content-Type": "image/png"});
		response.type("png");
		response.send(data);
		response.end();
	});
});
	
app.get('/img/bicycle', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	fs.readFile("../img/bicycle.png", function (err, data) {
		//response.writeHead(200, {"Content-Type": "image/png"});
		response.type("png");
		response.send(data);
		response.end();
	});
});
app.get('/img/girl3', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	fs.readFile("../public/img/girl3.png", function (err, data) {
		//response.writeHead(200, {"Content-Type": "image/png"});
		response.type("png");
		response.send(data);
		response.end();
	});
});
app.get('/img/baseball', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	fs.readFile("../public/img/baseball.png", function (err, data) {
		//response.writeHead(200, {"Content-Type": "image/png"});
		response.type("png");
		response.send(data);
		response.end();
	});
});
app.get('/img/game', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	fs.readFile("../public/img/game.png", function (err, data) {
		//response.writeHead(200, {"Content-Type": "image/png"});
		response.type("png");
		response.send(data);
		response.end();
	});
});
						
let prefix = "./database/";
app.get('/save2', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let json = request.query;
	/*
	console.log(json);
	fs.writeFile(prefix + json.username + "-" + json.date + ".json", JSON.stringify(request.query, null, '     '),  (err) => {
		// 書き出しに失敗した場合
		if(err){
				console.log("エラーが発生しました。" + err)
				throw err
		}
		else{
			console.log("ファイルが正常に書き出しされました")
	}
	});
	*/
	writeUserData(json.username, json.username, json.date, json.query);
	response.end();
});
app.get('/load2', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let json = request.query;
/*
	console.log("load: start");
fs.readFile(prefix + json.username + "-" + json.date + ".json",'utf8', function (err, data) {
	//response.writeHead(200, {"Content-Type": "image/png"});
	console.log("data: ", data);
	let parsed_data = JSON.parse(data);
	console.log("data.query: ", parsed_data.query);
	response.redirect('/pixi?' + parsed_data.query);
	response.end();
});
*/
	const dbRef = admin.database().ref();
	dbRef.child("users").child(json.username).child(json.date).get().then((snapshot) => {
			if (snapshot.exists()) {
				console.log("snapshot:", snapshot.val());
				let parsed_data = snapshot.val();
				response.redirect('/pixi?' + parsed_data.query);
				response.end();
			} else {
					console.log("No data available");
					response.end();
			}
	}).catch((error) => {
			console.error(error);
			response.end();
	});
/*
var querytRef = admin.database().ref('posts/' + json.username + '/' + json.date);
queryRef.on('value', (snapshot) => {
		const data = snapshot.val();
		updateStarCount(postElement, data);
});
*/
});



app.get('/save', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let json = request.query;
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	const ref = db.collection('users').doc(json.username)
	.collection('movies').doc(json.date).set({query:json.query, date:new Date(json.date), desc:json.desc, date_s:json.date, title:json.title});			
	db.collection('users').doc(json.username).set({username: json.username});
	response.end();
});

app.get('/load', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let json = request.query;
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	console.log("json: ", json);
	console.log("access here");
	const ref = db.collection('users').doc(json.username).collection("movies").where("date_s", "==", json.date).get().then((Snapchat) =>{
		Snapchat.forEach((doc) => {
			response.redirect("/pixi?" + doc.data().query + '&username=' + json.username + '&date=' + doc.data().date_s);
			response.end();
		})
	})
});
app.get('/load-day', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let json = request.query;
	let id_l = [];
	let check_list = [];
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	const ref =  db.collection('users').get().then((Snapchat) => {
		var message = {};
		 Snapchat.forEach((doc) =>{
			id_l.push(doc.id);
			console.log("doc.id:", doc.id);
		});
		console.log("id_list:", id_l);
		for (let i = 0; i < id_l.length; i++){
			let id = id_l[i];
			console.log("id: ",id);
			db.collection('users').doc(id).collection('movies').where("date_s", "==", json.date).get().then((Snapchat2) => {
				check_list.push(1);
				Snapchat2.forEach((doc3) => {
					console.log("forEach: start");
					console.log("doc2.id:", doc3.id);
					console.log("id: ", id);
					 message[id] = {title: doc3.data().title, desc: doc3.data().desc, query: doc3.data().query};
					console.log("message, id:",message,id);
				})
				if(check_list.length >= id_l.length)
				{
					response.type("json");
					response.send(message);
					response.end();
				}
			});
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
		response.end();
	});
});

app.get('/load-check', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let json = request.query;
	let id_l = [];
	let message = {};
	db.collection('users').doc("raku")
	.collection('movies').where("date", "==", new Date(json.date)).get().then((Snapchat2) => {
		console.log("Snapchat2.lentgh", Snapchat2.length);
		Snapchat2.forEach((doc2) => {
			message[doc2.data().username] = {title: doc2.data().title, desc: doc2.data().desc, query: doc2.data().query};
		})
		response.type("json");
		response.send(message);
		response.end();
	}).catch((error) => {
	console.log("Error getting document:", error);
	response.end();
	});
});

app.get('/load-month', (request, response) => {
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let json = request.query;
	let month = new Date(json.month);
	let next_month = new Date(json.month);
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	next_month.setMonth(next_month.getMonth() + 1);
	const ref = db.collection('users').doc(json.username)
	.collection('movies').where("date", ">=", month).where("date", "<", next_month).get().then((Snapchat) => {
		console.log("spap_length:", Snapchat.length);
		var message = {};
		Snapchat.forEach((doc) =>　{
			console.log(doc.data().date);
			message[doc.data().date_s] = {title: doc.data().title, desc: doc.data().desc, query: doc.data().query};
		});
		console.log("message:", message);
		response.type('json');
		response.send(message);
		response.end();
	}).catch((error) => {
		console.log("Error getting document:", error);
		response.end();
	});
});

app.post('/save-movie',(request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let header = Number((new TextDecoder).decode(Uint8Array.from(request.body.slice(0,2))));
	let filename = (new TextDecoder).decode(Uint8Array.from(request.body.slice(2, header)));
	fs.writeFile("/tmp/"+ filename, request.body.slice(header),function(err, result) {
		if(err) console.log('error', err);});
		var remoteFile = bucket.file(filename);
		var localFilename = "/tmp/" + filename;
		bucket.upload(localFilename, function(err, file) {
			if (!err) {
					console.log('file is now in your bucket.');
			} else {
					console.log('Error uploading file: ' + err);
			}
		});
		response.end();
});

app.get('/send-movie', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	let json = request.query;
	var filename = json.username + json.date + ".webm";
	var remoteFile = bucket.file(filename);
	remoteFile.download({destination: "/tmp/" + filename}).then(() =>{
		fs.readFile("/tmp/" + filename, (err, data) => {
			response.type("webm");
			response.send(data);
			response.end();
		});
	})
});

	/*
	remoteFile.getPublicUrl( {action: 'read',
	expires: '03-09-2491'
}).then(() => {
		console.log("getSignedUrl");
	}).catch((error) => {
		console.error(error);
		response.end();
});
*/

app.get('/make-thumbnail', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	response.render("make_thumbnail.ejs", request.query);
});

app.post('/save-thumbnail',(request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	console.log("start: save-thumbnail");
	//response.sendFile("/Users/ichikawataisei/Desktop/hackson/sky/v2firebase/public/pixi.html");
	let header = Number((new TextDecoder).decode(Uint8Array.from(request.body.slice(0,2))));
	let filename = (new TextDecoder).decode(Uint8Array.from(request.body.slice(2, header)));
	console.log("filename: ", filename);
	fs.writeFile("/tmp/"+ filename, request.body.slice(header),function(err, result) {
		if(err) console.log('error', err);
	});
		var remoteFile = bucket.file(filename);
		var localFilename = "/tmp/" + filename;
		bucket.upload(localFilename, function(err, file) {
			if (!err) {
					console.log('file is now in your bucket.');
			} else {
					console.log('Error uploading file: ' + err);
			}
		});
	response.end();
});

app.get('/send-thumbnail', (request, response) => {
	response.set("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Origin', '*');
	let json = request.query;
	var filename = json.username + json.date + "_thumb.jpg";
	var remoteFile = bucket.file(filename);
	remoteFile.download({destination: "/tmp/" + filename}).then(() =>{
		fs.readFile("/tmp/" + filename, (err, data) => {
			response.type("jpg");
			response.send(data);
			response.end();
		});
	})
});
//exports.app = functions.https.onRequest(app);
exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });