let headerInput = document.querySelector('.header-input'),
    addButton = document.getElementById('add'),
    toDoItems = document.getElementsByClassName('todo-item'),
    toDoItem = toDoItems[0];
    toDoRemove = document.getElementsByClassName('todo-remove'),
    toDoComplete = document.getElementsByClassName('todo-complete'),
    toDo = document.getElementById('todo'),
    completed = document.getElementById('completed'),
    form = document.querySelector('.todo-control');


let allTasksToDo = getElems("toDo");

function getElems (type){
  let items = localStorage.getItem( type );

  if( items === '' ) {
    return [];
  }
  items = items.split( ',' );
  return items;
}

allTasksToDo.forEach(function(taskText){
  toDo.insertAdjacentHTML('beforeend', `<li class="todo-item">
                                                ${taskText}
                                                <div class="todo-buttons">
                                                  <button class="todo-remove"></button>
                                                  <button class="todo-complete"></button>
                                                </div>
                                              </li>`);
});


let allTasksDone = getElems("done");

allTasksDone.forEach(function(taskText){
  completed.insertAdjacentHTML('beforeend', `<li class="todo-item">
                                                ${taskText}
                                                <div class="todo-buttons">
                                                  <button class="todo-remove"></button>
                                                  <button class="todo-complete"></button>
                                                </div>
                                              </li>`);
});



    form.addEventListener('submit', function(e){
      e.preventDefault();
      
      if(headerInput.value !== ''){
        
        let allTodo = getElems("toDo");
        let allDone = getElems("done");
        let allTasks = allTodo.concat(allDone);
        if (!allTasks.includes(headerInput.value)){
          toDo.insertAdjacentHTML('beforeend', `<li class="todo-item">
                                                ${headerInput.value}
                                                <div class="todo-buttons">
                                                  <button class="todo-remove"></button>
                                                  <button class="todo-complete"></button>
                                                </div>
                                              </li>`);
          allTodo.push( headerInput.value );
          localStorage.setItem('toDo', allTodo);                                        
          headerInput.value = '';

        }
      }

    });

    toDo.addEventListener('click', function(e){
      e.preventDefault();
      if (e.target.className == 'todo-remove'){
        removeTask(e);
      }
      if (e.target.className == 'todo-complete'){
        moveTask(e);
      }
      
    });

    function removeTask(e){
      let removeItem = e.target.parentNode.parentNode.textContent.trim();
      
      let allTasksToDo = getElems("toDo");
      let delIndex = allTasksToDo.indexOf( removeItem );
      if( delIndex !== -1 ) {
        allTasksToDo.splice( delIndex, 1 );
        localStorage.setItem('toDo', allTasksToDo);
      }

      let allTasksDone = getElems("done");
      delIndex = allTasksDone.indexOf( removeItem );
      if( delIndex !== -1 ) {
        allTasksDone.splice( delIndex, 1 );
        localStorage.setItem('done', allTasksDone);
      }

      e.target.parentNode.parentNode.remove();
      
    }

    function moveTask(e){
      completed.append(e.target.parentNode.parentNode);
      let moveTask = e.target.parentNode.parentNode.textContent.trim();
      let allTasksToDo = getElems("toDo");
      let delIndex = allTasksToDo.indexOf( moveTask );
      if( delIndex !== -1 ) {
        allTasksToDo.splice( delIndex, 1 );
        localStorage.setItem('toDo', allTasksToDo);
      }

      let allDone = getElems("done");
      allDone.push( moveTask );
      localStorage.setItem('done', allDone);

    }


    completed.addEventListener('click', function(e){
      e.preventDefault();
      if (e.target.className == 'todo-remove'){
        removeTask(e);
      }

      if (e.target.className == 'todo-complete'){
        inversMoveTask(e);
      }
    })


    function inversMoveTask(e){
      toDo.append(e.target.parentNode.parentNode);
      let inversMoveTask = e.target.parentNode.parentNode.textContent.trim();
      let allTasksDone = getElems("done");
      let delIndex = allTasksDone.indexOf(inversMoveTask);
      if( delIndex !== -1 ) {
        allTasksDone.splice( delIndex, 1 );
        localStorage.setItem('done', allTasksDone);
      }
      let allToDo = getElems("toDo");
      allToDo.push(inversMoveTask);
      localStorage.setItem('toDo', allToDo);
    }




















