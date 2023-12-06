'use client'

import { useEffect, useState } from 'react';
import styles from '../css/Cursor.module.css';

export default function DrawCursor() {
    
    // const [cursorPosition, setCursorPosition] = useState({ x: "50vw", y: "50vh" });
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const [isCursorVisible, setIsCursorVisible] = useState(true);

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        const hideCursor = () => setIsCursorVisible(false);
        const showCursor = () => setIsCursorVisible(true);
        const clearCursorText = () => {
            const cursorSpan = document.querySelector('#cursor span');
            if (cursorSpan) cursorSpan.innerHTML = "";
        };

        window.addEventListener('mousemove', updateCursorPosition);
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
            window.removeEventListener('mousemove', updateCursorPosition);
            if (cursorElem) {
                cursorElem.removeEventListener('mousedown', clearCursorText);
            }
            hideCursorElems.forEach(elem => {
                elem.removeEventListener('mouseenter', hideCursor);
                elem.removeEventListener('mouseleave', showCursor);
            });
        };
    }, []);

    const cursorStyle = {
        left: cursorPosition.x + 'px',
        top: cursorPosition.y + 'px',
        display: isCursorVisible ? 'block' : 'none',
    };

    return (
        <div id="cursor" className={`${styles.cursor} cursor`} style={cursorStyle}><span>Draw</span></div>
    );
}
