'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import authStyles from '../styles/AuthButton.module.css';
import { createClient } from '@supabase/supabase-js'
import { User } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);
import Image from 'next/image';


const handleSignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: "http://localhost:3000"
        }
    });

    if (error) {
        console.error('Error logging in with Google:', error);
    }
};


const Header = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check if user is logged in
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setUser(currentUser);
        }
        checkUser();

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
        });

        // Cleanup listener
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <header className="fixed top-0 z-50 w-full bg-[#20262e] border-b border-[#64748b] font-['Inter']">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-20 relative">
                    {/* Logo */}
                    <div className="flex items-center flex-1 justify-start"> 
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/GeoAI-Logo-White2.png"
                                alt="GeoAI Logo"
                                width={120}
                                height={120}
                                className="w-auto h-10"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-12">
                        <Link
                            href="/"
                            className="text-[#f1f5f9] hover:text-[#fbbf24] text-[13px] font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/aboutpage"
                            className="text-[#f1f5f9] hover:text-[#fbbf24] text-[13px] font-medium transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/faq"
                            className="text-[#f1f5f9] hover:text-[#fbbf24] text-[13px] font-medium transition-colors"
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/map"
                            className="bg-[#64748b]/20 hover:bg-[#64748b]/30 text-[#a5b4fc] hover:text-[#fbbf24] px-6 py-2 rounded-md transition-colors text-[13px] backdrop-blur-sm"
                        >
                            View Map
                        </Link>
                    </nav>

                    {/* Auth button */}
                    <div className="flex items-center flex-1 justify-end">
                        {!user ? (
                            <button
                                className={authStyles.signInButton}
                                onClick={handleSignInWithGoogle}
                            >
                                Sign in with Google
                            </button>
                        ) : (
                            <div className={authStyles.userInfo}>
                                {user.user_metadata.avatar_url && (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt="User Avatar"
                                        className={authStyles.userAvatar}
                                    />
                                )}
                                <span className={authStyles.userEmail}>
                                    {user.email}
                                </span>
                                <button
                                    className={authStyles.signOutButton}
                                    onClick={() => supabase.auth.signOut()}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;