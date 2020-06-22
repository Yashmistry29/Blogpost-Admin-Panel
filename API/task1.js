const express=require('express');
const db = require('../config/database');
const fetch= require('node-fetch');

const authors=require('../json/authors.json');
const posts=require('../json/posts.json');
const likes=require('../json/likes.json');
const comments=require('../json/comments.json');

//author();
post();
//like();
//comment();

function author() {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(authors)
    };
    fetch('http://localhost:3000/task1authors/', options)
        .then(response => response.json())
        .then(data => console.log(data, 'success'))
        .catch((error) => {
            console.log(error);
        });
}

function post() {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(posts)
    };
    fetch('http://localhost:3000/task1posts/', options)
        .then(response => response.json())
        .then(data => console.log(data, 'success'))
        .catch((error) => {
            console.log(error);
        });
}

function like() {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(likes)
    };
    fetch('http://localhost:3000/task1likes/', options)
        .then(response => response.json())
        .then(data => console.log(data, 'success'))
        .catch((error) => {
            console.log(error);
        });
}

function comment() {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(comments)
    };
    fetch('http://localhost:3000/task1comments/', options)
        .then(response => response.json())
        .then(data => console.log(data, 'success'))
        .catch((error) => {
            console.log(error);
        });
}
