const axios = require('axios');

// Define the API endpoint URL
const apiUrl = 'https://miracleopenai.openai.azure.com/openai/deployments/testModel/chat/completions?api-version=2024-02-15-preview';

// Example request data (adjust as per your API's requirements)
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
      "content": "Can you give me 10 multiple choice questions on the topic : Strings in java"
     }]
   }

// Example function to make API request
// const makeApiRequest = async (requestData) => {
//   try {
//     const response = await axios.post(apiUrl, requestData, {
//       headers: {
//         'api-key': '4bf3f2c7588a47fa89b6fdce9fe373dd ',
//       }
//     });
//     // console.log(response.data.choices[0].message.content);
//     return response.data.choices[0].message.content;

//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//   }
// };

// Call the function to make the API request
// console.log(makeApiRequest(requestData))
// makeApiRequest(requestData)



module.exports.genQuestions = async function makeApiRequest (requestData) {
    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          'api-key': '4bf3f2c7588a47fa89b6fdce9fe373dd ',
        }
      });
    //   console.log(response.data.choices[0].message.content);
    // return response;
      return response.data.choices[0].message.content;
  
    } catch (error) {
    //   console.error('Error fetching data:', error.message);
      return 'Error fetching data:', error.message;
    }
  };


