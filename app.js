require('dotenv').config();
const express=require('express');
const db=require('./config/database');

db.connect((err)=>{
    if(err){
        throw err; 
    }
    console.log("Database Connection Successfull");
});

const app=express();
app.listen(process.env.APP_PORT,()=>{
    console.log('server is running at ',process.env.APP_PORT);
});
app.use(express.static('public'));
app.use(express.json({limit:'50mb'}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
  app.get('/jokes/random', (req, res) => {
    request(
      { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });



app.post('/task1authors',(req,res)=>{
    console.log('request for Authors');
    /*let create='create table Authors(id varchar(10) primary key,Firstname varchar(30),Lastname varchar(30),phone varchar(20),numPost int(10),numLikes int(10), numComments int(10));';
    db.query(create,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('table Created..');
    });*/
    let data=req.body;
    let insert;
    for(var i=0;i<data.length;i++)
    {
        insert=`insert into authors values(${data[i].id},"${data[i].firstName}","${data[i].lastName}","${data[i].phone}",${data[i].numPosts},${data[i].numLikes},${data[i].numComments});`;
        db.query(insert,(err,result)=>{
            if(err) throw err;
            return res.status('200 ok');
        });
    }
    res.json({
        status:200,
        message:"successfully data inserted in authors"
    });
});


app.post('/task1posts',(req,res)=>{
        /*let create='create table post(id int(10) primary key,title varchar(50),Description varchar(400),authorId int(10),datePublished int(20),numLikes int(10), numComments int(10));';
    db.query(create,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('table Created..');
    });*/

    let data=req.body;
    //console.log(data);
    let insert;
    for(var i=7003;i<data.length;i++)
    {
        insert=`insert into post values(${data[i].id},"${data[i].title}","${data[i].description}","${data[i].authorId}",${data[i].datePublished},${data[i].numLikes},${data[i].numComments});`;
        db.query(insert,(err,result)=>{
            if(err) throw err;
            return res.status('200 ok');
        });
    }
    res.json({
        status:200,
        message:"successfully data inserted in posts"
    });
});


app.post('/task1comments',(req,res)=>{
    /*let create='create table comment(id int(10) primary key,text varchar(50),postId int(50),authorId int(10),datePublished bigint(20));';
    db.query(create,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.status('200 ok);
    });*/

    let data=req.body;
    let insert;
    for(var i=0;i<data.length;i++)
    {
        insert=`insert into comments values(${data[i].id},"${data[i].text}",${data[i].postId},${data[i].authorId},${data[i].datePublished});`;
        db.query(insert,(err,result)=>{
            if(err) throw err;
            console.log('data Inserted'+i);
            return res.status('200 ok');
        });
    }
    res.json({
        status:200,
        message:"successfully data inserted in comments"
    });
});


app.post('/task1likes',(req,res)=>{
    /*let create='create table likes(id int(10) primary key,postId int(50),authorId int(10),datePublished int(20));';
    db.query(create,(err,result)=>{
        if(err) throw err;
        console.log(result);
        return res.status('200 ok');
    });*/

    let data=req.body;
    let insert;
    for(var i=0;i<data.length;i++)
    {
        insert=`insert into likes values(${data[i].id},${data[i].postId},${data[i].authorId},${data[i].datePublished});`;
        db.query(insert,(err,result)=>{
            if(err) throw err;
            return res.status('200 ok');
        });
    }
    res.json({
        status:200,
        message:"successfully data inserted in likes"
    });
});


app.get('/task2userListByComments',(req,res)=>{
    let data="select id,firstName,lastName,numComments from authors order by numComments"
    //console.log(data.sortquery);
    db.query(data,(err,result)=>{
        if(err) throw err;
        console.log('Successfull');
        return res.json({
            status:200,
            message:"data fetched successfully",
            result:result
        });
    });
});


app.get('/task2userListByLikes',(req,res)=>{
    let data="select id,firstName,lastName,numLikes from authors order by numLikes"
    //console.log(data.sortquery);
    db.query(data,(err,result)=>{
        if(err) throw err;
        console.log('Successfull');
        return res.json({
            status:200,
            message:"data fetched successfully",
            result:result
        });
    });
});


app.get('/task2userListByPosts',(req,res)=>{
    let data="select id,firstName,lastName,numPost from authors order by numPost";
    //console.log(data.sortquery);
    db.query(data,(err,result)=>{
        if(err) throw err;
        console.log('Successfull');
        return res.json({
            status:200,
            message:"data fetched successfully",
            result:result
        });
    });
});


app.get('/timestamp',(req,res)=>{
    let data="select id, datePublished from likes where id<3";
    db.query(data,(err,result)=>{
        if(err) throw err;
        console.log('successfull',result);
        for(var i=0;i<result.length;i++){
            const dateobject=new Date(result[i].datePublished);
            const readdate=dateobject.toLocaleString();
            result[i].datePublished=readdate;
        }                    
        console.log(result);
        return res.json({
            status:200,
            result:result
        })
    })
})


app.get('/task3postListByComments',(req,res)=>{
    let data="select id,title,Description,authorId,numComments from post order by numComments"
    //console.log(data.sortquery);
    db.query(data,(err,result)=>{
        if(err) throw err;
        console.log('Successfull');
        return res.json({
            status:200,
            message:"data fetched successfully",
            result:result
        });
    });
});


app.get('/task3postListByLikes',(req,res)=>{
    let data="select id,title,authorId,numLikes from post order by numLikes";
    //console.log(data.sortquery);
    db.query(data,(err,result)=>{
        if(err) throw err;
        console.log('Successfull');
        return res.json({
            status:200,
            message:"data fetched successfully",
            result:result
        });
    });
});

app.get('/timevsNL',(req,res)=>{
        let data='SELECT COUNT(postId) AS Count,datePublished FROM likes GROUP BY postId ORDER BY postId;';
    db.query(data,(err,result)=>{
        if(err) throw err;
        //console.log('successfull',result);
        for(var i=0;i<result.length;i++){
            const dateobject=new Date(result[i].datePublished);
            const readdate=dateobject.toLocaleString();
            result[i].datePublished=readdate;
        }                    
        //console.log(result);
        return res.json({
            status:200,
            result:result
        })
    })
})


app.get('/timevsNC',(req,res)=>{
    let data='SELECT COUNT(postId) AS Count,datePublished FROM comments GROUP BY postId ORDER BY postId;';
db.query(data,(err,result)=>{
    if(err) throw err;
    //console.log('successfull',result);
    for(var i=0;i<result.length;i++){
        const dateobject=new Date(result[i].datePublished);
        const readdate=dateobject.toLocaleString();
        result[i].datePublished=readdate;
    }                    
    //console.log(result);
    return res.json({
        status:200,
        result:result
    })
})
})

app.get('/createdb',(req,res)=>{
    let database='create database blogpost_database;';
    db.query(database,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json({
            status:200,
            message:"database created Successfully"
        });
    });
});


