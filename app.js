/**
 * Module dependencies.
 */
//require.paths.unshift('./node_modules');
var express = require('express')
    , routes = require('./routes')
    , connect = require('express/node_modules/connect');

var app = module.exports = express.createServer();

var db = [];

// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware({ src:__dirname + '/public', compress: true }));
    app.use(express.compiler({src: __dirname + '/public', enable: ['coffeescript']}));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
    var msgs = {};
    for(var i=0, item; item = db[i++];){
        msgs[item.id] = item.content;
    }
    res.render('index', {
        title: '记事本',
        msgs: msgs
    })
});
app.post('/delete', function(req, res){
    var id = req.body.id;
    for(var i=0, item; item = db[i++];){
        if(item.id === id){
            db.splice(i-1, 1);
            break;
        }
    }
    res.send(200);
});
app.post('/save', function(req,res){
    var content = req.body.content;
    var id = connect.utils.md5(new Date().getTime().toString());
    if(req.body.id){
        for(var i=0, item; item = db[i++];){
            if(item.id === req.body.id){
                db[i-1] = {id: id, content: content};
                break;
            }
        }
    }else{
        db.unshift({id: id, content: content});
    }
    res.render('save', {id: id, content: content, layout: false});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);





































