import { todoStore } from "./todo-store.js";
import "./ToDoItem.js";
class NewToDo extends HTMLElement{
        
    connectedCallback() {
        
        this.innerHTML =`
        <form>
            <label>
                <span>Tâche :</span>
                <input type="text" required name="label">
            </label>
            <button>+</button>
        </form>
        `;

        this.$form = this.querySelector("form");
        this.$input = this.querySelector("input");

        this.$form.addEventListener("submit", (event) => this.onSubmit(event));
        // console.log(todoStore.ArrayToDo);

    }

    onSubmit(event){
        event.preventDefault();
        //Store???
        
        console.log(this.$input.value);
        todoStore.addToDo(this.$input.value);
       
        this.$input.value ="";
    }


}
customElements.define("input-to-do", NewToDo);