const cors=require('cors')
const express=require('express')
const bodyParser=require('body-parser')
const axios=require('axios')
const mysql=require('mysql')
const bcrypt = require('bcryptjs');
const { genQuestions } = require('./quiz')
const db=require('./db')

var app=express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: 'M1racle@123',
    database: 'Student_Management'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database ');
  });

app.post('/register',(request,response)=>{
    const { id, userName, password, Department } = request.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if(err)
        {
            throw err;
        }
        // console.log(hashedPassword);
        query='INSERT INTO UserDetails (id, designation, name, password, department) values(?,?,?,?,?)';
        console.log(query);
        connection.query(query,[id, 'faculty',userName, hashedPassword, Department],(err,res)=>{
            if(err)
            {
                console.log(err);
            }
            if(!res){
                console.log("User already Exists");
                response.status(401).send('User already Exists');
            }
            else
            {
                console.log("User added successfully");
                response.status(200).send('User registered successfully');
            }
        });

    });

});

app.post('/login',(request,response)=>{
    const { id, password } = request.body;
    console.log(id, password)
    query='SELECT * FROM UserDetails WHERE id=\''+id+'\'';
    console.log(query);
    connection.query(query,(err,res)=>{
        // console.log(res);
        const data=res[0];
        // console.log(data.designation);
        // console.log(res);
        if(err)
        {
            throw err;
        }
        else if(!res){
            console.log("User Not Found");
        }
        else{
            bcrypt.compare(password, data.password, (err, isMatch) => {
                if (err) throw err;
                
                if (isMatch) {
                    // console.log("Login Successfull");
                    response.status(200).send(data.designation);
                } else {
                    // console.log("Invalid Credentials");
                    response.status(401).send('Invalid credentials');
                }
              });
        }
    });
});

app.post('/sregister',(request,response) => {
    var { student_id, userName, faculty_id} = request.body;
    console.log(request.body);
    // faculty_id='20JRA0523'
    query='SELECT designation FROM UserDetails WHERE id=\''+faculty_id+'\'';
    console.log(query);
    connection.query(query,(err,res)=>{
        console.log(res);
        // console.log(res[0].designation);
        if(err){
            throw err;
        }
        if(res[0].designation != "faculty"){
            console.log("You are not allowed");
            response.status(401).send("You are not allowed");
        }
        else{
            console.log("You are allowed");
            password=student_id.substring(0,3)+'@'+ userName.substring(0,3);
            // console.log(password)
            bcrypt.hash(password, 10, (err1, hashedPassword) =>{
                if(err1) throw err1;
                else {
                    query1='INSERT INTO UserDetails (id, designation, name, password, department) values(?,?,?,?,?)';
                    connection.query(query1,[student_id, 'student',userName, hashedPassword, 'CSE'],(err2,res2)=>{
                        if(err2) throw err2;
                        if(!res2){
                            console.log("Student already Exists");
                            response.status(401).send('Student already Exists');
                        }
                        else
                        {
                            console.log("Student added successfully");
                            response.status(200).send('Student added successfully');
                        }
                    })
                }
            })
        }
    })
})

createTest = async (testDetails)=>{
    const { subject, topic, noofQuestions } = testDetails;

        try{
            const requestData = {
                "messages": [{
                  "role": "system",
                  "content": `You're a helpful assistant that talks like a pirate \n. 
                  I will give you a topic, I need your help in generating 10 MCQ questions and options,answers to that questions in the format like : place all the question numbers in the [QuestionNumbers] array and Store all Questions in json object(Questions) like Question number as key and Entire Question as value  like {key,value} pairs, next Store Question number as key and all the 4 options as values in the json object [Answers] and next Store Question number as key, correct option as value in json object(CorrectAnswers) now place QuestionNumbers array,Questions json object, Answers json object and CorrectAnswers json object in one json object named as (finalData) \n.
             Generate response whose structure/format exactly match as mentioned  below  :
             { 
             "QuestionNumbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
             
               "Questions": [
                  "What is polymorphism?",
                  "What is method overloading?",
               
               ],
             
               "options": [
                 ["a) The ability of an object to take on many forms", "b) The ability of an object to have multiple constructors", "c) The ability of an object to declare multiple methods", "d) The ability of an object to have multiple access modifiers"],
                 ["a) Defining multiple methods with the same name in a class", "b) Defining multiple methods with the same name and same arguments in a class", "c) Defining multiple methods with the same name and different arguments in a class", "d) Defining multiple methods with the same name and same return type in a class"]
               ],
             
               "CorrectAnswer": [
                 "a) The ability of an object to take on many forms",
                 "c) Defining multiple methods with the same name and different arguments in a class"
               ]
             } \n.  
             Note : Strictly do not add any extra content except the requested JSON output. Response should be in JSON format.`
                 },
                 {
                  "role": "user",
                  "content": `Can you give me ${noofQuestions} multiple choice questions on the topic : ${topic} in ${subject}`
                 }]
               }
            const testData = await gatherData(requestData);
            // console.log(testData);
            return testData;
        }
        catch(error){
            console.log(error);
            return ({ error: 'Failed to generate questions' });
        }
}

async function gatherData(requestData){
    return await genQuestions(requestData);
}

