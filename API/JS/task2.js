const db = require('../../config/database');
const fetch = require('node-fetch');
const { response } = require('express');

userListByComments();
userListByLikes();
userListByPosts();

function userListByComments()
{
    var data={ sortquery:"select id,firstName,lastName,numComments from authors order by numComments"};
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/task2userListByComments',options)
    .then(response => response.json())
    .then((data)=> {
        //console.log(data);
        var result=data.result;
        console.log(result.length,' data fetched');
        for(i=0;i<result.length;i++)
        {
            console.log(result[i].id,'\t',result[i].firstName,'\t\t',result[i].lastName,'\t',result[i].numComments);
        }   
    })
    .catch((error) => {
        console.log(error);
    });
}

function userListByLikes()
{
     var data={ sortquery:"select id,firstName,lastName,numLikes from authors order by numLikes"};
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/task2userListByLikes',options)
    .then(response => response.json())
    .then((data)=> {
        //console.log(data);
        var result=data.result;
        console.log(result.length,' data fetched');
        for(i=0;i<result.length;i++)
        {
            console.log(result[i].id,'\t',result[i].firstName,'\t\t',result[i].lastName,'\t',result[i].numLikes);
        }   
    })
    .catch((error) => {
        console.log(error);
    });
}

function userListByPosts()
{
     var data={ sortquery:"select id,firstName,lastName,numPost from authors order by numPost"};
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/task2userListByPosts',options)
    .then(response => response.json())
    .then((data)=> {
        //console.log(data);
        var result=data.result;
        console.log(result.length,' data fetched');
        for(i=0;i<result.length;i++)
        {
            console.log(result[i].id,'\t',result[i].firstName,'\t\t',result[i].lastName,'\t',result[i].numPost);
        }   
    })
    .catch((error) => {
        console.log(error);
    });
}