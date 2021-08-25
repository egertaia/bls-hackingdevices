import React, { useState } from 'react';
import './App.css'
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { debugData } from "../../utils/debugData";
import { useExitListener } from "../../hooks/useExitListener";
import Game from '../Game/Game';
import { HackType } from '../../typings/hackType';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: {
      show: true,
      hackType: HackType.ALPHANUMERIC,
      duration: 20
    },
  }
]);

type SetVisibleProps = {
  show: boolean,
  hackType: HackType,
  duration: number
}


const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hackType, setHackType] = useState<HackType>(HackType.ALPHANUMERIC);
  const [duration, setDuration] = useState<number>(0);

  useNuiEvent<SetVisibleProps>('setVisible', (data) => {
    // This is our handler for the setVisible action.
    console.log(data);
    setIsVisible(data.show);
    setHackType(data.hackType);
    setDuration(data.duration);
  });

  useExitListener(setIsVisible);

  return (
    <div className="nui-wrapper">
      {isVisible && (
        <Game hackType={hackType} duration={duration} />
      )}
    </div>
  );
}

export default App;
