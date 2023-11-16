// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmail = document.getElementById("input-email");
    let inputFirstName = document.getElementById("input-firstName");
    let inputlastName = document.getElementById("input-lastName");
    let inputskinTypeID = document.getElementById("input-skinTypeID");
    let inputphoneNumber = document.getElementById("input-phoneNumber");

    // Get the values from the form fields
    let emailValue = inputEmail.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputlastName.value;
    let skinTypeIDValue = inputskinTypeID.value;
    let phoneNumberValue = inputphoneNumber.value;


    // Put our data we want to send in a javascript object
    let data = {
        email: emailValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        skinTypeID: skinTypeIDValue,
        phoneNumber: phoneNumberValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmail.value = '';
            inputFirstName.value = '';
            inputlastName.value = '';
            inputskinTypeID.value = '';
            inputphoneNumber.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let skinTypeIDCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    emailCell,innerText = newRow.email;
    firstNameCell.innerText = newRow.firstname;
    lastNameCell.innerText = newRow.lastName;
    skinTypeIDCell.innerText = newRow.skinTypeID;
    phoneNumberCell.innerText = newRow.phoneNumber;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.id);
    };


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(emailCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(skinTypeIDCell);
    row.appendChild(phoneNumberCell);

      // Add a row attribute so the deleteRow function can find a newly added row
      row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}