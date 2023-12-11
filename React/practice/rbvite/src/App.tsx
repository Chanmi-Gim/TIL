import { useRef, useState } from 'react';
import './App.css';
import Box from './components/Box';
import Counter from './components/Counter';
import Title from './components/Title';

function App() {
  const [count, setCount] = useState(0)
  const counterRef = useRef();
  const increaseOrDecreaseCount = (amount : number) => setCount((prevCount)=> prevCount + amount)
  return (
    <>
      <Box
        borderWidth='3px'
        borderColor='red'
        borderStyle='solid'
        padding='4px'
        margin='2px'
      >
        <Title title='React Tutorial' color='red'>
          sub title: react basic
        </Title>
      </Box>
      <h1>Count: {count}</h1>
      <Counter ref={counterRef} increaseOrDecreaseCount={increaseOrDecreaseCount} />
    </>
  );
}

export default App;
