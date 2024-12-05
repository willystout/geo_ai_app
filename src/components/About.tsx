'use client';

import React from 'react';
import styles from '../styles/About.module.css';

function AboutPage() {
    return (
        <div className={styles['global-background']}>
            <div className={styles['content-container']}>
                <h1 className={styles['header']}>About Us</h1>
                <p className={styles['description']}>
                    Welcome to our platform! At GEO AI, we are committed to transforming geospatial data into actionable insights. 
                    Our cutting-edge tools leverage artificial intelligence to empower businesses, researchers, and individuals 
                    to make informed decisions. From mapping solutions to predictive analytics, we are here to simplify your GIS needs.
                </p>
                <p className={styles['description']}>
                    Our team consists of passionate experts in geospatial technology, machine learning, and software engineering. 
                    We are driven by a mission to make GIS technology accessible, innovative, and impactful for everyone.
                </p>
            </div>
        </div>
    );
}

export default AboutPage;
