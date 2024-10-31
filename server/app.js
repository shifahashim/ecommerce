const express =require("express");
const path = require('path');
const app =express();
const bodyParse = require("body-parser");
const cors = require ('cors');
const morgan = require('morgan');
const corsOptions=require('./config/corsConfig.js')
const apiRouter=require('./routes/api/api.js');
require('dotenv').config();

app.use(morgan('short'));
app.use(cors(corsOptions));
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
app.use(express.static(path.join(__dirname, '../adm')));
app.use('/api',apiRouter);

 app.listen(process.env.PORT,()=>{
        console.log(`server is running http://localhost:${process.env.PORT}`)
    });


