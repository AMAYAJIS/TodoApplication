const TodoReducer = (state = { todos: [] }, action) => {
 switch (action.type) {
case "ADD_TODO":
return {todos: action.payload}; 
//adds new todo to existing ones
case "REMOVE_TODO":
return { todos: action.payload };
//removes the tododefault:
case 'EDIT_TODO':
    return {
        ...state,
        todos: state.todos.map(todo => 
            todo.id === action.payload.id ? {...todo, todo: action.payload.todo} : todo
        )
    };
default:
return state;
}
};
export default TodoReducer;