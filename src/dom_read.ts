// importerar TodoList-klassen som vi har skapat

import { TodoList } from './TodoList';  


// skapar en instans av TodoList

const todoList = new TodoList();


// hämta DOM-elementen 
const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const priorityInput = document.getElementById('priorityInput') as HTMLInputElement;
const addButton = document.getElementById('addButton') as HTMLButtonElement;
const todoListDev = document.getElementById('todoList') as HTMLUListElement;


// uppdatera listan med todos i DOM
function updateTodoList() {
  todoListDev.innerHTML = '';  // rensar innehållet

  const todos = todoList.getTodos(); //lagra hela todos som finns sparade i variabeln
  todos.forEach((todo, index) => {  // går igenom hela array i todos
  const listItem = document.createElement('li'); //skapa en element för varje todo
  listItem.textContent = `Uppgift: ${todo.task} - Prioritet: ${todo.priority} - ${todo.completed ? 'Klar' : 'Inte klar'}`;  
    //todo.completed är true visas "Klar", annars "Inte klar".
    // Lägg till knapp för att markera att en todo är klar

    if (!todo.completed) { 
     //om todo är inte klar skapa en knapp

      const klarButton = document.createElement('button');
      klarButton.textContent = 'Markera som klar';
      klarButton.onclick = () => { 
        //klickar man på knappen anropas funktionen markTodoCompleted. 
        //vi skickar indexet för denna todo för att markera att just den är klar
        todoList.markTodoCompleted(index);
        // Uppdatera hela listan efter ändringen
        updateTodoList();  
      };
      listItem.appendChild(klarButton);
    }
    //lägga till knappen klarButoon i li_element
    todoListDev.appendChild(listItem);
  });
}


// Lägg till en ny todo 
addButton.onclick = () => {
  const task = todoInput.value; // hämta värdet från input-fältet och lagra det i variabeln
  const priority = parseInt(priorityInput.value, 10); //säkerställa att prioriteten är ett numeriskt värde 1, 2, 3
  const newTask = todoList.addTodo(task, priority); //lagrar nya task när metoden addTodo körs
  //vi gör en if sats för att se om todo lagts till eller inte 
  if (newTask) {
    //lyckad svar så kör vi metoden och uppdaterar listan för att lägga till nya todo
    updateTodoList(); 
  } else {
    //inte lyckad så får vi felmeddelande 
    alert('Informationen sparades inte! Kontrollera att du har angett uppgift och prioritet och försök igen!');
  }
// Töm input efter tillägg av todo 
  todoInput.value = ''; 
  priorityInput.value = ''; 
  
};


//  listan med TODO-uppgifter ska uppdateras och visas när sidan laddas för första gången
updateTodoList();
