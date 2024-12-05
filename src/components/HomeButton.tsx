'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/HomeButton.module.css';

function HomeButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/homepage');
    };

    return (
        <button className={styles['home-button']} onClick={handleClick}>
            Return to homepage
        </button>
    );
}

export default HomeButton;