import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos1',
  initialState: {
    todosState: [],
  },
  reducers: {
    addTodo(state, action) {
      if (action.payload.text.trim().length) {
        state.todosState.push({
          id: new Date().toISOString(),
          text: action.payload.text,
          comleted: false,
        });
      }
    },
    removeTodo(state, action) {
      state.todosState = state.todosState.filter(
        todo => todo.id !== action.payload.id
      );
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todosState.find(
        todo => todo.id === action.payload.id
      );
      toggledTodo.comleted = !toggledTodo.comleted;
    },
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
