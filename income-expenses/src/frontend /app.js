
// Adding User inputs 
async function Push(){
    const title = document.getElementById("title").value
    const amount = Number(document.getElementById("amount").value)
    const type = document.getElementById("type").value
    const date = document.getElementById("date").value

    try {
        const response = await fetch('http://localhost:8000/api/push', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, amount, type, date })
        })

        const result = await response.json()
        
        if (result.success) {
            // Clear the form inputs
            document.getElementById("title").value = ""
            document.getElementById("amount").value = ""
            document.getElementById("type").value = ""
            document.getElementById("date").value = ""
            
            // Refresh the display
            expense()
        } else {
            console.error('Error adding entry:', result.message)
            alert('Failed to add entry. Please try again.')
        }
    } catch (error) {
        console.error('Network error:', error)
        alert('Network error. Please check if the server is running.')
    }
}

//Showing User Inputs
async function expense(){
    const display = document.getElementById("output")
    display.innerHTML = ""
    
    try {
        const response = await fetch('http://localhost:8000/api/expense')
        const data = await response.json()
        
        if (Array.isArray(data)) {
            for(let i = 0; i < data.length; i++){
                display.innerHTML += `<li>${data[i].title} - ${data[i].amount} - ${data[i].type} - ${data[i].date}<button onClick="deleteItem(${data[i].id})">Delete</button></li>`
            }
        } else {
            console.error('Error fetching data:', data.message)
        }
    } catch (error) {
        console.error('Network error:', error)
        display.innerHTML = "<li>Error loading data. Please check if the server is running.</li>"
    }
}

// Deleting User Inputs
async function deleteItem(id){
    try {
        const response = await fetch(`http://localhost:8000/api/expense/${id}`, {
            method: 'DELETE'
        })
        
        const result = await response.json()
        
        if (result.success) {
            // Refresh the display after successful deletion
            expense()
        } else {
            console.error('Error deleting entry:', result.message)
            alert('Failed to delete entry. Please try again.')
        }
    } catch (error) {
        console.error('Network error:', error)
        alert('Network error. Please check if the server is running.')
    }
}


