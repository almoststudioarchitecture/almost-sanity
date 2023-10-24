'use client';

import { useState } from 'react';


export default function CopyEmailBtn({ email }: { email: string }) {  
    const [copyStatus, setCopyStatus] = useState('default'); 

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const emailAddress = `${email}@almost.studio`;
        navigator.clipboard.writeText(emailAddress)
            .then(() => {
                console.log('Email address copied to clipboard!');
                // Check if the event target is an instance of Element
                if (e.target instanceof Element) {
                    const boxElement = e.target.closest('.box');
                    if (boxElement) {
                        boxElement.classList.add('copied');
                        setTimeout(() => {
                            boxElement.classList.remove('copied');
                        }, 2000);
                    }
                }
            })
            .catch(err => {
                console.error('Failed to copy email address: ', err);
            });
    }
    
    
    
      
    return (
        <button onClick={handleClick} data-href={`mailto:${email}@almost.studio`}>
            <strong>{email}</strong>@almost.studio
        </button>
    );
}
