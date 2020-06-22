const express = require('express');
const fetch = require('node-fetch');
const { response } = require('express');

//postListByComments();
postListByLikes();

function postListByComments()
{
    var data={ sortquery:"select id,title,Description,authorId,numComments from post order by numComments"};
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/task3postListByComments',options)
    .then(response => response.json())
    .then((data)=> {
        //console.log(data);
        var result=data.result;
        for(i=0;i<result.length;i++)
        {
            console.log(result[i].id,'\t',result[i].title,'\t',result[i].Description,'\t',result[i].authorId,'\t',result[i].numComments);
        }
        console.log(result.length,' data fetched');   
    })
    .catch((error) => {
        console.log(error);
    });
}


function postListByLikes()
{
    var data={ sortquery:"select id,title,authorId,numLikes from post order by numLikes"};
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/task3postListByLikes',options)
    .then(response => response.json())
    .then((data)=> {
        //console.log(data);
        var result=data.result;
        for(i=0;i<result.length;i++)
        {
            console.log(result[i].id,'\t',result[i].title,'\t',result[i].authorId,'\t',result[i].numLikes);
        }
        console.log(result.length,' data fetched');   
    })
    .catch((error) => {
        console.log(error);
    });
}