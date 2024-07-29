import React, { useState, useEffect } from 'react';

const CountdownToast = ({ closeToast }) => {
    const [timeLeft, setTimeLeft] = useState(90000); // 1 minutes 30 seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    closeToast();
                    return 0;
                }
                return prevTime - 1000;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [closeToast]);

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div style={{ background: 'white', color: 'black', padding: '10px', borderRadius: '5px' }}>
            <div>Đặt hàng thành công! Vui lòng thanh toán trong vòng: {formatTime(timeLeft)}</div>
        </div>
    );
};

export default CountdownToast;
