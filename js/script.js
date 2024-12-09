const newTaskInput = document.querySelector(".input-task");
const inputButton = document.querySelector(".input-button");
const tasksWrapper = document.querySelector(".tasks-wrapper");
inputButton.addEventListener("click",()=>{
    const newTask = document.createElement("div");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = newTaskInput.value;
    newTaskInput.value = "";
    newTask.appendChild(taskSpan);
    tasksWrapper.appendChild(newTask);
});