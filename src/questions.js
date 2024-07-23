// const questionString = `
// 1. What is the output of the following code snippet?

// int x = 5;
// int y = ++x + x++ - --x;
// System.out.println(y); 

// a) 9
// b) 10
// c) 11
// d) 12

// Answer: d) 12

// 2. What is the data type size of a char variable?

// a) 4 bytes
// b) 8 bytes
// c) 2 bytes
// d) 1 byte

// Answer: c) 2 bytes

// 3. What is the difference between a static variable and an instance variable?

// a) Static variables are declared inside a method while instance variables are declared at the class level
// b) Static variables are shared among all instances of a class while instance variables have separate values for each instance
// c) Static variables are declared using the final keyword while instance variables are not
// d) Static variables are accessed using the dot operator while instance variables are accessed using the colon operator

// Answer: b) Static variables are shared among all instances of a class while instance variables have separate values for each instance

// 4. What is the default value of an instance variable that is not initialized?

// a) 0
// b) null
// c) NaN
// d) undefined

// Answer: b) null

// 5. What is the output of the following code snippet?

// int x = 10;
// int y = 20;
// int z = (x > y) ? x++ : y--;
// System.out.println(z);

// a) 10
// b) 20
// c) 21
// d) 19

// Answer: d) 19

// 6. Which access modifier can be used for a class variable to restrict its visibility to only its own class and its inner classes?

// a) Public
// b) Private
// c) Protected
// d) Default (Package-private)

// Answer: b) Private

// 7. Which of the following data types cannot be used as an index for an array in Java?

// a) int
// b) byte
// c) float
// d) char

// Answer: c) float

// 8. What is the value of x after the following code snippet is executed?

// int x = 5;
// x += x++ + ++x;

// a) 16
// b) 17
// c) 18
// d) 19

// Answer: d) 19

// 9. Which keyword is used to declare a final variable in Java?

// a) const
// b) final
// c) static final
// d) readonly

// Answer: b) final

// 10. What is the output of the following code snippet?

// String s = "hello";
// s.toUpperCase();
// System.out.println(s);

// a) hello
// b) HELLO
// c) null
// d) Compilation error

// Answer: a) hello (The toUpperCase method does not modify the original string, it returns a new string with all characters in uppercase)
// `;


const questionString=`Q1. Which of the following concepts in Java doesn't support inheritance?
a) Class
b) Interface
c) Method
d) Variable
Answer: c) Method

Q2. What is the use of 'abstract' keyword in Java?
a) To prevent multiple instances of a class.
b) To define a method without a body.
c) To instantiate an object of a class.
d) To mark a class as final.
Answer: b) To define a method without a body.

Q3. Which of the following is not a type of polymorphism in Java?
a) Compile time polymorphism
b) Inheritance polymorphism
c) Runtime polymorphism
d) Casting polymorphism
Answer: d) Casting polymorphism

Q4. What is an inner class in Java?
a) A class that is declared within another class.
b) A class that is declared within the same package as another class.
c) A class that is declared outside of any other class.
d) A class that is declared within a subclass.
Answer: a) A class that is declared within another class.

Q5. Can a static method be overridden in Java?
a) Yes
b) No
Answer: b) No

Q6. What is an abstract class in Java?
a) A class with abstract methods that must be implemented by any subclass.
b) A class that cannot be extended.
c) A class that is marked final.
d) A class with no methods and only variables.
Answer: a) A class with abstract methods that must be implemented by any subclass.

Q7. What is the difference between method overloading and method overriding in Java?
a) Overloading is used for a parent class method, and overriding is used for a child class method.
b) Overloading is used when methods have different names, and overriding is used when methods have the same name.
c) Overloading is when a method has multiple implementations, and overriding is when a method has a single implementation in a parent class and a different implementation in a child class.
d) Overloading is when a method has a single implementation in a parent class and a different implementation in a child class, and overriding is when a method has multiple implementations.
Answer: b) Overloading is used when methods have different names, and overriding is used when methods have the same name.

Q8. What is encapsulation in Java?
a) The ability of an object to take on many forms.
b) The process of hiding implementation details from users of a class.
c) The ability of a class to inherit from multiple parent classes.
d) The process of modifying a class to fit specific requirements.
Answer: b) The process of hiding implementation details from users of a class.

Q9. What is the difference between an instance variable and a class variable?
a) Instance variables are declared inside a method, and class variables are declared outside of a method.
b) Instance variables are declared inside a class, and class variables are declared outside of a class.
c) Instance variables are specific to an object, and class variables are shared among all instances of a class.
d) Instance variables are static, and class variables are not.
Answer: c) Instance variables are specific to an object, and class variables are shared among all instances of a class.

Q10. What is the purpose of the 'final' keyword in Java?
a) To prevent inheritance of a class.
b) To prevent modification of a variable, method, or class.
c) To mark a class as abstract.
d) To specify a method as the 'final' implementation that cannot be overridden.
Answer: b) To prevent modification of a variable, method, or class.`;

