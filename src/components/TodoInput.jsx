import React, { useEffect, useState } from "react";
import {useSelector , useDispatch} from 'react-redux'
import { addTodo, isEditable, removeTodo, updateTodo } from "../features/todo";

export default function TodoInput() {
    const [input,setInput] = useState('');
    const [isUpdateBtn,setIsUdateBtn]  =useState(false);
    const [id,setId] = useState();
    const todos = useSelector(state=> state.todos);
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
      todos.map(todo=>{
        if(todo.isEdited){
          setInput(todo.text);
          setId(todo.id)
          setIsUdateBtn(true);
        }
      })
    },[todos])

    const onSubmitBtn =(e)=>{
      e.preventDefault()
      if(isUpdateBtn){
        
        input !==''?dispatch(updateTodo(input)):dispatch(removeTodo(id));

        dispatch(isEditable(id));
        setIsUdateBtn(false);
        setInput('');

      }
      else{
        input !==''?dispatch(addTodo(input)):alert("Empty input");
        setInput('');
      }
    }
    
    return(
        <form onSubmit={onSubmitBtn} className="mt-12 sm:mt-12 ">
          <div className="w-full flex justify-center gap-2 sm:gap-4">
          <input
            type="text"
            className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out  sm:w-[40%] lg:text-xl"
            placeholder="Enter a Todo..."
            value={input}
            
            required
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded sm:text-lg  lg:text-xl "
          >
            {isUpdateBtn?"Update Todo":"Add todo"}
          </button>
          </div>
        </form>
    )
}