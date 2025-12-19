import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useProfile } from '../lib/payload';

const NavItem = ({
    to,
    label,
    onClick,
    className
}: {
    to: string,
    label: string,
    onClick?: () => void,
    className?: string
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) onClick();

        if (to.startsWith('/#')) {
            const targetId = to.replace('/', '');
            if (isHome) {
                const element = document.querySelector(targetId);
                element?.scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate('/');
                setTimeout(() => {
                    const element = document.querySelector(targetId);
                    element?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            navigate(to);
            window.scrollTo(0, 0);
        }
    };

    const defaultClasses = "text-sm font-medium text-neutral-600 hover:text-neutral-900";
    const finalClasses = className ? className : defaultClasses;

    return (
        <a
            href={to}
            onClick={handleClick}
            className={`${finalClasses} transition-colors`}
        >
            {label}
        </a>
    );
};

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isHome) {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isMobileMenuOpen ? 'z-[100]' : 'z-50'} ${isScrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link to="/" className="text-lg font-semibold tracking-tight z-50 relative">
                    Ezekiel.
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    <NavItem to="/#about" label="About" />
                    <NavItem to="/#services" label="Services" />
                    <NavItem to="/projects" label="Work" />
                    <NavItem to="/#process" label="Process" />
                    <a
                        href="#contact"
                        onClick={handleContactClick}
                        className="px-5 py-2 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
                    >
                        Let's Talk
                    </a>
                </nav>

                {/* Mobile Toggle - High Z-Index to sit above overlay */}
                <button
                    className="md:hidden z-[70] relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-10 h-[100dvh] w-screen">
                        <NavItem
                            to="/#about"
                            label="About"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[40px] font-medium text-neutral-900 tracking-tight"
                        />
                        <NavItem
                            to="/#services"
                            label="Services"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[40px] font-medium text-neutral-900 tracking-tight"
                        />
                        <NavItem
                            to="/projects"
                            label="Work"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[40px] font-medium text-neutral-900 tracking-tight"
                        />
                        <NavItem
                            to="/#process"
                            label="Process"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[40px] font-medium text-neutral-900 tracking-tight"
                        />
                        <a
                            href="#contact"
                            onClick={(e) => {
                                setIsMobileMenuOpen(false);
                                handleContactClick(e);
                            }}
                            className="text-[40px] font-medium text-neutral-900 tracking-tight"
                        >
                            Contact
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
};

export const Footer: React.FC = () => {
    const profile = useProfile();

    return (
        <footer className="bg-neutral-950 text-white pt-24 overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-4 md:px-6">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                    {/* Logo / Brand Left */}
                    <div className="md:col-span-3">
                        <div className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center mb-8">
                            <div className="w-4 h-4 bg-white/40 rotate-45"></div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-3">
                        <h4 className="text-white text-sm font-medium mb-6">The Good</h4>
                        <ul className="space-y-4 text-neutral-400 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/projects" className="hover:text-white transition-colors">Work</Link></li>
                            <li><a href="/#about" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-white text-sm font-medium mb-6">The Boring</h4>
                        <ul className="space-y-4 text-neutral-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-white text-sm font-medium mb-6">The Cool</h4>
                        <ul className="space-y-4 text-neutral-400 text-sm">
                            <li><a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a></li>
                            <li><a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                            <li><a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">Email</a></li>
                        </ul>
                    </div>
                </div>

                {/* Massive Footer Text */}
                <div className="border-t border-white/10 pt-8 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <h1 className="text-[14vw] leading-[0.8] font-bold tracking-tighter text-center text-white/5 select-none pointer-events-none translate-y-4">
                        EZEKIEL
                    </h1>
                    <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-neutral-500">
                        © {new Date().getFullYear()} Ezekiel Olanrewaju. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};
