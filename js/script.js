const newTaskInput = document.querySelector(".input-task");
const inputButton = document.querySelector(".input-button");
let tasks = null;
if(window.localStorage.getItem('tasks')){
    tasks = JSON.parse(window.localStorage.getItem('tasks'));
}else{
    tasks = [];
}
function renderTasks(){
    const tasksWrapper = document.querySelector(".tasks-wrapper");
    tasksWrapper.innerHTML = "";
    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.task;
        taskDiv.appendChild(taskSpan);
        tasksWrapper.appendChild(taskDiv);
    });
}
renderTasks();
inputButton.addEventListener("click",()=>{
    console.log(newTaskInput.value);
    console.log(newTaskInput.value.length);
    if(newTaskInput.value.length > 0){

        console.log("new task");
        const newTask = {
            task:newTaskInput.value,
            complete:false,
        };
        tasks.push(newTask);
        window.localStorage.setItem('tasks',JSON.stringify(tasks));
        newTaskInput.value = "";
        renderTasks();
    }
});