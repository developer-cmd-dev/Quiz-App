console.log('Quiz App')
let startButton = document.getElementById('startQuiz')
let category = document.getElementById('category')
let noOfQuestion = document.getElementById('no-of-questions')
let difficulty = document.getElementById('Difficulty')
let questionType = document.getElementById('type')
startQuiz()
function startQuiz(){
startButton.addEventListener('click',()=>{
    let value = {
        category : category.value,
        noOfQuestion:noOfQuestion.value,
        difficulty:difficulty.value,
        questionType:questionType.value
    }
    apiData(value)
})
}

async function apiData  (value){
    ({category,noOfQuestion,difficulty,questionType}=value)

    try {
        const api  = await fetch(`https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple`)
        const data = await api.json()      
       displayQuestions(data.results)
       console.log("Api fetched")

       
    } catch (error) {
        console.log(error)
    }
}


function displayQuestions(data){

console.log(data)


}

console.log("Data is done")


