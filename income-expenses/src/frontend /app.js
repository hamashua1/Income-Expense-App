
// Adding User inputs 
function Push(){
const title = document.getElementById("title").value
const amount = Number(document.getElementById("amount").value)
const type = document.getElementById("type").value
const date = document.getElementById("date").value
const display = document.getElementById("output")

const money = JSON.parse(localStorage.getItem('money')) || []
display.innerHTML = ""
money.push({title, amount, type, date})
localStorage.setItem('money', JSON.stringify(money))
document.getElementById("title").value = ""
document.getElementById("amount").value = ""
document.getElementById("type").value = ""
document.getElementById("date").value = ""
}



//Showing User Inputs
function expense(){
const money = JSON.parse(localStorage.getItem('money')) || []
const display = document.getElementById("output")
display.innerHTML = ""
for(let i=0; i<money.length; i++){
    display.innerHTML += `<li>${money[i].title} - ${money[i].amount} - ${money[i].type} - ${money[i].date}<button onClick="deleteItem(${i})">Delete</button></li>`
}

}

// Deleting User Inputs
function deleteItem(i){
const money = JSON.parse(localStorage.getItem('money')) || []
money.splice(i, 1)
localStorage.setItem('money', JSON.stringify(money))
expense()
}


