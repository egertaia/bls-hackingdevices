import React from 'react';
import { HackType } from '../../../typings/hackType';
import './Hack.css';

type HackProps = {
    hackType: HackType,
    duration: number
}


const Hack: React.FC<HackProps> = ({ hackType, duration }) => {
    return (
        <div className='hack'>
            <div className='find'></div>
            <div className='timer'></div>
            <div className='codes'></div>
        </div>
    );
}

export default Hack;
