import { todoStore } from "./todo-store.js";
class ToDoItem extends HTMLElement{
    connectedCallback(){
        this.id = this.getAttribute("todo-id");
        this.todo = todoStore.getById(this.id);
        this.innerHTML = `                    
            <input type="checkbox" id="doneState"
            ${this.todo.done? "checked":""} 
            />
            <label>${this.todo.label}</label>
            <button aria-label='Supprimer ${this.todo.label}' id="delete">Supprimer</button>
            <button aria-label='Editer ${this.todo.label}'>Editer</button>
            <input type="text" id="newLabel"} 
            <button>Valieder</button>
            />
         `;
         
        this.$input =  this.querySelector("input");

        document.getElementById("delete").addEventListener("click", () => todoStore.deleteToDo(this.todo.id));
       
        this.$input.addEventListener("change", () => 
            todoStore.editDoneState(this.todo.id, this.$input.checked? 1 : 0)
        );



    }   




}
customElements.define("todo-item", ToDoItem);