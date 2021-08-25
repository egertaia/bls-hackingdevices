import React, { useState } from 'react';
import { SplashText } from '../../typings/splashText';
import Splash from './Splash/Splash';
import './Game.css';
import Hack from './Hack/Hack';

// https://sharkiller.ddns.net/nopixel_minigame/hackingdevice/minigame.js?v=20210808

const Game: React.FC = () => {
    const [splashText, setSplashText] = useState(SplashText.PREPARING);
    return (
        <div className='minigame'>
            <Splash text={splashText}></Splash>
            <Hack />
        </div>
    );
}

export default Game;
