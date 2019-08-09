// Define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
taskInput.autocomplete = "off";
// console.log(taskInput.value);
addEventListener();
//Load event listener

function addEventListener(){
    //dom load event
    document.addEventListener("DOMContentLoaded",setList)
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click",removeTask);
    clearBtn.addEventListener("click",removeAllTask);
    filter.addEventListener("keyup",filterTask);

}

function setList(e){

    let tasks =[];
    if(localStorage.getItem("task")!==null)
    {
        tasks = JSON.parse(localStorage.getItem("task"));
        tasks.forEach(e=>{
            addLi(e);
        });
    }

    e.preventDefault();
}

function deleteItemList(item){

    let tasks =[];
    let index;
    tasks = JSON.parse(localStorage.getItem("task"));

    index = tasks.indexOf(item);
    tasks.splice(index,1);

    localStorage.setItem("task",JSON.stringify(tasks));

}
//Add Task

function addTask(e){
    let flag = true;
    if(taskInput.value===""){
        alert("Add a task");
    }else{

        Array.from(taskList.children).forEach(e=>{
            if(e.innerText===taskInput.value)
            {
                flag = false;
            }
        });
        if(flag){

       
        addLi(taskInput.value);
        storeTask(taskInput.value);
        }
        else{
            alert("task already present");
        }
        //clear the input
        taskInput.value ="";
    
    }
    e.preventDefault();
}

function addLi(val){
        // console.log(val);
        //Create li element
        const li=document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(val));

        //Create link element
        const link = document.createElement("a");
        link.className="delete-item secondary-content";
        link.innerHTML = "<i class=\"fa fa-remove\"></i>";
        link.href="#";

        //Append link to li
        li.appendChild(link);
        console.log(li);

        //append li to ul
        taskList.appendChild(li);
}

function storeTask(e){
    let tasks;
    if(localStorage.getItem("task")===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("task"));
    }
    tasks.push(e);

    localStorage.setItem("task",JSON.stringify(tasks));
}
function removeTask(e){
    // console.log(e.target.parentElement.parentElement.innerText);
     // console.log();
    if(e.target.classList.contains("fa-remove")){
    e.target.parentElement.parentElement.remove()

    deleteItemList(e.target.parentElement.parentElement.innerText);
    }
    // taskList.children[0].textContent
    // if(e.target.classList.contains("fa-remove"))
    e.preventDefault();
}

function removeAllTask(e){
    if(taskList.children.length===0){
        alert("No task present to clear");

    }else{
        if(confirm("are u sure?"))
        {
        Array.from(taskList.children).forEach(e=>{
            e.remove();

        });

        localStorage.clear();
    }
    }
    e.preventDefault();
}

function filterTask(e){

    console.log(filter.value);
    if(filter.value!==""){
        Array.from(taskList.children).forEach(e=>{
            if(e.innerText.includes(filter.value))
            {
                e.style="display:block";
            }else{
                e.style="display:none";
            }
        });
    }else{
        Array.from(taskList.children).forEach(e=>{
            
                e.style="display:block";
            
        });
    }
    e.preventDefault();
}
