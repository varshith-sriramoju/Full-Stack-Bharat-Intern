const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 27017;


mongoose.connect("mongodb://localhost:27017/mern_stack/Registration_Form"); 
{
    useNewUrlParser: true;
    useUnifiedTopology: true;
};
//Registration schema
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
//modes of registration schema
const Registration = mongoose.model('Registration', registrationSchema);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post('/register', (req, res) => {
    try{
         const {name, email, password} = req.body;
            const registration = new Registration({name, email, password});
            registration.save();
            res.redirect('/success');
    }
    catch(error){
        console.log(error);
        res.redirect('/error');

    }
})

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/success.html');
});   
app.get('/error', (req, res) => {
    res.sendFile(__dirname + '/error.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
