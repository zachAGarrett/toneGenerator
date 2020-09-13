import React from 'react';
import './App.css';

function App() {
  const [count, counter] = React.useState(0)
  let currCount = count;
  return (
    <div className="App">
      <div className="render">{count}</div>
      <button className="add" onClick={() => counter(currCount += 1)}>press</button>
    </div>
  );
}

export default App;
