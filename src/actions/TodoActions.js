export const AddTodoAction = (todo) => (dispatch, getState) => {
	const {
		Todo: {todos},
	} = getState();

 const hasTodo= todos.find((i) => i.todo === todo);
 if(!hasTodo && todo !== ''){
 	dispatch({
 		type:"ADD_TODO",
        payload:[{ id: todo, todo }, ...todos]
 	})
 }
};

 export const RemoveTodoAction= (todo) => (dispatch, getState) =>{
   const {
   		Todo: {todos},
   	} = getState();
   	dispatch({
 		type:"REMOVE_TODO",
        payload: todos.filter((t)=> t.id !== todo.id),
 	})
   }; 

 export const ToggleTodoAction = (todoId) => (dispatch, getState) => {
    const {
        Todo: {todos},
    } = getState();

    // Toggle the isDone status for the todo with the given id.
    const updatedTodos = todos.map(t => 
        t.id === todoId ? {...t, isDone: !t.isDone} : t
    );

    dispatch({
        type: "TOGGLE_TODO",
        payload: updatedTodos
    });
};

export const EditTodoAction = (todoId, newTodo) => (dispatch, getState) => {
    const {
        Todo: {todos},
    } = getState();

    const updatedTodos = todos.map(t => 
        t.id === todoId ? {...t, todo: newTodo} : t
    );
    console.log(updatedTodos);
    dispatch({
        type: "EDIT_TODO",
        payload: updatedTodos
    });
};
