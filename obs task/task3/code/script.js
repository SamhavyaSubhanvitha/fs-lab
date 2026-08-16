// Select required HTML elements using DOM methods
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
// Function to update the empty-list message
function updateEmptyMessage() {
    // Check whether the task list contains any tasks
    if (taskList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}
// Add a new task when the Add Task button is clicked
addTaskBtn.addEventListener("click", function () {
    // Get the task entered by the user
    const taskText = taskInput.value.trim();
    // Check whether the input is empty
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }
    // Create a new list item
    const taskItem = document.createElement("li");
    // Add CSS class to the list item
    taskItem.className = "task-item";
    // Create element for task text
    const task = document.createElement("span");
    task.className = "task-text";
    task.textContent = taskText;
    // Create Complete button
    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "Complete";
    // Add click event to Complete button
    completeBtn.addEventListener("click", function () {
        // Add or remove the completed class
        task.classList.toggle("completed");
    });
    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    // Add click event to Delete button
    deleteBtn.addEventListener("click", function () {
        // Remove the selected task from the webpage
        taskItem.remove();
        // Update empty-list message
        updateEmptyMessage();
    });
    // Add elements to the task item
    taskItem.appendChild(task);
    taskItem.appendChild(completeBtn);
    taskItem.appendChild(deleteBtn);
    // Add the task item to the task list
    taskList.appendChild(taskItem);
    // Clear the input box
    taskInput.value = "";
    // Update empty-list message
    updateEmptyMessage();
});
// Allow the Enter key to add a task
taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTaskBtn.click();
    }

});
// Display the empty message when the page first loads
updateEmptyMessage();
