'use client'

import { useEffect, useState } from 'react';
import styles from '../css/Cursor.module.css';

interface DrawCursorProps {
    cursorSize: number;
}

export default function DrawCursor({ cursorSize }: DrawCursorProps) {
    const [isCursorVisible, setIsCursorVisible] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    // 1. Fix Hydration: Only signal "mounted" after first client-side render
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const updatePosition = (x: number, y: number, target: EventTarget | null, pointerType: string) => {
            setCursorPosition({ x, y });

            // Check if the current element (or any parent) has the data-hide attribute
            const isOverHideElement = (target as HTMLElement)?.closest?.('[data-hide-cursor]');
            if (isOverHideElement || pointerType === 'touch') {
                setIsCursorVisible(false);
            } else {
                setIsCursorVisible(true);
            }
        };

        const handleMouseMove = (e: PointerEvent) => {
            updatePosition(e.clientX, e.clientY, e.target, e.pointerType);
        };


        // Standard event listeners
        document.addEventListener('pointermove', handleMouseMove);

        return () => {
            document.removeEventListener('pointermove', handleMouseMove);
        };
    }, [isMounted]); // Re-run when mounted

    // 2. Prevent rendering anything until mounted to ensure SSR matches Client
    if (!isMounted) return null;

    const cursorStyle = {
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        display: isCursorVisible ? 'block' : 'none',
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
    };

    return (
        <div id="cursor" className={`${styles.cursor} cursor`} style={cursorStyle}>
            <span>Draw</span>
        </div>
    );
}