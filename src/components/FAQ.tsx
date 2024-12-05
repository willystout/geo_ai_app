'use client';

import React, { useState } from 'react';
import styles from '../styles/FAQ.module.css';

function FAQPage() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const faqs = [
        {
            question: "What is GeoAI?",
            answer: "GeoAI is a web application that leverages artificial intelligence to retrieve geospatial images and analyze satellite imagery. Our platform provides users the ability to search for geographical features on our map interface and upload images for feature detection, all in a user-friendly environment."
        },
        {
            question: "What is the mission of GeoAI?",
            answer: "GeoAI's mission is to support current geospatial AI development efforts in fields such as environmental protection, and make them more accessible to the public. With support from professors from the University of San Francisco Environmental Science Department, we aim to contribute to an exciting field of research and development that we believe can have a significant impact on the world."
        },
        {
            question: "How do I use GeoAI?",
            answer: "GeoAI has two main modes: Query and Insert Image. Query allows you to type in prompts in natural language to retrieve locations from world locations. Upon entering a quer, our map interface will display pins with the locations. Insert Image allows you to drop a .tif or .tiff file, which will be processed by our Prithvi detectors to identify geographical features. This mode returns a masked image with the detected features highlighted."
        },
        {
            question: "What is Prithvi?",
            answer: "Prithvi is an open source geospatial AI foundation model developed  by NASA and IBM. It is designed to analyze satellite imagery for various Earth observation tasks. Its temporal Vision Transformer architecture with a Masked Autoencoder learning strategy enables it to process images effectively. The model has demonstrated proficiency in applications such as flood mapping, wildfire scar segmentation, and land cover classification."
        },
        {
            question: "Do I need to log in to use GeoAI?",
            answer: "No, you do not need to log in to use GeoAI. You will still be able to run queries and view results without Google authentication. However, logging in allows you to see and edit your query history."
        },
        {
            question: "Can I contribute to the GeoAI repository?",
            answer: "Yes, you can contribute to the GeoAI repository on GitHub. Currently, the best way to contribute is by submitting bug reports or feature requests via GitHub Issues. We welcome community contributions and feedback to help improve the platform."
        },
        {
            question: "I have more questions. Can I contact you for support?",
            answer: "You can reach out to us via email. The contact form is located on the Contact section of the footer. We are happy to assist with questions, feedback, or technical support related to GeoAI."
        }
    ];

    const toggleFAQ = (index: number): void => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className={styles['global-background']}>
            <div className={styles['content-container']}>
                <h1 className={styles['header']}>Frequently Asked Questions</h1>
                <div>
                    {faqs.map((faq, index) => (
                        <div key={index} className={styles['faq-item']}>
                            <div 
                                className={styles['faq-question']} 
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span className={styles['faq-toggle']}>
                                    {openFAQ === index ? '−' : '+'}
                                </span>
                            </div>
                            <div 
                                className={`${styles['faq-answer']} ${openFAQ === index ? styles['open'] : ''}`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQPage;