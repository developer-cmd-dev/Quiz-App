console.log('Quiz App')
let startButton = document.getElementById('startQuiz')
let category = document.getElementById('category')
let noOfQuestion = document.getElementById('no-of-questions')
let difficulty = document.getElementById('Difficulty')
let questionType = document.getElementById('type')
let quizType = document.getElementById('quizType')
let questionsPage = document.getElementById('questionPage')
let preloader = document.getElementById('Preloader')


function startQuiz(){
 startButton.addEventListener('click',(e)=>{

    let value = {
        category : category.value,
        noOfQuestion:noOfQuestion.value,
        difficulty:difficulty.value,
        questionType:questionType.value
    }
    e.preventDefault()
    apiData(value)
    quizType.classList.add('hidden')

    preloader.classList.remove('hidden')



 })
 

}

startQuiz()



async function apiData  (value){
    ({category,noOfQuestion,difficulty,questionType}=value)

    try {

        const api  = await fetch(`https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple`)
        const data = await api.json()      
        preloader.classList.add('hidden')
        questionsPage.classList.remove('hidden')
       displayQuestions(data.results)
       console.log("Api fetched")

       
    } catch (error) {
        console.log(error)
    }
}


// Take the  category , question, correct_answer, incorrect_answers
let questionDisp = document.getElementById('questionDisp')
let options = document.getElementsByClassName('options')
let nextBtn = document.getElementById('NextBtn')
let questionNo = document.getElementById('questionNo')
let questionArr = [];
let wrongAns = [];
let wrightAns = [];
function displayQuestions(data){

 data.map((element)=>{
 ({category,question,correct_answer,incorrect_answers}=element)
questionArr.push(question)
wrongAns.push(incorrect_answers)
wrightAns.push(correct_answer)
})

nextQuestion()
}

let indexing = 0;
let score = 0;
let wrong = 0;
let ans="";

let nextQuestion = ()=>{
    let shuffle = Math.floor(Math.random()*4)
    if(indexing == questionArr.length){
        indexing = 0;
        console.log(indexing)
    }
    questionNo.innerHTML = `<h1 class="text-3xl">${indexing}</h1>`
    wrongAns[indexing].splice(shuffle,0,wrightAns[indexing])

    Array.from(options).forEach((elem,index)=>{
        
        elem.nextElementSibling.innerText = wrongAns[indexing][index]
        elem.checked = false;  
       
        elem.addEventListener('click',()=>{
            ans = elem.nextElementSibling.innerText 
            console.log("Wright ans" + wrightAns[indexing], " And the question is ", questionArr[indexing])  
        })

        
    })
    questionDisp.innerText = questionArr[indexing]

    console.log("Length of all questions" , questionArr.length)
    
}

nextBtn.addEventListener('click',()=>{
    if (ans == wrightAns[indexing]){
        console.log(ans)
        score +=1;
        console.log("Student choosed the wright ans.",score)
    }else{
        wrong+=1;
        console.log("Student choosed the wrong ans.",wrong)
    }
    console.log("Total correct ans-"+score," total wrong answer - "+wrong)


        indexing+=1;
        console.log("Increasing indexing")


   
    nextQuestion()
})



// setInterval(() => {
//     console.log(questionArr,wrightAns,wrongAns)
// }, 1000);
console.log("Data is done")


