// Step One - controller accept request
function getMessage() {

    let msg = document.getElementById("txtmessage").value;
    displayMessage(msg);
}


// Final Step - view
function displayMessage(message) {

    // <li class="list-group-item">A list item</li>
    element = document.getElementById("results");
    //next create a new li element 
    let item = document.createElement("li");
    //add classes to the li element 
    item.classList.add("list-group-item")
    // set the message for the li element
    item.innerHTML = message;
    // add the new items to the list
    element.appendChild(item);

}