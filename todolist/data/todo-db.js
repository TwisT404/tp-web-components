export class TodoDB {
    #dbName = "todo-list";
    #storeName = "todo";
    #db;
    #onUpdate;
    #ready;

    constructor(OnUpdate){
      this.#onUpdate = OnUpdate;
      this.#ready = this.initializeDB();
    }

    async initializeDB() {
        return new Promise((resolve, reject) => {
          const request =  indexedDB.open(this.#dbName);
            
          request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(this.#storeName, {
              keyPath: "id"
            })
          }
      
          request.onsuccess = (event) => {
            this.#db = event.target.result;
            resolve(this.#db);
            console.log("Database opened:", this.#db)
          }
      
          request.onerror = (event) => {
            reject("Database error", event.target.errorCode);
          }
        });
      }

      async add(todo) {
        // J'attends que la DB soit dispo avant de faire quoi que ce soit
        await this.#ready;
      
        const transaction = this.#db.transaction(this.#storeName, "readwrite");
        const store = transaction.objectStore(this.#storeName);
      
        const request = store.add(todo);
      
        request.onerror = (error) =>
          console.error(`Failed to add todo: ${error}`)
      
        request.onsuccess = async () => {
          console.info(`Added todo`, todo.id);
          this.#onUpdate(await this.getAll());
        }
      }

      async getById(id) {
        await this.#ready;
      
        // Retour d'une promise pour lire la valeur de retour
        return new Promise((resolve, reject) => {
          const transaction = this.#db.transaction(this.#storeName, "readonly");
          const store = transaction.objectStore(this.#storeName);
          
          const request = store.get(id);
      
          request.onerror = (error) => reject(error)
          request.onsuccess = () => resolve(request.result)
        })
      }

      async getAll() {
        await this.#ready;
      
        // Retour d'une promise pour lire la valeur de retour
        return new Promise((resolve, reject) => {
          const transaction = this.#db.transaction(this.#storeName, "readonly");
          const store = transaction.objectStore(this.#storeName);
        
          const request = store.getAll();
      
          request.onerror = (error) => reject(error)
          request.onsuccess = () => resolve(request.result)
        })
      }


}