//to create test Questions
app.post('/addTest', (request,response)=>{
    const { fact, testName, subject, topic, questions } = request.body;
    console.log(fact, testName, subject, topic, questions)
    global.facId=fact;
    global.teName=testName;
    finalData={}
    global.n=questions;
    
    query = "SELECT * FROM UserDetails WHERE id=\'"+fact+'\'';
    connection.query(query,async (err,res1)=>{
        if(err) throw err;
        if(!res1){
            console.log("Invalid faculty id");
            response.status(200).send("Invalid faculty id");
        }
        global.testQuestions = await createTest({testName, subject, topic, questions});
        console.log("testQuestions:",testQuestions);
        const pattern = /\{[^{}]*\}/;
        for(i=0;i<questions;i++){
            let response1 = testQuestions.match(pattern)[0];
            finalData['response']=JSON.parse(response1);
        }
        console.log("finalData:",finalData)
        if(finalData.response.Questions == null)
        {
            response.status(200).send("Please try again");
        }
        else
        {
            console.log("Questions",finalData.response.Questions);
            global.finalTestData=finalData;
            response.status(200).send(finalTestData);
        }
    })
})

//for student
app.post('/sendTest',(req,res)=>{
    console.log("Hello")
    const testID=req.body;
    console.log(testID.test);
    sql="SELECT QuestionName FROM QuestionDetails WHERE TestID=\'"+testID.test+'\'';
    console.log(sql);
    connection.query(sql,(err,data)=>{
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
})

//storing test questions to db
app.post('/sendQuestions',(req,res)=>{
    const {testquestions}=req.body;
    // console.log("facultyId:",facId);
    // console.log("Test name:",teName);
    // console.log("Test Questions",testquestions);
    Questions=testquestions.response.Questions;
    Answers=[]
    testId=0
    if(testquestions.response.length!=0)
    {
        Answers=testquestions.response.CorrectAnswer;
    }
    else
    {
        Answers=testquestions.response.CorrectAnswers;
    }
    // console.log("Questions:",Questions);
    // console.log("Answers",Answers);
    sql="INSERT INTO TestDetails(ID,TestName,Status) values(?,?,?)";
    connection.query(sql,[facId,teName,1],(err,data)=>{
        if(err) throw err;
        if(data) {
            console.log("Test created");
            sql1="SELECT TestID from TestDetails where TestName=\'"+teName+'\'';
            connection.query(sql1,(err,data1)=>{
                if(err) throw err;
                // console.log(data[0])
                testId=data1[0].TestID;
                console.log(testId);
                sql1="INSERT INTO QuestionDetails(TestID,Questions,Answers) values(?,?,?)";
                connection.query(sql1,[testId,JSON.stringify(Questions),JSON.stringify(Answers)],(err,data2)=>{
                    if(err) throw err;
                    console.log("Data Stored");
                })
            })
        }
    })
    res.status(200).send("Data stored");
})

app.post('/validate',(req,res)=>{
    const {testId,StudentId,qa,an}= req.body
    score=0;
    sql="SELECT * FROM QuestionDetails WHERE TestID=\'"+testId+'\'';
    connection.query(sql,(err,data)=>{
        if(err) throwerr;
        for(i=0;i<data.length;i++){
            console.log("question"+data[i].QuestionName);
            console.log("answer"+data[i].Answer);
            for(j=0;j<qa.length;j++)
            {
                if(qa[j]==data[i].QuestionName && an[j] == data[i].Answer){
                    score=score+1;
                }
            }
        }
        sql1="INSERT INTO Reports(studentID,TestID,score) values(?,?,?)"
        connection.query(sql1,[StudentId,testId,score],(err,data1)=>{
            if(err) throw err;
            console.log(score);
            console.log(data1);
            res.send("successfully inserted");
        })
    })
})

//gives tests for students
app.get('/tests',(req,res)=>{

    db.getTests()
    .then((tests)=>{
        res.send(tests)
    })
    
    .catch((err)=>{
        res.send(err)
    })
})

//gives questions of particular tests
app.post('/testQuestions',(req,res)=>{

    db.getTestsQuestions(req.body.id)
    .then((tests)=>{
        res.send(tests)
    })
    
    .catch((err)=>{
        res.send(err)
    })
})

//tests created by faculty
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
    db.getStudentReports(req.body.studentID)
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
        if(finalData.length==0){
            res.json("No tests attempted");
        }
        res.send(finalData);
    })  
    .catch((err)=>{
        res.send(err)
    })
})

app.get('/getQuote',async (req,res)=>{
    try {
        const response = await axios.get('https://zenquotes.io/api/quotes/abb763c45d0ef3a57ad53db5bf70ffdb');
        const quote = response.data[0]; 
        console.log('Quote:');
        console.log(quote);
        res.status(200).send(quote);
    } catch (error) {
        console.error('Error fetching Ron Swanson quote:', error.message);
    }
})

app.get('/getJoke',async (req,res)=>{
    try {
        // https://official-joke-api.appspot.com/jokes/programming/ten
        const response = await axios.get('https://official-joke-api.appspot.com/jokes/programming/random');
        console.log(response.data);
        res.status(200).send(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
})

app.listen(3006,()=>{
    console.log("Server started running on http://localhost:3006");
});
