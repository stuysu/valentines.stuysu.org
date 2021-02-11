import React, { createRef, useEffect } from 'react';

const Backdrop = ({ children }) => {
    const ref = createRef();

    useEffect(() => {
        if (typeof window !== 'undefined' && ref.current) {
            window.VANTA.BIRDS({
                el: ref.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.0,
                minWidth: 200.0,
                scale: 1.0,
                scaleMobile: 1.0,
                backgroundColor: 0xffffff,
                birdSize: 2.4,
                wingSpan: 20.0,
                speedLimit: 3.0,
                separation: 100.0,
                alignment: 1.0,
                cohesion: 1.0,
                quantity: 2.2,
            });
        }
    }, [ref.current]);

    return (
        <div
            ref={ref}
            style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: -1, opacity: 0.7 }}
        />
    );
};

export default Backdrop;
