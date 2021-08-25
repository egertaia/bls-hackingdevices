import React from 'react';
import './Splash.css';
import { SplashText } from '../../../typings/splashText';
import { ReactComponent as HackerImage } from '../../../assets/crime-hacker.svg';


type SplashProps = {
    text?: SplashText
}

const Splash: React.FC<SplashProps> = ({ text = SplashText.PREPARING }) => {

    return (
        <div className='splash'>
            <div className='icon'><HackerImage /></div>
            <span className='text'>{text}</span>
        </div>
    );
}

export default Splash;
