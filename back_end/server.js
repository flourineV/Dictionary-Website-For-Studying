const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const options = {
    method: 'GET',
    url: 'https://urban-dictionary7.p.rapidapi.com/v0/define',
    params: {term: 'hello'},
    headers: {
        'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    }
};

axios.request(options)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });