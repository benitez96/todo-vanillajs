// Selectors 
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")


// event listeners

document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions

function addTodo(event){
    
    event.preventDefault();

    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create todo li item 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveToLocalStorage(todoInput.value)

    // check mark btn
    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton)

    //check tras btn
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to list

    todoList.appendChild(todoDiv);

    //clear todo-input value
    todoInput.value = "";

}

function deleteCheck(e){

    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeFromLocalStorage(todo)
        

        // todo.remove()
        todo.addEventListener('transitionend', () => { todo.remove() })
    }

    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    
    }
    
}


function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach((todo)=>{
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed': 
                todo.classList.contains('completed') ? todo.style.display = 'flex' : todo.style.display = 'none';
                break;
            case 'uncomplited': 
                todo.classList.contains('completed') ? todo.style.display = 'none' : todo.style.display = 'flex'; 
                break;
        }
    })
}

function saveToLocalStorage(todo){

    localStorage.getItem('todos') === null ? todos = [] :
    todos = JSON.parse(localStorage.getItem('todos'));

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    localStorage.getItem('todos') === null ? todos = [] :
    todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach((todo) => {
        // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create todo li item 
    const newTodo = document.createElement('li');
    newTodo.innerText = todo
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // check mark btn
    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton)

    //check tras btn
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list

    todoList.appendChild(todoDiv);
    })
}

function removeFromLocalStorage(todo){
    localStorage.getItem('todos') === null ? todos = [] :
    todos = JSON.parse(localStorage.getItem('todos'));

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}