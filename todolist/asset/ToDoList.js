import { todoStore } from "./todo-store.js";
import './ToDoItem.js';

class ToDoList extends HTMLElement{
    connectedCallback() {
        this.renderArrayList();

        todoStore.subscribe(() => this.renderArrayList());
    }

    renderArrayList(){
        this.innerHTML = `
        <ul>
            ${todoStore.getTodos().map(todo =>
                `<li>
                    <todo-item todo-id=${todo.id}></todo-item>
                </li>`
            ).join("")}
        </ul>
        `;

        

    }



    disconnectedCallback() {}
    
}
customElements.define("list-to-do", ToDoList);