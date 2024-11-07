class TodoStore {
    #ArrayToDo = [];
    #listener = [];
   
    

    /**
     * 
     * @param {*} callback 
     */
    subscribe(callback) {
      this.#listener.push(callback);
      
      // console.log(this.#listener);
    }

    constructor() {
      this.todos = this.#ArrayToDo;
      console.log(this.#ArrayToDo);
    }

    addToDo(valueInput){
      this.#ArrayToDo.push({
            "label" : valueInput,
            "done" : 0,
            "id" : crypto.randomUUID(),
        });
        
        this.#notify();
        
    }

    deleteToDo(id){
      this.#ArrayToDo = this.#ArrayToDo.filter((element) => element.id !== id);
      this.#notify();
    }

    deleteDoneToDo(){
      this.#ArrayToDo = this.#ArrayToDo.filter((element) => element.done === 0);
      this.#notify();
    }

    editDoneState(id, done){
      todoStore.getById(id).done = done;
      
      this.#notify();
    }

    editLabelToDo(id){
      todoStore.getById(id).label = label;
      
      this.#notify();
    }

    editDoneToOne(){
      let elements = this.getTodos();
      elements.forEach(element => {
        element.done = 1;
   
      });
      
      this.#notify();
    }

  
    getTodos() {
      return this.#ArrayToDo;
    }

        
    getById(todoId){
      return this.#ArrayToDo.find((element) => element.id === todoId);
    }

    
    #notify(){
      this.#listener.forEach(listener => listener(this.#ArrayToDo));
    }
  }
  
  export const todoStore = new TodoStore();