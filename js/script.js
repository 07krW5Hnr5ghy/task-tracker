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
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.task;
        taskDiv.appendChild(checkBox);
        taskDiv.children[0].addEventListener("click",()=>{
            if(taskDiv.children[0].checked){
                taskDiv.children[1].classList.add("solved-tasks");
            }else{
                taskDiv.children[1].classList.remove("solved-tasks");
            }
            tasks = tasks.filter(task => task.task !== taskDiv.children[1].textContent);
            tasks.push({task:taskDiv.children[1].textContent,completed:true});
            window.localStorage.removeItem('tasks');
            window.localStorage.setItem('tasks',JSON.stringify(tasks));
            renderTasks();
        });
        const taskDeleteButton = document.createElement("button");
        taskDeleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        taskDiv.appendChild(taskSpan);
        taskDiv.appendChild(taskDeleteButton);
        tasksWrapper.appendChild(taskDiv);
        if(task.completed){
            console.log("completed");
            checkBox.checked = true;
            taskDiv.children[1].classList.add("solved-tasks");
        }else{
            checkBox.checked = false;
            taskDiv.children[1].classList.remove("solved-tasks");
        }
    });
}
renderTasks();
inputButton.addEventListener("click",()=>{
    if(newTaskInput.value.length > 0){

        console.log("new task");
        const newTask = {
            task:newTaskInput.value,
            completed:false,
        };
        tasks.push(newTask);
        window.localStorage.setItem('tasks',JSON.stringify(tasks));
        newTaskInput.value = "";
        renderTasks();
    }
});