let answers=[];
let options=[];
let questions1=[];
// function parseQuestions(questionString) {
//     const questions = [];
//     const lines = questionString.trim().split('\n');
//     let currentQuestion = {};
  
//     lines.forEach(line => {
//       line = line.trim();
  
//       // Check if line starts with a number followed by a dot, indicating a new question
//       if (/^\d+\. /.test(line)) {
//         if (Object.keys(currentQuestion).length > 0) {
//           questions.push(currentQuestion);
//           console.log(questions);
//           currentQuestion = {};
//         }
  
//         // Extract question number and text
//         const [questionNumber, questionText] = line.split('.').map(part => part.trim());
//         // console.log(questionText);
//         questions1.push(questionText);
//         currentQuestion.questionNumber = questionNumber.trim();
//         currentQuestion.questionText = questionText.trim();
//     }else if(/^[a-e]\)/.test(line)){
//         currentQuestion.options = currentQuestion.options || [];
//         // console.log(currentQuestion.options);
//       currentQuestion.options.push(line.trim());
//       } else if (/^Answer:/i.test(line)) {
//         // Extract answer
//         const [answerLabel, answerText] = line.split(': ');
//         // console.log(answerText);
//         answers.push(answerText);
//         currentQuestion.correctAnswer = answerText;
//         // console.log(currentQuestion);
//       }
//     });
  
//     // Push the last question into questions array
//     if (Object.keys(currentQuestion).length > 0) {
//       questions.push(currentQuestion);
//     }
//     const testData={
//       Questions:questions.map(question => question.questionText),
//       Options:questions.map(question => Object.values(question.options)),
//       Answers:questions.map(question => question.correctAnswer)
//     }
//     // console.log(testData);
//     return questions;
//   }

// // Parse questions from the question string
// const parsedQuestions = parseQuestions(questionString);

// // Separate arrays for question names, options, and answers
// const questionNames = parsedQuestions.map(question => question.questionText);
// const questionOptions = parsedQuestions.map(question => Object.values(question.options));
// const questionAnswers = parsedQuestions.map(question => question.correctAnswer);

// // console.log(answers);
// console.log(questions1);

// console.log("Question Names:", questionNames);
// console.log("Question Options:", questionOptions);
// console.log("Question Answers:", questionAnswers);

function parseQuestions(questionString) {
    const questions = [];
    const lines = questionString.trim().split('\n');
    let currentQuestion = {};
  
    lines.forEach(line => {
      line = line.trim();
  
      // Check if line starts with a number followed by a dot, indicating a new question
      if (/^\d+\./.test(line)) {
        if (Object.keys(currentQuestion).length > 0) {
          questions.push(currentQuestion);
          currentQuestion = {};
        }
  
        // Extract question number and text
        const [questionNumber, questionText] = line.split('.').map(part => part.trim());
        console.log(questionText);
        
        currentQuestion.questionNumber = questionNumber.trim();
        currentQuestion.questionText = questionText.trim();
    }else if(/^[a-e]\)/i.test(line)){
        currentQuestion.options = currentQuestion.options || [];
      currentQuestion.options.push(line.trim());
      } else if (/^Answer:/i.test(line)) {
        // Extract answer
        const [answerLabel, answerText] = line.split(': ');
        // console.log(answerText);
        currentQuestion.correctAnswer = answerText;
      }
    });
  
    // Push the last question into questions array
    if (Object.keys(currentQuestion).length > 0) {
      questions.push(currentQuestion);
    }
    const testData={
      Questions:questions.map(question => question.questionNumber),
      Options:questions.map(question => Object.values(question.options)),
      Answers:questions.map(question => question.correctAnswer)
    }
    // console.log(testData);
    return questions;
  }

