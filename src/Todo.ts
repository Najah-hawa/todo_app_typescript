export interface Todo {
    task: string; //texten för själva uppgiften
    completed: boolean; // en boolesk variabel för att markera om uppgiften är klar eller inte
    priority: number; // en heltalsvariabel från 1 till 3 för prioritering, där 1 är viktigast och 3 är minst viktigt
}

//vi har skapat en interface som är en grund för att definiera hur varje uppgift (todo) kommer att se ut.