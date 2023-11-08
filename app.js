const form = document.getElementById("form");
const btn = document.getElementById("btn");
const list = document.getElementById("list");

function createTodoItem(todo) {
  let li = document.createElement("li");
  li.setAttribute("id", "todo_" + todo.id);

  let check = document.createElement("div");
  check.setAttribute("class", "check");

  let checkInput = document.createElement("input");
  checkInput.setAttribute("type", "checkbox");
  checkInput.setAttribute("id", "todo_check" + todo.id);

  check.appendChild(checkInput);
  li.appendChild(check);

  let text = document.createElement("div");
  text.setAttribute("class", "text");

  let textStrong = document.createElement("strong");
  if (todo.status == "done") {
    checkInput.checked = true;
  } else {
    checkInput.checked = false;
  }
  textStrong.innerHTML = todo.text;

  text.appendChild(textStrong);
  li.appendChild(text);

  let actions = document.createElement("div");
  actions.setAttribute("class", "actions");
  let edit = document.createElement("i");
  edit.setAttribute("class", "fa-regular fa-pen-to-square");

  let trash = document.createElement("i");
  trash.setAttribute("class", "fa-solid fa-trash");

  actions.appendChild(edit);
  actions.appendChild(trash);

  li.appendChild(actions);

  list.appendChild(li);
}

function setLocalStorage(arg) {
  const info = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];

  let todo = {};
  todo.id = Date.now();
  todo.text = arg;
  todo.status = "active";
  info.push(todo);
  localStorage.setItem("todo", JSON.stringify(info));
  form.value = "";
  createTodoItem(todo);
}

btn.addEventListener("click", function () {
  if (form.value) {
    setLocalStorage(form.value);
  }
});
window.onload = function () {
  let info = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
  if (info.length) {
    info.forEach((todo) => {
      createTodoItem(todo);
    });
  }

  let checkboxs = document.querySelectorAll("input[type='checkbox']");
  if (checkboxs.length) {
    checkboxs.forEach((checkbox) => {
      checkbox.addEventListener("change", function (e) {
        let elementId = checkbox.id.substring(10);
        if (e.target.checked) {
          checkbox.parentNode.nextSibling.childNodes[0].style.textDecoration =
            "line-through";
        } else {
          checkbox.parentNode.nextSibling.childNodes[0].style.textDecoration =
            "none";
        }
        console.log(checkbox.parentNode.nextSibling.childNodes[0]);
        info = info.map((todo) => {
          if (todo.id == elementId) {
            if (e.target.checked) {
              todo.status = "done";
            } else {
              todo.status = "active";
            }
          }

          return todo;
        });

        localStorage.setItem("todo", JSON.stringify(info));
      });
    });
  }
  console.log(checkboxs);
};
