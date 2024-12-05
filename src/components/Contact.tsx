'use client';

import React, { useState, useEffect } from 'react';
import { init, send } from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';
import styles from '../styles/Contact.module.css';
import { useRouter } from 'next/navigation';

function ContactPage() {
    const [user, setUser] = useState<User | null>(null);
    const [showLoginNotification, setShowLoginNotification] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const router = useRouter();

    // Initialize EmailJS with your User ID (replace with your actual User ID or API key)
    init(process.env.NEXT_PUBLIC_EMAILJS_API_KEY || '');

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            
            if (!currentUser) {
                // Show login notification
                setShowLoginNotification(true);
                return;
            }
            
            setUser(currentUser);
            setShowLoginNotification(false);
        };

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user ?? null;
            
            if (!currentUser) {
                // Show login notification
                setShowLoginNotification(true);
                setUser(null);
                return;
            }
            
            setUser(currentUser);
            setShowLoginNotification(false);
        });

        checkUser();

        // Cleanup listener
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Ensure user is logged in
        if (!user) {
            setShowLoginNotification(true);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Send email using EmailJS
            // Replace these with your actual service ID, template ID, and template parameters
            await send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
                {
                    from_name: user.user_metadata.full_name || formData.name || user.email,
                    from_email: user.email, // Use the logged-in user's email
                    subject: formData.subject,
                    message: formData.message
                }
            );

            // Reset form and show success state
            setFormData({
                name: '',
                subject: '',
                message: ''
            });
            setSubmitStatus('success');
            console.log('Email sent successfully!')
        } catch (error) {
            console.error('Email send error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogin = () => {
        // Redirect to home page to trigger login
        router.push('/');
    };

    return (
        <div className={styles['global-background']}>
            {showLoginNotification && (
                <div className={styles['login-notification']}>
                    <div className={styles['notification-content']}>
                        <p>You must be logged in to send a message.</p>
                        <button 
                            onClick={handleLogin}
                            className={styles['login-button']}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}

            <div className={styles['content-container']}>
                <h1 className={styles['header']}>Contact Us</h1>
                <p className={styles['description']}>
                    Have a question or want to collaborate? We're here to help. 
                    Fill out the form below, and we'll get back to you soon.
                </p>

                {user ? (
                    <form 
                        className={styles['contact-form']} 
                        onSubmit={handleSubmit}
                    >
                        <div className={styles['form-group']}>
                            <label htmlFor="name" className={styles['form-label']}>Full Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                className={styles['form-input']}
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={user.user_metadata.full_name || "Your full name"}
                            />
                        </div>

                        <div className={styles['form-group']}>
                            <label htmlFor="email" className={styles['form-label']}>Email Address</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                className={styles['form-input']}
                                value={user.email}
                                disabled
                            />
                        </div>

                        <div className={styles['form-group']}>
                            <label htmlFor="subject" className={styles['form-label']}>Subject</label>
                            <input 
                                type="text" 
                                id="subject"
                                name="subject"
                                className={styles['form-input']}
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="Purpose of your message"
                            />
                        </div>

                        <div className={styles['form-group']}>
                            <label htmlFor="message" className={styles['form-label']}>Message</label>
                            <textarea 
                                id="message"
                                name="message"
                                className={styles['form-textarea']}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="What would you like to discuss?"
                            />
                        </div>

                        {submitStatus === 'success' && (
                            <div className={styles['success-message']}>
                                Message sent successfully!
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className={styles['error-message']}>
                                Failed to send message. Please try again.
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className={styles['submit-button']}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                ) : (
                    <div className={styles['login-prompt']}>
                        <p>Please log in to send a message</p>
                        <button 
                            onClick={handleLogin}
                            className={styles['login-button']}
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactPage;