import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=10`
      );
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodos',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error("Can't delete task. Server error.");
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todosSlice.todosState.find(todo => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Can't toggle status. Server error.");
      }
      dispatch(toggleTodoComplete({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        comleted: false,
      };
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(todo),
        }
      );
      if (!response.ok) {
        throw new Error("Can't add  task. Server error.");
      }
      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: 'todos1',
  initialState: {
    todosState: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todosState.push(action.payload);
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
  extraReducers: {
    [fetchTodos.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todosState = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [deleteTodo.rejected]: setError,
    [toggleStatus.rejected]: setError,
  },
});

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
