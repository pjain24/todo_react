import React, {useEffect, useState} from "react";
import axios from '../../axios'
import { Container } from './styles';
import Form from "../Form";
import TodoList from "../TodoList";


function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  // console.log(input, "input");

  const fetchData = async () => {
    try{
      const response = await axios.get('/todos');
      setTodos(response.data);
    }
    catch(err){
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if(input.length == 0) return null;
    await axios.post('/todos', [{
      ...todos,
      text: input,
      completed: false,
    }])
    fetchData();
    setInput('');
    console.log('addedTodo');
  };
  return (
    <Container>
      <h2>List of the todos</h2>
      <Form input= {input} setInput={setInput} addTodo= {addTodo} />
      <TodoList todos= {todos} fetchData={fetchData}/>
      {/* <Key /> */}
      </Container>
  );
}

export default Todo;