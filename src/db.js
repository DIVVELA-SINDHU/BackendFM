const sql=require('mysql') //imported mysql2 package
const con=sql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'M1racle@123',
        database:'Student_Management'
    }
)

//code to retrive data from table

function getTests(){
    
    return new Promise(function(success,reject){
        
        {
            con.query('select distinct TestID from TestDetails',function(err,rows,col){
            //err=errors 
            if(err){
                reject(500);
            }
            else{
                success(rows);
            }
            })
        
        }

    })
}

//inserting test details

function addTestDetails(ID,TestName){
    return new Promise(function(success,reject){
        console.log(ID,TestName) 
        sql1="INSERT INTO TestDetails(ID,TestName,Status) VALUES(?,?,?)"
        console.log(sql1);
        con.query(sql1,[ID,TestName,0],function(err,rows){
            if(err){
                console.log(err);
                reject(500);
            }
            else{
                console.log(rows);
                success(rows);
                
            }
    
        }) 
    })
}



//getTestQuestions

function getTestsQuestions(id){
    
    return new Promise(function(success,reject){
        
        {
            con.query('select QuestionID,QuestionName from QuestionDetails where TestID=?',[id],function(err,rows,col){
            //err=errors 
            if(err){
                reject(500);
            }
            else{
                success(rows);
            }
            })
        
        }

    })
}

//retriving test creation details from TestDetails table
//faculty id
function getTestDetails(id){

    return new Promise(function(success,reject){

        if(id)
        {
            con.query('select TestID,TestName,CreatedTime,Status from TestDetails where id=?',[id],function(err,rows,col){
            //err=errors  
            if(err){
                reject(500);
            }
            else{
                success(rows);
                
            }
            
            })
        }

})
}

//Retriving studnetID,score from Reports table for faculty
function getStudentReports(id){

    return new Promise(function(success,reject){

        if(id)
        {
            console.log(id);
            sql1='SELECT * FROM Reports WHERE studentID=\''+id+'\'';
            console.log(sql1);
            con.query(sql1,function(err,rows,col){
            //err=errors  
            console.log(rows);
            if(err){
                reject(500);
            }
            else{
                success(rows);
            }
            })
        }

})
}


//retrieving student test details for student
//testdetails,reports
function getTestReports(fid){

    return new Promise(function(success,reject){

        if(fid)
        {
            // console.log(fid);
            // console.log("Hello")
            sql1='SELECT TestID from TestDetails where ID=\''+fid+'\'';
            sql2='SELECT TestID from TestDetails as TD where ID=\''+fid+'\' join select studentID from Reports as RP where TD.TestID=RP.TestID'
            // console.log(sql1);
            con.query(sql1,function(err,rows){
            // console.log(rows);
            if(err){
                reject(500);
            }
            else{
                success(rows);
            }
            })

            con.query(sql2,)
        }
})
}

module.exports ={ //we should export files to use in another js file
    getTests,getTestDetails,getStudentReports,getTestReports,getTestsQuestions,addTestDetails
}