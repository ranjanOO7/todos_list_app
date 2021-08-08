//Defining the root element
const root = document.getElementById("root");

// Defining the form
const form = document.createElement("div");
form.className = "form";
root.appendChild(form);

//Defining input box
const todo_input = document.createElement("input");
todo_input.id = "todo_input";
todo_input.setAttribute("type", "text");
todo_input.setAttribute("placeholder", "Enter your text here");
form.appendChild(todo_input);

//Defining add button
const todo_add = document.createElement("button");
todo_add.id = "todo_add";
todo_add.innerHTML = '<i class="fa fa-plus-square" aria-hidden="true"></i>';
form.appendChild(todo_add);

// Defining the filter
const select = document.createElement("div");
select.className = "select";
form.appendChild(select);

// Defining filter menu
const todo_filter = document.createElement("select");
todo_filter.className = "todo_filter";
todo_filter.setAttribute("name", "todos");
select.appendChild(todo_filter);

// Defining options for the filter
const opt1 = document.createElement("option");
opt1.value = "all";
opt1.innerText = "All";
todo_filter.appendChild(opt1);
const opt2 = document.createElement("option");
opt2.value = "completed";
opt2.innerText = "Completed";
todo_filter.appendChild(opt2);
const opt3 = document.createElement("option");
opt3.value = "incomplete";
opt3.innerText = "Incomplete";
todo_filter.appendChild(opt3);

// Defining footer menu
const menuList = document.createElement("footer");
const removeMark = document.createElement("button");
removeMark.innerText = "Remove complete mark";
menuList.appendChild(removeMark);
const removeList = document.createElement("button");
removeList.innerText = "Clear list";
menuList.appendChild(removeList);
root.appendChild(menuList);

//Defining the list
const list = document.createElement("ul");
list.id = "todo_list";
root.appendChild(list);

//Function to add list items
const addItems = (value, flag) => {
    const item = document.createElement("li");
    item.innerHTML = value;
    item.classList.add("todo_item");
    // Button list
    var buttonList = document.createElement("div");
    buttonList.classList.add("buttonList");
    //Complete Mark
    var checkBox = document.createElement("button");
    checkBox.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    checkBox.classList.add("todo_check");
    //Delete button
    var delBox = document.createElement("button");
    delBox.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    delBox.classList.add("todo_del");
    //Appending li components
    buttonList.appendChild(checkBox);
    buttonList.appendChild(delBox);
    item.appendChild(buttonList);
    // Adding check mark from the local history
    if (flag === 1) {
        item.classList.toggle("completed");
    }
    //Appending components to list
    list.appendChild(item);
    //Clear hte todo_input
    document.getElementById("todo_input").value = "";
};

//Function to delete items from the list
function deleteItem(e) {
    var itemDel = e.target;
    console.log(itemDel);
    // Deleting an item
    if (itemDel.className === "todo_del") {
        var content = itemDel.parentElement.parentElement;
        console.content;
        // Animation
        // content.classList.add("fall");
        // console.log(content.innerText);
        removeCompletedList(content.innerText);
        removelocalTodo(content.innerText);
        content.remove();
    }
    // Check completed task
    if (itemDel.className === "todo_check") {
        var content = itemDel.parentElement.parentElement;
        if (content.classList[1] === "completed") {
            // console.log("Getting it!!");
            content.classList.toggle("completed");
            removeCompletedList(content.innerText);
        } else {
            content.classList.add("completed");
            // console.log(content);
            addCompletedList(content.innerText);
        }
    }
}

// Checking the completed items
function addCompletedList(val) {
    // console.log(val);
    let completedItems;
    if (localStorage.getItem("completedItems") === null) {
        completedItems = [];
    } else {
        completedItems = JSON.parse(localStorage.getItem("completedItems"));
    }
    completedItems.push(val);
    // console.log(completedItems);
    localStorage.setItem("completedItems", JSON.stringify(completedItems));
}

// Remov Check mark from the completedList
function removeCompletedList(itemDel) {
    var completedList = JSON.parse(localStorage.getItem("completedItems"));
    // console.log(itemDel + itemDel.length);
    let count = 0;
    if (!(completedList == null)) {
        completedList.forEach(function (task) {
            // console.log(task + task.length);
            var status = itemDel === task;
            // console.log(status);
            if (status) {
                // console.log("Found!!");
                completedList.splice(count, 1);
                // console.log(content);
            }
            count++;
        });
        localStorage.removeItem("completedItems");
        localStorage.setItem("completedItems", JSON.stringify(completedList));
    }
    count = 0;
}

// Function to filter todo
const filterTodo = (e) => {
    var content = list.childNodes;
    // console.log(content);
    content.forEach(function (task) {
        switch (e.target.value) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                if (task.classList.contains("completed")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
                break;
            case "incomplete":
                if (task.classList.contains("completed")) {
                    task.style.display = "none";
                } else {
                    task.style.display = "flex";
                }
                break;
            default:
                break;
        }
    });
};

// Function to save list in local storage
const savelocalTodo = (task) => {
    let todosItem;
    if (localStorage.getItem("todosItem") === null) {
        todosItem = [];
    } else {
        todosItem = JSON.parse(localStorage.getItem("todosItem"));
    }
    todosItem.push(task);
    localStorage.setItem("todosItem", JSON.stringify(todosItem));
};

// Function to remove components from the local storage
const removelocalTodo = (itemDel) => {
    var content = JSON.parse(localStorage.getItem("todosItem"));
    // console.log(itemDel + itemDel.length);
    let count = 0;
    content.forEach(function (task) {
        // console.log(task + task.length);
        var status = itemDel === task;
        // console.log(status);
        if (status) {
            // console.log("Found!!");
            content.splice(count, 1);
            // console.log(content);
        }
        count++;
    });
    localStorage.removeItem("todosItem");
    localStorage.setItem("todosItem", JSON.stringify(content));
    count = 0;
};

// Get the already stored items
const getLocalTodo = () => {
    var content;
    var checkCompleted;
    let flag = 0;
    if (localStorage.getItem("todosItem") === null) {
        content = [];
    } else {
        content = JSON.parse(localStorage.getItem("todosItem"));
        // console.log(content);
    }
    if (!(localStorage.getItem("completedItems") === null)) {
        checkCompleted = JSON.parse(localStorage.getItem("completedItems"));
        console.log(checkCompleted);
        content.forEach(function (task) {
            checkCompleted.forEach(function (mark) {
                if (task == mark) {
                    flag = 1;
                }
            });
            // console.log(flag);
            addItems(task, flag);
            flag = 0;
        });
    } else {
        content.forEach(function (task) {
            addItems(task, "0");
        });
    }
};

const head = () => {
    var task = document.getElementById("todo_input");
    // console.log("MSG:" + task.value + ":MSG");
    if (task.value == "") {
        alert("Write something to add!!!");
    } else {
        savelocalTodo(task.value);
        addItems(task.value, "0");
    }
};

document.addEventListener("DOMContentLoaded", getLocalTodo);
todo_add.addEventListener("click", head);
list.addEventListener("click", deleteItem);
todo_filter.addEventListener("click", filterTodo);
removeMark.addEventListener("click", function () {
    localStorage.removeItem("completedItems");
    location.reload();
});
removeList.addEventListener("click", function () {
    localStorage.removeItem("completedItems");
    localStorage.removeItem("todosItem");
    location.reload();
});
