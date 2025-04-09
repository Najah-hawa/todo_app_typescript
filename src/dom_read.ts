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
  listItem.textContent = `${todo.task} - Prioritet: ${todo.priority} - ${todo.completed ? 'Klar' : 'Inte klar'}`;  
    //todo.completed är true visas "Klar", annars "Inte klar".
    // Lägg till knapp för att markera att en todo är klar

    if (!todo.completed) { 
     //om todo är inte klar skapa en knapp

      const klarButton = document.createElement('button');
      klarButton.classList.add('btn', 'btn-klar');  
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


  // Lägg till knapp för att uppdatera en task 
    const updateButton = document.createElement('button');
    updateButton.classList.add('btn', 'btn-update');  
    updateButton.textContent = 'Uppdatera';
    updateButton.onclick = () => {
      //klickar på knappen så visas prompt för att mata in nya uppgifter
      const updatedTask = prompt('Ändra uppgift:', todo.task);
      const updatedPriority = prompt('Ändra prioritet (1-3):', todo.priority.toString());

      //kontrollera inmatningar

      if (updatedTask && updatedPriority) {
        const priority = parseInt(updatedPriority, 10);
        const success = todoList.updateTodo(index, updatedTask, priority); 
        if (success) {
          updateTodoList();  // Uppdatera listan om uppdateringen lyckades
        } else {
          alert('Uppdateringen lyckades inte. Försök igen.');
        }
      }
    };
    listItem.appendChild(updateButton);


// Lägg till knapp för att radera en task 
    const deleteButton = document.createElement('button'); 
    deleteButton.classList.add('btn', 'btn-delete');  
    deleteButton.textContent = 'Ta bort';
    deleteButton.onclick = () => {
      //När man klickar på knappen så visas en promt för att säkerställa att du vill ta bort. 
      if (confirm('Är du säker på att du vill ta bort denna uppgift?')) {
        todoList.deleteTodo(index);  // Ta bort todo 
        updateTodoList();  // Uppdatera listan efter borttagning
      }
    };
    listItem.appendChild(deleteButton);

    todoListDev.appendChild(listItem); // Lägg till listItem i listan

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
