import React, { useState, useEffect } from 'react';
import { SplashText } from '../../typings/splashText';
import Splash from './Splash/Splash';
import './Game.css';
import Hack from './Hack/Hack';
import { HackType } from '../../typings/hackType';

// https://sharkiller.ddns.net/nopixel_minigame/hackingdevice/minigame.js?v=20210808

type GameProps = {
    hackType: HackType,
    duration: number
}

const Game: React.FC<GameProps> = ({ hackType, duration }) => {
    const [splashText, setSplashText] = useState(SplashText.PREPARING);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        if (!gameStarted) {

            console.log('h');
            setTimeout(() => {
                setGameStarted(true);
                setSplashText(SplashText.CONNECTING);
            }, 1500);

        }
    }, [gameStarted, duration, hackType])
    return (
        <div className='minigame'>
            <Splash text={splashText}></Splash>
            {gameStarted && (
                <Hack hackType={hackType} duration={duration} />
            )}
        </div>
    );
}

export default Game;
