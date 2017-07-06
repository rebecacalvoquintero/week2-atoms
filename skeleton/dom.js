// var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
// var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application

(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');

  var completedContainer = document.getElementById('completed-container');
  //var addTodoForm = document.getElementById('add');

  var state = [
    // { id: -3, description: 'first todo', done:false },
    // { id: -2, description: 'second todo', done:false },
    // { id: -1, description: 'third todo', done:false },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');
    // you will need to use addEventListener

    // add span holding description
    var descriptionElement;

    if (todo.beingEdited) {
      descriptionElement = document.createElement('input');
      descriptionElement.value = todo.description;

      descriptionElement.addEventListener('input', function(event) {

        state =
          todoFunctions.editTodo(state, todo.id, descriptionElement.value);

      });

    } else {
      descriptionElement = document.createElement('span');
      descriptionElement.textContent = todo.description;

    }

    todoNode.appendChild(descriptionElement);

    // buttons div tag to hold two buttons
    var buttons = document.createElement('div');
    buttons.classList.add("buttons");

    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.classList.add("remove");
    deleteButtonNode.innerHTML = "remove";

    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    var editButtonNode = document.createElement('button');
    editButtonNode.classList.add("edit");
    editButtonNode.innerHTML = "edit";

    editButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.toggleEditing(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(editButtonNode);


    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = "complete";


    complete.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    })
    todoNode.appendChild(complete);



    // add markTodo button

    // add classes for css

    return todoNode;
  };

  // bind create todo form

  document.getElementById('add').addEventListener('click', function(e) {
    e.preventDefault();
    // https://developer.mozilla.org/en-US/docs/Web/Events/submit
    // what does event.preventDefault do?
    // what is inside event.target?
    //var description = '?'; // event.target ....
    var value = document.getElementById('tasktoadd').value;
    var newtodoobj = {
      description: value
    };

    // hint: todoFunctions.addTodo
    var newState = todoFunctions.addTodo(state, newtodoobj); // ?? change this!
    update(newState);

  });


  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {

    var taskLeft = todoFunctions.sortTodos(state.slice(), false);
    var taskCompleted = todoFunctions.sortTodos(state.slice(), true);

    var todoListNode = document.createElement('ul');

    taskLeft.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);

    var todoListNode = document.createElement('ul');

    taskCompleted.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    completedContainer.replaceChild(todoListNode, completedContainer.firstChild);

  };

  if (container) renderState(state);
})();
