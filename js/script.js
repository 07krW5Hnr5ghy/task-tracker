const newTaskInput = document.querySelector(".input-task");
const inputButton = document.querySelector(".input-button");
let tasks = null;
if(window.localStorage.getItem('tasks')){
    tasks = JSON.parse(window.localStorage.getItem('tasks'));
}else{
    tasks = [];
}
function setLocalStorageTasks(tasks){
    window.localStorage.removeItem('tasks');
    window.localStorage.setItem('tasks',JSON.stringify(tasks));
}
function renderTasks(){
    const tasksWrapper = document.querySelector(".tasks-wrapper");
    tasksWrapper.innerHTML = "";
    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        const checkBox = document.createElement("input");
        checkBox.classList.add("checkbox");
        checkBox.type = "checkbox";
        const taskSpan = document.createElement("span");
        taskSpan.classList.add("task-title");
        taskSpan.textContent = task.task;
        taskDiv.appendChild(checkBox);
        taskDiv.children[0].addEventListener("click",(e)=>{
            tasks = tasks.filter(task => task.task !== taskDiv.children[1].textContent);
            if(task.completed){
                console.log("checked");
                checkBox.checked = true;
                taskDiv.children[1].classList.remove("solved-tasks");
                tasks = [
                    {task:taskDiv.children[1].textContent,completed:false},
                    ...tasks.filter(task => task.task !== taskDiv.children[1].textContent)
                ];
            }else{
                checkBox.checked = false;
                taskDiv.children[1].classList.add("solved-tasks");
                tasks.push({task:taskDiv.children[1].textContent,completed:true});
            }
            setLocalStorageTasks(tasks);
            renderTasks();
        });
        const taskDeleteButton = document.createElement("button");
        taskDeleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        taskDeleteButton.classList.add("delete-button");
        taskDeleteButton.addEventListener("click",()=>{
            tasks = tasks.filter(task => task.task !== taskDiv.children[1].textContent);
            setLocalStorageTasks(tasks);
            renderTasks();
        });
        taskDiv.appendChild(taskSpan);
        taskDiv.appendChild(taskDeleteButton);
        tasksWrapper.appendChild(taskDiv);
        if(task.completed){
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