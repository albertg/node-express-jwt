var mongoose = require('mongoose');
const Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var config = require('./config');

var Database = function(){
    //to handle private variables and methods
    var that = this;    
    var db = null;
    this.models = {};

    var initMongoDb = function(){
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database); 
    };

    var initSQlDb = function(){
        db = new Sequelize(config.productdb.database, config.productdb.username, 
            config.productdb.password, {host: config.productdb.host, dialect: config.productdb.dialect});
        db.authenticate().then(() => {    
        }).catch(err => {
            console.log("Error connecting to productdb: "+ err);
        });
    };

    this.initModels = function(){
        return new Promise((resolve, reject) => {
            if(db){
                var modelsPath = path.join(__dirname, '/src/models');
                fs.readdir(modelsPath, (err, files) => {
                    if(files && files.length > 0){
                        files.filter((file) => {
                            return (file.indexOf('.') !== 0 && file !== 'index.js')
                        }).forEach(file => {
                            if(file !== 'crmModel.js'){
                                var model = db.import(path.join(modelsPath, file));
                                that.models[model.name] = model;
                            }
                        });
                        db.sync({force: false});
                        resolve();
                    }
                });
            }else{
                reject({message: "Error initializing models"});
            }
        });        
    }
    initMongoDb();
    initSQlDb();
}

module.exports = Database;