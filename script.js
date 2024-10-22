let array = [];

function insertItem() {
    let value = document.getElementById("array-item").value;
    if (value === "") {
        alert("Please enter a value to insert");
    } else {
        array.push(parseInt(value));
        document.getElementById("array-item").value = ""; // Clear input after inserting
        clearOutput(); // Clear existing boxes
        printArray(); // Re-print the array

        highlightLastInsertedItem(); // Highlight the last item in green briefly
    }
}

function displayItem(value, isDeleted = false) {
    let output = document.getElementById("output");
    let newBox = document.createElement("div");
    newBox.className = "box";
    newBox.textContent = isDeleted ? `${value} deleted` : value;
    if (isDeleted) {
        newBox.style.backgroundColor = "#ff4c4c"; // Red background for deleted items
    }
    output.appendChild(newBox);
}

function highlightLastInsertedItem() {
    let output = document.getElementById("output");
    let boxes = output.getElementsByClassName("box");
    if (boxes.length > 0) {
        let lastBox = boxes[boxes.length - 1];
        lastBox.style.backgroundColor = "#4caf50"; // Highlight the last inserted item in green
    }
}

function deleteItem() {
    let value = document.getElementById("array-item").value;
    if (value === "") {
        alert("Please enter a value to delete");
    } else {
        let index = array.indexOf(parseInt(value));
        if (index !== -1) {
            let deletedValue = array[index]; // Get the deleted value
            array.splice(index, 1); // Remove the item from the array
            highlightDeletedItem(deletedValue, index); // Highlight the deleted item in place
        } else {
            alert("Entered value is not present in the array");
        }
        document.getElementById("array-item").value = ""; // Clear input after deleting
    }
}

function highlightDeletedItem(value, index) {
    // Temporarily show the "deleted" text and highlight in red at the same index
    let output = document.getElementById("output");
    let boxes = output.getElementsByClassName("box");

    if (boxes[index]) {
        boxes[index].textContent = value + " deleting the element..."; // Display deleted text
        boxes[index].style.backgroundColor = "#ff4c4c"; // Red background for deleted items

        // Remove the box after 2 seconds
        setTimeout(() => {
            boxes[index].remove();
            clearOutput(); // Clear existing boxes
            printArray(); // Re-print the updated array without the deleted item
        }, 1000);
    }
}

function findItem() {
    let value = document.getElementById("array-item").value;
    if (value === "") {
        alert("Please enter a value");
    } else {
        clearOutput(); // Clear previous output before finding the item
        printArray(); // Always display the array first

        if (array.includes(parseInt(value))) {
            highlightFoundItem(value); // Highlight the found item in orange
        } else {
            alert("Entered value is not found in the array"); // Show alert but keep array displayed
        }
        document.getElementById("array-item").value = ""; // Clear input after finding
    }
}


function highlightFoundItem(value) {
    let output = document.getElementById("output");
    let boxes = output.getElementsByClassName("box");
    for (let box of boxes) {
        if (box.textContent === value) {
            box.style.backgroundColor = "#FFA500"; // Highlight in orange
        }
    }
}

function printArray() {
    clearOutput();
    if (array.length === 0) {
        alert("Array is empty !! please insert into the array");
    } else {
        array.forEach((value) => displayItem(value)); // Display all items without any highlight
    }
}

function clearOutput() {
    let output = document.getElementById("output");
    output.innerHTML = "";
}

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
});