// Parse questions from the question string
const parsedQuestions = parseQuestions(questionString);

// Separate arrays for question names, options, and answers
const questionNames = parsedQuestions.map(question => question.questionNumber);
const questionOptions = parsedQuestions.map(question => (question.options));
const questionAnswers = parsedQuestions.map(question => question.correctAnswer);

console.log("Question Names:", questionNames);
console.log("Question Options:", questionOptions);
console.log("Question Answers:", questionAnswers);


// // Function to parse the question string
// module.exports.parseQuestions=(questionString) => {
//     const questions = [];
//     const lines = questionString.trim().split('\n');
//     let currentQuestion = {};
  
//     lines.forEach(line => {
//       line = line.trim();
  
//       // Check if line starts with a number followed by a dot, indicating a new question
//       if (/^\d+\./.test(line)) {
//         if (Object.keys(currentQuestion).length > 0) {
//           questions.push(currentQuestion);
//           currentQuestion = {};
//         }
  
//         // Extract question number and text
//         const [questionNumber, questionText] = line.split('.').slice(1).join('.').split('?');
//         currentQuestion.questionNumber = questionNumber.trim();
//         currentQuestion.questionText = questionText.trim();
//       } else if (/^a\.|^b\.|^c\.|^d\.|^e\./.test(line)) {
//         // Extract options
//         const [optionLabel, optionText] = line.split('. ');
//         const optionKey = optionLabel.trim().toLowerCase();
//         currentQuestion.options = currentQuestion.options || {};
//         currentQuestion.options[optionKey] = optionText.trim();
//       } else if (/^Answer:/.test(line)) {
//         // Extract answer
//         const [answerLabel, answerText] = line.split(': ');
//         currentQuestion.correctAnswer = answerText.trim().split('. ')[1];
//       }
//     });
  
//     // Push the last question into questions array
//     if (Object.keys(currentQuestion).length > 0) {
//       questions.push(currentQuestion);
//     }
//     const testData={
//       Questions:questions.map(question => question.questionNumber),
//       Options:questions.map(question => question.options),
//       Answers:questions.map(question => question.correctAnswer)
//     }
//   //   console.log(testData);
//     return testData;
//   }


// module.exports.parseQuestions=(questionString) => {
//     const questions = [];
//     const lines = questionString.trim().split('\n');
//     let currentQuestion = {};
  
//     lines.forEach(line => {
//       line = line.trim();
  
//       // Check if line starts with a number followed by a dot, indicating a new question
//       if (/^\d+\./.test(line)) {
//         if (Object.keys(currentQuestion).length > 0) {
//           questions.push(currentQuestion);
//           currentQuestion = {};
//         }
  
//         // Extract question number and text
//         const [questionNumber, questionText] = line.split('.').map(part => part.trim());
//         console.log(questionText);
        
//         currentQuestion.questionNumber = questionNumber.trim();
//         currentQuestion.questionText = questionText.trim();
//     }else if(/^[a-e]\)/i.test(line)){
//         currentQuestion.options = currentQuestion.options || [];
//       currentQuestion.options.push(line.trim());
//       } else if (/^Answer:/i.test(line)) {
//         // Extract answer
//         const [answerLabel, answerText] = line.split(': ');
//         // console.log(answerText);
//         currentQuestion.correctAnswer = answerText;
//       }
//     });
  
//     // Push the last question into questions array
//     if (Object.keys(currentQuestion).length > 0) {
//       questions.push(currentQuestion);
//     }
//     const testData={
//       Questions:questions.map(question => question.questionText),
//       Options:questions.map(question => Object.values(question.options)),
//       Answers:questions.map(question => question.correctAnswer)
//     }
//     console.log(testData);
//     return testData;
//   }