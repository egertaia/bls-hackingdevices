import React from 'react';
import { HackType } from '../../../typings/hackType';
import './Hack.css';

type HackProps = {
    type?: HackType
}


const Hack: React.FC<HackProps> = ({ type = HackType.ALPHANUMERIC }) => {
    return (
        <div className='hack'>
            <div className='find'></div>
            <div className='timer'></div>
            <div className='codes'></div>
        </div>
    );
}

export default Hack;
