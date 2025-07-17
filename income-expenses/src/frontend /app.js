
// Adding User inputs 
function add(){
const title = document.getElementById("title").value
const amount = Number(document.getElementById("amount").value)
const type = document.getElementById("type").value
const date = document.getElementById("date").value
const display = document.getElementById("output")

const money = JSON.parse(localStorage.getItem('money')) || []
display.innerHtml = ""
money.push({title, amount, type, date})
localStorage.setItem('money', JSON.stringify(money))
document.getElementById("title").value = ""
document.getElementById("amount").value = ""
document.getElementById("type").value = ""
document.getElementById("date").value = ""
}



//Showing User Inputs
function expense(){



}



