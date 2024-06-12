import {createSlice, nanoid} from '@reduxjs/toolkit'
import { isEdited } from '../../../reduxToolkit/src/features/todo/todoSlice'

const initialState = {
   todos:[]
}

export const todoslice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload,
                isEdited:false
            }
            state.todos.push(todo);
        },
        removeTodo:(state,action)=>{
           state.todos = state.todos.filter(todo => todo.id!==action.payload)
        },
        isEditable:(state,action)=>{
            state.todos.map(todo=> 
                todo.isEdited = todo.id === action.payload ? !todo.isEdited : false
            )
        },
        updateTodo:(state,action)=>{
            state.todos.map(todo=>
                todo.isEdited ? todo.text= action.payload:todo
            )
        }
    }
})

export const {addTodo,updateTodo,removeTodo,isEditable} = todoslice.actions;

export default todoslice.reducer;
