'use client';

import React from 'react';
import styles from '../styles/Footer.module.css';
import Image from 'next/image';

function Footer() {
    return (
        <footer className={styles['footer-container']}>
            <div className={styles['footer-content']}>
                {/* logo */}
                <div className={styles['footer-logo']}>
                    <Image
                        src="/usflogo.png"
                        alt="USF Logo"
                        width={100}
                        height={100}
                        className={styles['logo-image']}
                        priority
                    />
                </div>
                
                {/* Center content */}
                <div className={styles['footer-center']}>
                    <p className={styles['copyright']}>© 2024 GeoAI. All rights reserved.</p>
                    <nav>
                        <ul className={styles['footer-links']}>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="https://github.com/willystout/geo_ai_app">GitHub</a></li>
                        </ul>
                    </nav>
                </div>
                
                {/* Empty div to keep logo on the left*/}
                <div className={styles['footer-right']} />
            </div>
        </footer>
    );
}

export default Footer;