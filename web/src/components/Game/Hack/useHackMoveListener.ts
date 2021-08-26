import { useEffect, useRef } from "react";
import { noop } from "../../../utils/misc";

type PositionSetter = (position: number) => void;
type ValueChecker = () => void;

const LISTENED_KEYS = ["KeyW", "KeyS", "KeyA", "KeyD", "Enter"];

// Basic hook to listen for key presses in NUI in order to exit
export const useHackMoveListener = (position: number, positionSetter: PositionSetter, valueChecker: ValueChecker) => {
    const setterRef = useRef<PositionSetter>(noop);
    const valueRef = useRef<ValueChecker>(noop);
    const positionRef = useRef<number>(0);

    useEffect(() => {
        setterRef.current = positionSetter
    }, [positionSetter]);

    useEffect(() => {
        valueRef.current = valueChecker
    }, [valueChecker]);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            console.log(e);
            if (LISTENED_KEYS.includes(e.code)) {
                switch (e.code) {
                    case "KeyW":
                        positionRef.current -= 10;
                        if (positionRef.current < 0) positionRef.current += 80;
                        setterRef.current(positionRef.current);
                        break;

                    case "KeyS":
                        positionRef.current += 10;
                        positionRef.current %= 80;
                        setterRef.current(positionRef.current);
                        break;
                    case "KeyA":
                        positionRef.current--;
                        if (positionRef.current < 0) positionRef.current = 79;
                        setterRef.current(positionRef.current);
                        break;
                    case "KeyD":
                        positionRef.current++;
                        positionRef.current %= 80;
                        setterRef.current(positionRef.current);
                        break;
                    case "Enter":
                        valueRef.current();
                        break;
                    default: break;
                }
            }
        }

        window.addEventListener("keydown", keyHandler)

        return () => window.removeEventListener("keydown", keyHandler)
    }, []);


}