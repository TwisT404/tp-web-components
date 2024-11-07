import { todoStore } from "./todo-store.js";
class CreatePageToDo extends HTMLElement{
    
    connectedCallback() {
        this.innerHTML =`
            <input-to-do></input-to-do>
            <list-to-do></list-to-do>
            Nombre de tâches restantes:
            <button id="deleteDone">Supprimer les tâches effectués</button>
            <button id="checkedAllTasks">Cocher toutes les tâches effectués</button>
        `;

        document.getElementById("deleteDone").addEventListener("click", ()=>
            todoStore.deleteDoneToDo()
        );
        document.getElementById("checkedAllTasks").addEventListener("click", () => 
            todoStore.editDoneToOne()
        );
    }


}
customElements.define("to-do-page", CreatePageToDo);