
const taskInput = document.getElementById("new-task"); 
const addButton = document.getElementsByTagName("button")[0];
const incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
const completedTasksHolder= document.getElementById("completed-tasks"); 

const createNewTaskElement = function(taskString) {

  const listItem = document.createElement("li");


  const checkBox = document.createElement("input"); 
  const label = document.createElement("label");
  const editInput = document.createElement("input"); 
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  

  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}
const addTask = function() {
  
  var ip = document.getElementById("new-task").value;
  if(ip.length<=0)
	  alert('This field cannot be left empty!');
  else{
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";

  }
}

var input = document.getElementById("new-task");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});

const editTask = function() {
  

  const listItem = this.parentNode;
  
  const editInput = listItem.querySelector("input[type=text");
  const label = listItem.querySelector("label");
  
  const containsClass = listItem.classList.contains("editMode");
  

  if(containsClass) {
    
    label.innerText = editInput.value;
  } else {
   
    editInput.value = label.innerText;
  }
  
  listItem.classList.toggle("editMode");
  
}

var deleteTask = function() {
  
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
 
  editButton.onclick = editTask;
  
  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);

for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for(var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
