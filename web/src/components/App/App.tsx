import React, { useState } from 'react';
import './App.css'
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { debugData } from "../../utils/debugData";
import { useExitListener } from "../../hooks/useExitListener";
import Game from '../Game/Game';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  }
]);


const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useNuiEvent<boolean>('setVisible', (data) => {
    // This is our handler for the setVisible action.
    console.log(data);
    setIsVisible(data);
  });

  useExitListener(setIsVisible);

  return (
    <div className="nui-wrapper">
      {isVisible && (
        <Game />
      )}
    </div>
  );
}

export default App;
