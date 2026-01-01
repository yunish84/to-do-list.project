const form = document.forms["todo-form"];
const todoList = document.getElementById("todo-list");
const doneDodoList = document.getElementById("done-todo-list");

addEventListener("load", () => {
  const list = JSON.parse(localStorage.getItem("todos")) || [];
  for (const item of list) {
    addNewItem(item.value, item.id);
  }

  const doneList = JSON.parse(localStorage.getItem("done-todos")) || [];
  for (const item of doneList) {
    addNewDoneItem(item.value, item.id);
  }
});

const addNewItem = (value, id) => {
  const template = document.getElementById("new-todo");
  const newListItem = template.content.cloneNode(true);
  const p = newListItem.querySelector("p");
  p.textContent = value;
  todoList.prepend(newListItem);
  const newLi = todoList.firstElementChild;
  newLi.id = id;
};

const addNewDoneItem = (value, id) => {
  const template = document.getElementById("done-todo");
  const newListItem = template.content.cloneNode(true);
  const p = newListItem.querySelector("p");
  p.textContent = value;
  doneDodoList.prepend(newListItem);
  const newLi = doneDodoList.firstElementChild;
  newLi.id = id;
};

const removeItem = (li) => {
  const list = JSON.parse(localStorage.getItem("todos")) || [];
  const newList = list.filter(
    (item) => item?.id?.toString() !== li?.id?.toString()
  );
  localStorage.setItem("todos", JSON.stringify(newList));
  li.remove();
};

const removeDoneItem = (li) => {
  const doneList = JSON.parse(localStorage.getItem("done-todos")) || [];
  const newList = doneList.filter(
    (item) => item?.id?.toString() !== li?.id?.toString()
  );
  localStorage.setItem("done-todos", JSON.stringify(newList));
  li.remove();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.elements["todo-text"];

  if (input.value) {
    const date = new Date();
    const id = date.getTime();
    addNewItem(input.value, id);
    const list = JSON.parse(localStorage.getItem("todos")) || [];
    const newItem = {
      id: id,
      value: input.value,
    };

    list.push(newItem);
    localStorage.setItem("todos", JSON.stringify(list));
    input.value = "";
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    const del = confirm("Do you want to delete this item?");
    if (del) {
      const li = event.target.parentElement;
      removeItem(li);
    } else {
      return;
    }
  }

  if (event.target.nodeName === "INPUT") {
    const li = event.target.parentElement;
    const p = li.querySelector("p");

    const doneList = JSON.parse(localStorage.getItem("done-todos")) || [];

    const newDoneItem = {
      id: li.id,
      value: p.textContent,
    };

    doneList.push(newDoneItem);
    localStorage.setItem("done-todos", JSON.stringify(doneList));

    addNewDoneItem(p.textContent, li.id);

    removeItem(li);
  }

  if (event.target.nodeName === "P") {
    const li = event.target.parentElement;
    const p = event.target;
    const oldContent = p.textContent;

    const newContent = prompt("Edit the to-do", oldContent);

    if (newContent) {
      p.textContent = newContent;
      const list = JSON.parse(localStorage.getItem("todos")) || [];

      const newList = list.map((item) =>
        item.id.toString() === li.id.toString()
          ? { id: +li.id, value: newContent }
          : item
      );

      localStorage.setItem("todos", JSON.stringify(newList));
    }
  }
});

doneDodoList.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    const del = confirm("Do you want to delete this item?");
    if (del) {
      const li = event.target.parentElement;
      removeDoneItem(li);
    } else {
      return;
    }
  }

  if (event.target.nodeName === "INPUT") {
    const li = event.target.parentElement;
    const p = li.querySelector("p");

    const list = JSON.parse(localStorage.getItem("todos")) || [];

    const newItem = {
      id: li.id,
      value: p.textContent,
    };

    list.push(newItem);
    localStorage.setItem("todos", JSON.stringify(list));

    addNewItem(p.textContent, li.id);

    removeDoneItem(li);
  }
});
