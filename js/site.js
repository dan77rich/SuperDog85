//global variable. this is a bad idea in most cases
const events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

// fires on load builds a the drop down with a list of unique cites
function buildDropDown() {

    // first step is get a handle on the drop down
    let eventDD = document.getElementById("eventDropDownList");
    // reset the list
    eventDD.innerHTML = "";

    // <li><a class="dropdown-item" href="#"></a></li>
    // get the template
    let ddTemplate = document.getElementById("dropDown-template");
    // get the template node
    let ddItem = document.importNode(ddTemplate.content, true)

    let ddLink = ddItem.querySelector("a");
    ddLink.setAttribute("data-city", "All");
    ddLink.textContent = "All";
    eventDD.appendChild(ddItem);

    // add links for the unique cities
    let curEvents = getEvents();
    // get out data

    // get a distinct array of city names
    let distinctCities = [...new Set(curEvents.map((event) => event.city))];

    // let numbers = [1,2,3,3,4,4,5,5];
    // let distinctNumbers = [...new Set(numbers)];

    // filter that data to unique set of cities
    for (let index = 0; index < distinctCities.length; index++) {

        let ddItem = document.importNode(ddTemplate.content, true);

        let ddLink = ddItem.querySelector("a");
        ddLink.setAttribute("data-city", distinctCities[index]);
        ddLink.textContent = distinctCities[index];
        eventDD.appendChild(ddItem);


    }
    let statsHeader = document.getElementById("statsHeader");
    statsHeader.innerHTML = `Stats for All events`;

    displayStats(curEvents);

    // show data for all events
    displayEventData(curEvents)
}
// this is called everytime city name is clicked in the drop down
function getEventData(element) {
    let city = element.getAttribute("data-city");


    // create the stats for the clicked city
    let curEvents = getEvents();

    let filteredEvents = curEvents;

    if (city != 'All') {
        filteredEvents = curEvents.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        });
    }

    let statsHeader = document.getElementById("statsHeader");
    statsHeader.innerHTML = `Stats for ${city} events`;

    // Call a function to display the stats
    displayStats(filteredEvents);

}
// pull events from local storage
function getEvents() {
    curEvents = JSON.parse(localStorage.getItem("eventData"));

    if (curEvents === null) {
        curEvents = events;
        localStorage.setItem("eventData", JSON.stringify(curEvents));

    }

    return curEvents;
}
// this function displays cities
function displayStats(filteredEvents) {

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {

        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;

        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

    }

    average = total / filteredEvents.length;

    // write my values to the page  
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,

        }
    );

}
// this function displays all of the event data in a grid on the boton of the page
function displayEventData(curEvents) {
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");

    // clear the table of any previous data
    eventBody.innerHTML = "";

    // loop over all the eventData and write a row for each event 
    // to the eventBody element
    for (let index = 0; index < curEvents.length; index++) {
        let eventRow = document.importNode(template.content, true);

        // grab only the columns from the template
        // creates an array of columns in the template
        let eventCols = eventRow.querySelectorAll("td");

        eventCols[0].textContent = curEvents[index].event;
        eventCols[1].textContent = curEvents[index].city;
        eventCols[2].textContent = curEvents[index].state;
        eventCols[3].textContent = curEvents[index].attendance;
        eventCols[4].textContent = new Date(curEvents[index].date).toLocaleDateString();

        eventBody.appendChild(eventRow);

    }
}

function saveEventData() {
    // get all of the course data from local storage
    let curEvents = getEvents();

    let eventObj = {
        event: "name",
        city: "city",
        state: "state",
        attendance: 0,
        date: "06/01/2007",

    }

    // get the values from the add form
    eventObj.event = document.getElementById("newEventName").value;
    eventObj.city = document.getElementById("newEventCity").value;
    // get values from the dropdown
    let stateSel = document.getElementById("newEventState");
    eventObj.state = stateSel.options[stateSel.selectedIndex].text

    // turn the input into a number
    let attendanceNbr = parseInt(document.getElementById("newEventAttendance").value,10);
    eventObj.attendance = attendanceNbr;
    // format the date before saving
    let eventDate = document.getElementById("newEventDate").value;
    let eventDateFormatted = `${eventDate} 00:00`;
    eventObj.date = new Date(eventDateFormatted).toLocaleDateString();

    curEvents.push(eventObj);
    localStorage.setItem("eventData", JSON.stringify(curEvents));

    buildDropDown();
}