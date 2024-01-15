'use client'

import { useEffect, useState } from 'react';
import styles from '../css/Cursor.module.css';

// Define an interface for the props
interface DrawCursorProps {
    // defaultSize: number; // Assuming size is a number
    // smallSize: number; // The smaller size for screens <= 500px
    cursorSize: number; // Assuming size is a number
}


// export default function DrawCursor({ defaultSize, smallSize }: DrawCursorProps) {
    export default function DrawCursor({ cursorSize }: DrawCursorProps) {

    // console.log(defaultSize, smallSize);


    // const [cursorSize, setCursorSize] = useState(window.innerWidth <= 500 ? smallSize : defaultSize);

    const [isCursorVisible, setIsCursorVisible] = useState(true);

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if(typeof window !== 'undefined'){
                    // Set the cursor position after the component mounts
                    setCursorPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
            }
    }, []);

    useEffect(() => {

        // Function to update the cursor position
        const updateCursorPosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        // Function to update the cursor position for touch events
        const updateTouchPosition = (e: TouchEvent) => {
            const touch = e.touches[0];
            setCursorPosition({ x: touch.clientX, y: touch.clientY });
        };

        // Set initial cursor position based on window size
        const setInitialCursor = () => {
            setCursorPosition({
                x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
                y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
            });
        };

        // Other event handlers
        const hideCursor = () => setIsCursorVisible(false);
        const showCursor = () => setIsCursorVisible(true);
        const clearCursorText = () => {
            const cursorSpan = document.querySelector('#cursor span');
            if (cursorSpan) cursorSpan.innerHTML = "";
        };

        // Adding event listeners
        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', updateCursorPosition);
            window.addEventListener('touchmove', updateTouchPosition);
            window.addEventListener('load', setInitialCursor);  // Set initial position on window load
        }

        const cursorElem = document.getElementById('cursor');
        if (cursorElem) {
            document.addEventListener('mousedown', clearCursorText);
        }

        const hideCursorElems = document.querySelectorAll('[data-hide-cursor]');
        hideCursorElems.forEach(elem => {
            elem.addEventListener('mouseenter', hideCursor);
            elem.addEventListener('mouseleave', showCursor);
        });

        // Cleanup function
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('mousemove', updateCursorPosition);
                window.removeEventListener('touchmove', updateTouchPosition);
                window.removeEventListener('load', setInitialCursor);
            }

            if (cursorElem) {
                cursorElem.removeEventListener('mousedown', clearCursorText);
            }

            hideCursorElems.forEach(elem => {
                elem.removeEventListener('mouseenter', hideCursor);
                elem.removeEventListener('mouseleave', showCursor);
            });
        };
    }, [cursorSize]);

    // console.log(defaultSize);

    const cursorStyle = {
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        display: isCursorVisible ? 'block' : 'none',
        width: `${cursorSize}px`,  // Use cursorSize state here
        height: `${cursorSize}px`, // Use cursorSize state here
    };


    return (
        <div id="cursor" className={`${styles.cursor} cursor`} style={cursorStyle}>
            <span>Draw</span>
        </div>
    );
}
