// Express
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt-as-promised');

// Express-Session
var session = require('express-session');
var sessionStore = new session.MemoryStore;
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: true,
    secret: 'secret'
}));

// Flash
var flash = require('express-flash');
app.use(flash());

// Static Folder
app.use(express.static( path.join(__dirname, 'public/dist')));

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userdb');

let UserSchema = new mongoose.Schema({
    first_name: { 
        type: String,
        required: [true, 'Please include your first name.'] 
    },
    last_name: { 
        type: String, 
        required: [true, 'Please include your last name.'] 
    },
    birthdate: { 
        type: Date, 
        required: [true, 'Please include your birthdate.'] 
    },
    email: { 
        type: String, 
        required: [true, 'Please include your email.'] 
    },
    password: { 
        type: String, 
        required: [true, 'Please include your password.'] 
    },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});
let User = mongoose.model('User', UserSchema);

// Routes
app.get('/users', (req, res) => { 
    User.find({}, function(err, users){
        return res.json(users);
    })
});

// Server Listening
app.listen(1337, () => { 
    console.log("Running at 1337")
})