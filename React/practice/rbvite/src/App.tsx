import './App.css';
import Box from './components/Box';
import Counter from './components/Counter';
import Title from './components/Title';

function App() {
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
      <Counter/>
    </>
  );
}

export default App;
