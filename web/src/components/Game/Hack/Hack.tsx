import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { GameType, HackType } from '../../../typings/gameOptions';
import './Hack.css';
import { getRandomSetChar, randomNumber, sleep } from '../../../utils/random';

type HackProps = {
    hackType: HackType,
    gameType: GameType,
    duration: number
}

const Hack: React.FC<HackProps> = ({ hackType, gameType, duration }) => {
    let timerStart: Date;
    const timerGame: any = useRef();
    let timerTime: any;
    const timerFinish: any = useRef();
    const [correctPosition] = useState<number>(randomNumber(0, 80));
    const [codes, setCodes] = useState<Array<string>>([]);
    const [codesPosition, setCodesPosition] = useState<number>(0);
    const [currentPosition, setCurrentPosition] = useState<number>(43);
    const [timerValue, setTimerValue] = useState<string>('');

    const getGroupFromPosition = (position: number): Array<number> => {
        let group = [position];
        for (let i = 1; i < 4; i++) {
            if (position + 1 >= 80) group.push(position + i - 80);
            else group.push(position + i);
        }
        return group;
    }

    const [toFind] = useState<Array<number>>(getGroupFromPosition(correctPosition));


    const moveCodes = useCallback(() => {
        console.log('cds', codes);
        console.log('mc', 'codesPosition', codesPosition);
        setCodesPosition((codesPosition + 1) % 80);
        console.log('mc', 'codesPosition', codesPosition);

        let temporaryCodes = [...codes];
        for (let i = 0; i < codesPosition; i++) {
            temporaryCodes.push(temporaryCodes[i]);
        }
        console.log(temporaryCodes);
        setCodes(temporaryCodes.splice(0, codesPosition));
        console.log('mc2', codes);
    }, [codes, codesPosition]);

    const timer = () => {
        let msString;
        let timerNow = new Date();
        let timerDiff = new Date();
        timerDiff.setTime(timerNow.getTime() - timerStart.getTime());
        let ms = (999 - timerDiff.getMilliseconds());
        let sec = timerDiff.getSeconds();
        if (ms > 99) msString = Math.floor(ms / 10);
        else if (ms < 10) msString = `0${ms}`;
        else msString = ms;
        setTimerValue(`${duration - 1 - sec}.${msString}`);
    }

    const check = () => {
        stopTimer();

        let currentAttempt = (currentPosition + codesPosition);
        currentAttempt %= 80;

        if (currentAttempt === correctPosition) {
            console.log('you win');
        } else {
            console.log('aeg läbi, kaotus');
        }

        resetGame();
    }

    const startTimer = () => {
        timerStart = new Date();
        timerTime = setInterval(timer, 1);
    }

    const resetTimer = () => {
        clearInterval(timerTime);
        setTimerValue('0.000');
    }

    const stopTimer = () => {
        clearInterval(timerTime);
    }


    const resetGame = () => {
        resetTimer();
        clearTimeout(timerGame.current);
        clearTimeout(timerFinish.current);
    }

    const hackClassName = classNames({
        'hack': true,
        'mirrored': gameType === GameType.MIRRORED || (Math.round(Math.random()) === 1 && gameType === GameType.RANDOM)
    });

    function generateCodes() {
        let tempCodes = [];
        for (let i = 0; i < 80; i++) {
            tempCodes.push(getRandomSetChar(hackType) + getRandomSetChar(hackType));
        }
        console.log(tempCodes);
        setCodes(tempCodes);
    }


    useEffect(() => {
        console.log('hi');
        generateCodes();
        timerGame.current = setInterval(moveCodes, 10000);
        startTimer();
        timerFinish.current = sleep(duration * 1000, () => {
            console.log('end-game');
            check();
        });

        console.log(toFind, correctPosition);

    }, []);


    return (
        <div className={hackClassName}>
            <div className='find'>
                {toFind.map((toFind) => (<div key={toFind}>{codes[toFind]}</div>))}
            </div>
            <div className='timer'>{timerValue}</div>
            <div className='codes'>
                {codes.map((code, i) => (<div className={`${toFind.some(tf => tf === i) ? 'correct' : 'false'}`} key={code + i}>{code}</div>))}
            </div>
        </div>
    );
}

export default Hack;

