'use client';

import React from 'react';
import styles from '../styles/Footer.module.css';

function Footer() {
    return (
        <footer className={styles['footer-container']}>
            <div className={styles['footer-content']}>
                <p>&copy; 2024 GeoAI. All rights reserved.</p>
                <nav>
                    <ul className={styles['footer-links']}>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="https://github.com/willystout/geo_ai_app">GitHub</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;