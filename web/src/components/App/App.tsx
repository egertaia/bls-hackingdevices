import React, { useState } from 'react';
import './App.css'
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { debugData } from "../../utils/debugData";
import { useExitListener } from "../../hooks/useExitListener";
import Game from '../Game/Game';
import { GameType, HackType } from '../../typings/gameOptions';

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: {
      show: true,
      hackType: HackType.NUMERIC,
      gameType: GameType.NORMAL,
      duration: 20
    },
  }
]);

type SetVisibleProps = {
  show: boolean,
  hackType: HackType,
  gameType: GameType,
  duration: number
}


const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hackType, setHackType] = useState<HackType>(HackType.ALPHANUMERIC);
  const [gameType, setGameType] = useState<GameType>(GameType.RANDOM);
  const [duration, setDuration] = useState<number>(0);

  useNuiEvent<SetVisibleProps>('setVisible', (data) => {
    // This is our handler for the setVisible action.
    console.log(data);
    setIsVisible(data.show);
    if (data.show) {
      setHackType(data.hackType);
      setGameType(data.gameType);
      setDuration(data.duration);
    }

  });

  useExitListener(setIsVisible);

  return (
    <div className="nui-wrapper">
      {isVisible && (
        <Game hackType={hackType} gameType={gameType} duration={duration} />
      )}
    </div>
  );
}

export default App;
