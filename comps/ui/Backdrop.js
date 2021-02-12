import React, { createRef, useEffect } from 'react';

const Backdrop = () => {
    const ref = createRef();

    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            window.localStorage.getItem('backgroundDisabled') !== 'true' &&
            ref.current
        ) {
            window.VANTA.BIRDS({
                el: ref.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 900,
                minWidth: 200,
                scale: 1.0,
                scaleMobile: 1.0,
                backgroundColor: 0xffffff,
                birdSize: 2,
                wingSpan: 20.0,
                speedLimit: 2.0,
                separation: 100.0,
                alignment: 1.0,
                cohesion: 1.0,
                quantity: 3,
            });
        }
    });

    return (
        <div
            ref={ref}
            style={{
                width: '100vw',
                height: '100vh',
                right: 0,
                left: 0,
                position: 'fixed',
                overflowY: 'auto',
                zIndex: -1,
                opacity: 0.4,
            }}
        />
    );
};

export default Backdrop;
