//api

const Api = (() => {

    const baseUrl = "http://localhost:3000";
    const path = "todos";

    const getTodo = () =>
        fetch([baseUrl, path].join('/'))
            .then(res => res.json());

    const deleteTodo = (id) =>
        fetch([baseUrl, path, id].join("/"), {
            method: "DELETE",
        });

    const addTodo = (todo) =>
        fetch([baseUrl, path].join("/"), {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => response.json());

    const editTodo = (todo, id) =>
        fetch([baseUrl, path, id].join("/"), {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => response.json());
    return {
        getTodo,
        deleteTodo,
        addTodo,
        editTodo,
    }
})();

//view

const View = (() => {

    const domstr = {
        pendinglist: 'pending_container',
        completelist: 'complete_container',
        deletebtn: 'deletebtn',
        inputbox: 'todolist_input',
        submitbox: 'todolist_submit',
        form: 'form',
        arrowright: 'arrowright',
        arrowleft: 'arrowleft',
    }
    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    }
    const createTmpPending = arr => {
        let tmp = "";
        arr.forEach(todos => {
            if (todos.isCompleted === false) {
                tmp += `
                <li>
                    <div id="first">${todos.content}</div>
                    <span id="last">
                        <button>
                            <svg id="edit" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                        </button>
                        <button class="deletebtn" id="${todos.id}">
                            <svg id="delete" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                        </button>
                        <button>
                            <svg id="arrowright" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                        </button>
                    </span>
                </li>
                `;
            }
        })
        return tmp;
    }
    const createTmpComplete = arr => {
        let tmp = "";
        arr.forEach(todos => {
            if (todos.isCompleted === true) {
                tmp += `
                <li>
                    <button id="first">
                        <svg id="arrowleft" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIcon" aria-label="fontSize small"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    </button>
                    <div>${todos.content}</div>
                    <span id="last">
                        <button>
                            <svg id="edit" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                        </button>
                        <button class="deletebtn" id="${todos.id}">
                            <svg id="delete" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                        </button>
                    </span>
                </li>
                `;
            }
        })
        return tmp;
    }
    return {
        render,
        createTmpPending,
        createTmpComplete,
        domstr
    }
})();

//model

const Model = ((api, view) => {
    class Todo {
        constructor(content) {
            this.content = content;
            this.isCompleted = false;
        }
    }

    class State {
        #todolist = [];
        get todolist() {
            return this.#todolist;
        }
        set todolist(newtodos) {
            this.#todolist = [...newtodos];

            const containerPending = document.getElementById(view.domstr.pendinglist);
            const containerComplete = document.getElementById(view.domstr.completelist);
            const tmpPending = view.createTmpPending(this.#todolist);
            const tmpComplete = view.createTmpComplete(this.#todolist);
            view.render(containerPending, tmpPending);
            view.render(containerComplete, tmpComplete);
        }
    }

    const getTodo = api.getTodo;
    const deleteTodo = api.deleteTodo;
    const addTodo = api.addTodo;
    const editTodo = api.editTodo;

    return {
        getTodo,
        deleteTodo,
        addTodo,
        editTodo,
        State,
        Todo,
    }
})(Api, View);

//controller

const Controller = ((model, view) => {
    const state = new Model.State();

    const addTodo = () => {
        const inputbox = document.getElementById(view.domstr.inputbox);
        const submitbox = document.getElementById(view.domstr.submitbox);
        const form = document.getElementById(view.domstr.form);
        inputbox.addEventListener("Keyup", (event) => {
            if (event.key === "Enter") {
                const newtodo = new model.Todo(event.target.value);
                console.log(newtodo);
                model.addTodo(newtodo).then((todo) => {
                    state.todolist = [todo, ...state.todolist];
                });
                event.target.value = "";
            }
        })
        submitbox.addEventListener("click", (event) => {
            if (event) {
                const newtodo = new model.Todo(event.target.value);
                model.addTodo(newtodo).then((todo) => {
                    state.todolist = [todo, ...state.todolist];
                });
                event.target.value = "";
            }

        })

    }

    const deleteTodo = () => {
        const pendingcontainer = document.getElementById(view.domstr.pendinglist);
        const completecontainer = document.getElementById(view.domstr.completelist);

        pendingcontainer.addEventListener("click", (event) => {
            state.todolist = state.todolist.filter(
                (todo) => +todo.id !== +event.target.id
            );
            model.deleteTodo(event.target.id);
        });
        completecontainer.addEventListener("click", (event) => {
            state.todolist = state.todolist.filter(
                (todo) => +todo.id !== +event.target.id
            );
            model.deleteTodo(event.target.id);
        });
    };

    const init = () => {
        model.getTodo().then((todos) => {
            state.todolist = todos;
        });
    };

    const bootstrap = () => {
        init();
        deleteTodo();
        addTodo();
    };

    return {
        bootstrap
    }
})(Model, View);


Controller.bootstrap();