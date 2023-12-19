import { Route, Routes } from 'react-router-dom';
import { SessionContextProvider } from './hooks/session-context';
import { NotFound } from './NotFound';
import { Home } from './components/Home';
import './App.css';
import Login from './components/Login';
import My from './components/My';
import { MemoHello } from './components/Hello';
import { Nav } from './Nav';
import { useCallback, useMemo } from 'react';
import { useCounter } from './hooks/counter-context';
import { Items } from './components/Items';
import { Item } from './components/Item';

function App() {
  const { count } = useCounter();
  const fn = useCallback(() => 'fn!', []);
  const age = useMemo(() => count + 1, [count]);
  return (
    <>
      <SessionContextProvider>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ttt' element={<h1>ttt</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path='/my' element={<My />} />
          <Route path='/items' element={<Items />} />
          <Route path='/items/:id' element={<Item />} />
          <Route path='/hello' element={<MemoHello age={age} fn={fn} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SessionContextProvider>
    </>
  );
}
export default App;
