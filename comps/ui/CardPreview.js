import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';

import ReactCardFlip from 'react-card-flip';

const CardPreview = ({ variant, offset, textColor, backgroundColor, url, message }) => {
    const [flipped, setFlipped] = useState(false);

    if (variant === 'impose') {
        return (
            <div
                style={{
                    width: '95vw',
                    maxWidth: 400,
                    overflowWrap: 'break-word',
                    height: `calc(95vw * 1.25)`,
                    maxHeight: 500,
                    background: `url(${url})`,
                    backgroundSize: 'contain',
                }}
                className={styles.fit}
            >
                <div
                    style={{
                        paddingLeft: `${offset.left * 100}%`,
                        paddingTop: `${offset.top * 100}%`,
                        paddingRight: `${offset.right * 100}%`,
                        color: textColor,
                        height: `calc(100% - ${offset.bottom * 100}%)`,
                    }}
                >
                    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                        {message.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'flip') {
        return (
            <>
                <p style={{ textAlign: 'center' }}>
                    This card is double-sided. Click on it to see the other side.
                </p>
                <br />
                <ReactCardFlip isFlipped={flipped} flipDirection='horizontal'>
                    <div
                        style={{
                            width: '95vw',
                            maxWidth: 400,
                            height: `calc(95vw * 1.25)`,
                            maxHeight: 500,
                            background: `url(${url})`,
                            backgroundSize: 'contain',
                        }}
                        className={styles.fit}
                        onClick={() => setFlipped(!flipped)}
                    />

                    <div
                        style={{
                            width: '95vw',
                            maxWidth: 400,
                            height: `calc(95vw * 1.25)`,
                            maxHeight: 500,
                            background: backgroundColor,
                            overflowWrap: 'break-word',
                        }}
                        className={styles.fit}
                        onClick={() => setFlipped(!flipped)}
                    >
                        <div style={{ padding: '10%', height: '100%', color: textColor }}>
                            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                                {message.split('\n').map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </ReactCardFlip>
                <br />
            </>
        );
    }
};

export default CardPreview;
