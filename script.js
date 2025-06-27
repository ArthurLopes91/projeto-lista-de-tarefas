const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

form.assEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    li.addElementListener("click", () => {
        li.classList.toggle("done");
        savetasks();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "x";
    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        savetasks();
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
    input.value = "";
    savetasks();
});

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.done) {
            li.classList.add("done");
        }
        li.addEventListener("click", () => {
            li.classList.toggle("done");
            savetasks();
        });

        const removeBtn = document.createElement("button");
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            savetasks();
        });

        li.appendChild(removeBtn);
        list.appendChild(li);
        
    });
}

