// Get the added task button element
const addBtn = document.querySelector("#add-task-button");
// Get the input element
const addTask = document.querySelector("#input-task");
// Get the ul element
const allList = document.querySelector("#task-list");

// Retrieve and display the existing data from local storage
getData()
// Event handler adding task
addBtn.addEventListener("click", newTask);
//event handler adding task by pressing "Enter"
addTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        newTask()
    }
})

function newTask() {
    // Checking the input value
    if (addTask.value === "") {
        alert("Please input your task!");
    } else {
        // Calling creating new list function
        newList()
        // Emptying input field
        addTask.value = "";
        // Storing data
        postData()
    }
}

// Function creating a new list
function newList() {
    // Create a new li element
    let newList = document.createElement("li");
    newList.classList.add("list");

    // Create a new input element
    let newInput = document.createElement("input");
    newInput.type = "checkbox";
    newInput.classList.add("input-box");
    // Add event listener to checkbox
    newInput.addEventListener("change", checkTask);

    // Create a new span element
    let newSpan = document.createElement("span");
    newSpan.classList.add("task");
    newSpan.innerHTML = addTask.value;

    // Create a new button element
    let newBtn = document.createElement("button");
    newBtn.classList.add("delete-btn");
    newBtn.innerHTML = "<b>x</b>";
    // add event listener to a new task
    newBtn.addEventListener("click", removeParent);

    // Append the input to the li element
    newList.appendChild(newInput);

    // Append the span to the li element
    newList.appendChild(newSpan);

    // Append the button to the li element
    newList.appendChild(newBtn);

    // Append the li to the ul element
    allList.appendChild(newList);
}

// Function to remove parent element
function removeParent() {
    // Using 'this' will select the element that triggers the event
    this.parentNode.remove();
    postData()
}

// Function to add or remove slashText class.
function checkTask() {
    // checkbox status in boolean
    if (this.checked) {
        this.classList.add("slashText");
        postData()
    } else {
        this.classList.remove("slashText");
        postData()
    }
}

// Function to store in the local storage.
function postData() {
    // Get the li element
    const liList = allList.querySelectorAll(".list")
    // Create a new array
    let newList = [];

    // Loop node list
    liList.forEach(item => {
        // Get the span element
        const span = item.querySelector("span")
        // Retrieve the text content
        let spanText = span.textContent
        // Get the input checkbox element
        const checkBox = item.querySelector("input")
        // Retrieve the checkbox status
        let boxStatus = checkBox.checked
        // Create a new object
        let newObject = {box: boxStatus, task: spanText}
        // Push the object into an array for each loop
        newList.push(newObject)
    })
    // Store the data into local storage
    localStorage.setItem("tasks", JSON.stringify(newList))
}

function getData() {
    // Get the data from local storage
    let currentList = JSON.parse(localStorage.getItem("tasks")) || [];
    // Loop if store data available in an array of object
    for (let i = 0; i < currentList.length; i++) {
        // Create a list for each available store data
        newList()
        // Get the input and span from a created list
        let arrCheck = allList.querySelectorAll("input")
        let arrSpan = allList.querySelectorAll("span")
        // Add the store data into input and span element
        arrCheck[i].checked = currentList[i].box
        arrSpan[i].innerHTML = currentList[i].task
        // Check if needed to slash span text or not
        if (arrCheck[i].checked === true) {
            arrCheck[i].classList.add("slashText")
        }
    }
}



