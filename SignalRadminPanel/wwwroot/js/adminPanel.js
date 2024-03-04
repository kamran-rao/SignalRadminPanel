//create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/adminPanel").build();
//connects to method that hub invokes aka receive notifications from hub
connectionUserCount.on("updateUsers", (users) => {
    const userTable = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    userTable.innerHTML = "";

    users.forEach(user => {
        const row = userTable.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = user.id;
        cell2.innerHTML = user.userName;
        cell3.innerHTML = user.email;

        
    });

});

document.getElementById("addUserBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const userName = document.getElementsByName("userName")[0].value;
    const email = document.getElementsByName("email")[0].value;

    // Call the server-side method to add a new user
    connectionUserCount.invoke("NewUserInserted", { UserName: userName, Email: email });
});


// Add event listeners for edit and delete buttons
function fullfilled() {
    console.log("successfull connection build");
    //newWidowLoadedOnClient();
}
function rejected() {
    console.log("no connection build");
}
//start the connection
connectionUserCount.start().then(fullfilled, rejected);