import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { GameType, HackType } from '../../../typings/gameOptions';
import './Hack.css';
import { getRandomSetChar, randomNumber, sleep } from '../../../utils/random';
import { useHackMoveListener } from './useHackMoveListener';

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
    const codes = useRef<any[]>([]);
    const [showCorrect, setShowCorrect] = useState(false);
    const codesPosition = useRef<number>(0);
    const currentPosition = useRef<number>(43);
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
        console.log('still');
        let codesPos = (codesPosition.current + 1) % 80;
        console.log('codesPOS', codesPos);
        codesPosition.current = codesPos;

        let temporaryCodes = [...codes.current];
        temporaryCodes.push(temporaryCodes.shift());
        codes.current = temporaryCodes;

        console.log(codesPosition, 'cp', correctPosition, currentPosition);
    }, [codesPosition, correctPosition, currentPosition]);

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

        let currentAttempt = (currentPosition.current + codesPosition.current);
        currentAttempt %= 80;

        console.log(currentAttempt, correctPosition, 'cc');

        if (currentAttempt === correctPosition) {
            console.log('you win');
        } else {
            console.log('aeg läbi, kaotus');
        }

        setShowCorrect(true);

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
        codes.current = tempCodes;
    }


    useEffect(() => {
        console.log('hi');
        generateCodes();
        timerGame.current = setInterval(moveCodes, 1500);
        startTimer();
        timerFinish.current = sleep(duration * 1000, () => {
            check();
        });

    }, []);

    useHackMoveListener(currentPosition.current, (newPos) => currentPosition.current = newPos, check);


    return (
        <div className={hackClassName}>
            <div className='find'>
                {toFind.map((toFind) => (<div key={toFind}>{codes.current[toFind - codesPosition.current]}</div>))}
            </div>
            <div className='timer'>{timerValue}</div>
            <div className='codes'>
                {codes.current.map((code, i) => {
                    const classname = classNames({
                        'correct': showCorrect && toFind.some((tf) => tf === i + codesPosition.current),
                        'current': i === currentPosition.current
                    })
                    return (<div className={classname} key={code + i}>{code}</div>);
                })
                }
            </div>
        </div>
    );
}

export default Hack;

