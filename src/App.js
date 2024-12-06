import './App.css';
import {createEditor} from './components/Editor';
import { useRete } from "rete-react-plugin";
import * as React from 'react';

function App() {
  const [ref] = useRete(createEditor);
  return (
    <div className="App">
      <header className="App-header">
        <div className="namebar">
          <h1>Node Editor</h1>
        </div>

        <div className="editor" ref={ref} />


        <div className="footbar">
          <p>Developed by CCtech</p>
          <p>Copyright © 2023-2024 Anil Dangi</p>
        </div>
      </header>
    </div>
  );
}

export default App;