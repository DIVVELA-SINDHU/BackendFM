const db=require('./db')



app.get('/tests',(req,res)=>{

    db.getTests()
    .then((tests)=>{
        res.send(tests)
    })
    
    .catch((err)=>{
        res.send(err)
    })
})

//to display questions
app.post('/testQuestions',(req,res)=>{

    db.getTestsQuestions(req.body.id)
    .then((tests)=>{
        res.send(tests)
    })
    
    .catch((err)=>{
        res.send(err)
    })
})

//to insert tests
app.post('/test_details',(req,res)=>{

    db.getTestDetails(req.body.id)
    .then((details)=>{
        res.send(details)
    })  
    
    .catch((err)=>{
        res.send(err)
    })
})

//student validation

// for student isualization purpose
app.post('/sreports',(req,res)=>{
    var result='';
    var finalData=[];
    db.getStudentReports(req.body.id)
    .then((details)=>{
        for(i=0;i<details.length;i++){
            result=(details[i].score < 4 ? 'fail' : 'pass')
            var dummy={
                testId:details[i].TestID,
                score:details[i].score,
                result:result
            }
            finalData.push(dummy);
        }
        res.send(finalData);
    })  
    .catch((err)=>{
        res.send(err)
    })
})

//faculty purpose
app.post('/freports',(req,res)=>{
    db.getTestReports(req.body.fid)
    .then((details)=>{
        res.send(details);
    })  
    .catch((err)=>{
        res.send(err)
    })
})

//inserting test details
app.post('/addTest',(req,res)=>{
    console.log(req.body.ID,req.body.TestName)
    db.addTestDetails(req.body.ID,req.body.TestName)
    .then((rows)=>{
        res.send("data inserted successfully")
    }) 

    .catch((err)=>{
        res.sendStatus(err)
    })

})