// TodoList.ts
import { Todo } from './Todo'; //importera interface 

export class TodoList {
  todos: Todo[] = [];   //skapa en array för att lagra alla task
  constructor() {
    this.loadFromLocalStorage(); // Ladda task från LocalStorage när du skapar en instans av Todo. 
    //om man stänger sidan kommer det att spara gamla task som du sparade innan
 }


// skapa en metod för att lägga till nya todos med prioritet
addTodo(task: string, priority: number): boolean {
    // först ska vi kontrollera inmatningar
    // returnera true om korrekta värden matats in både för task och priority annars return false 
   if (task.trim() === "" || priority < 1 || priority > 3) {
      return false; 
     }

    //sedan om inmattningar är korrekta ska vi ska en ny task som vi ska lägga till i localstorage. 
    const newTodo: Todo = {task, completed: false, priority};
    this.todos.push(newTodo);  //lägg till i array
    this.saveToLocalStorage(); //spara
    return true;
  }


// skapa en metod för att markera todos som klara
markTodoCompleted(todoIndex: number): void {
    if (this.todos[todoIndex]) {

    this.todos[todoIndex].completed = true;  // markerat todos som klart, true
    
    this.saveToLocalStorage(); // Sparar uppdateringar
    }
  }


// Uppdatera en todo
    updateTodo(todoIndex: number, updatedTask: string, updatedPriority: number): boolean {
      if (this.todos[todoIndex] && updatedTask.trim() !== "" && updatedPriority >= 1 && updatedPriority <= 3) {
        this.todos[todoIndex].task = updatedTask;
        this.todos[todoIndex].priority = updatedPriority;
        this.todos[todoIndex].completed = false; // Sätt completed till false, för att todo ska markeras igen som "Inte klar"
        this.saveToLocalStorage();
        return true;
      }
      return false;
    }

  // Ta bort en todo
  deleteTodo(todoIndex: number): void {
    if (this.todos[todoIndex]) {
      this.todos.splice(todoIndex, 1);
      this.saveToLocalStorage();
    }
  }

  
// metod för att hämta hela listan av todos
getTodos(): Todo[] {
    return this.todos;
  }


// metod för att spara todos till LocalStorage
saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  
// metod för att hämta todos från LocalStorage
loadFromLocalStorage(): void {
    const savedTodos = localStorage.getItem('todos');  //lagrar värden som finns sparade som en sträng (i JSON-format) i loccalstorage i variabeln
    if (savedTodos) { //har variablen värde så konvertera en JSON-sträng tillbaka till ett JavaScript-objekt 
      this.todos = JSON.parse(savedTodos);
    }
  }

}
