import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Menu, X, ChevronUp, Globe, 
    Mail, Phone, Linkedin, Instagram, Facebook, 
    Box, FileSpreadsheet, Home, Wrench, ChevronRight
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { Button } from './ui/button';

// Navbar Component
export const Navbar = () => {
    const { t, language, toggleLanguage } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: t('nav.home'), icon: Home },
        { path: '/modellazione-3d', label: t('nav.modeling3d'), icon: Box },
        { path: '/excel-automation', label: t('nav.excelAutomation'), icon: FileSpreadsheet },
        { path: '/smart-home', label: t('nav.smartHome'), icon: Home },
        { path: '/tech-support', label: t('nav.techSupport'), icon: Wrench },
        { path: '/contatti', label: t('nav.contacts'), icon: Mail },
    ];

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800' 
                    : 'bg-transparent'
            }`}
            data-testid="navbar"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center gap-3 group"
                        data-testid="navbar-logo"
                    >
                        <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-shadow">
                            <Box className="w-6 h-6 text-slate-950" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-mono font-bold text-lg text-white tracking-tight">MECALAB</span>
                            <span className="block text-[10px] text-slate-400 uppercase tracking-widest -mt-1">L'Officina Digitale</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${
                                    location.pathname === link.path
                                        ? 'text-orange-500'
                                        : 'text-slate-300 hover:text-orange-400'
                                }`}
                                data-testid={`nav-link-${link.path.slice(1) || 'home'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Language Switcher & Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 text-slate-300 hover:text-orange-400 hover:bg-slate-800/50"
                            data-testid="language-switcher"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="font-mono text-xs uppercase">{language}</span>
                        </Button>

                        <button
                            className="lg:hidden p-2 text-slate-300 hover:text-orange-400"
                            onClick={() => setIsOpen(!isOpen)}
                            data-testid="mobile-menu-toggle"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-slate-950/95 backdrop-blur-md border-b border-slate-800"
                        data-testid="mobile-menu"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                                            location.pathname === link.path
                                                ? 'bg-orange-500/10 text-orange-500'
                                                : 'text-slate-300 hover:bg-slate-800/50 hover:text-orange-400'
                                        }`}
                                        data-testid={`mobile-nav-link-${link.path.slice(1) || 'home'}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// Breadcrumbs Component
export const Breadcrumbs = () => {
    const { t } = useI18n();
    const location = useLocation();
    
    if (location.pathname === '/') return null;

    const pathnames = location.pathname.split('/').filter(x => x);
    
    const getLabel = (path) => {
        const labels = {
            'modellazione-3d': t('nav.modeling3d'),
            'excel-automation': t('nav.excelAutomation'),
            'smart-home': t('nav.smartHome'),
            'tech-support': t('nav.techSupport'),
            'contatti': t('nav.contacts'),
        };
        return labels[path] || path;
    };

    return (
        <nav className="pt-24 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-testid="breadcrumbs">
            <ol className="flex items-center gap-2 text-sm">
                <li>
                    <Link 
                        to="/" 
                        className="text-slate-400 hover:text-orange-400 transition-colors"
                        data-testid="breadcrumb-home"
                    >
                        {t('nav.home')}
                    </Link>
                </li>
                {pathnames.map((path, index) => (
                    <li key={path} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                        {index === pathnames.length - 1 ? (
                            <span className="text-orange-500 font-medium">{getLabel(path)}</span>
                        ) : (
                            <Link 
                                to={`/${pathnames.slice(0, index + 1).join('/')}`}
                                className="text-slate-400 hover:text-orange-400 transition-colors"
                            >
                                {getLabel(path)}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

// Back to Top Button
export const BackToTop = () => {
    const { t } = useI18n();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-40 p-3 bg-orange-500 hover:bg-orange-600 text-slate-950 rounded-sm shadow-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
                    title={t('common.backToTop')}
                    data-testid="back-to-top"
                >
                    <ChevronUp className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

// Footer Component
export const Footer = () => {
    const { t } = useI18n();

    const quickLinks = [
        { path: '/modellazione-3d', label: t('nav.modeling3d') },
        { path: '/excel-automation', label: t('nav.excelAutomation') },
        { path: '/smart-home', label: t('nav.smartHome') },
        { path: '/tech-support', label: t('nav.techSupport') },
    ];

    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Linkedin, href: 'https://linkedin.com/in/amir-elmekauy-54a68561', label: 'LinkedIn' },
    ];

    return (
        <footer className="bg-slate-950 border-t border-slate-800" data-testid="footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-orange-500 rounded-sm flex items-center justify-center">
                                <Box className="w-6 h-6 text-slate-950" />
                            </div>
                            <div>
                                <span className="font-mono font-bold text-lg text-white tracking-tight">MECALAB</span>
                                <span className="block text-[10px] text-slate-400 uppercase tracking-widest -mt-1">L'Officina Digitale</span>
                            </div>
                        </Link>
                        <p className="text-slate-400 text-sm mb-6 max-w-md">
                            Amir El Mekauy - {t('footer.tagline')}. {t('about.bio').substring(0, 150)}...
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-slate-800/50 hover:bg-orange-500/20 border border-slate-700 hover:border-orange-500/50 rounded-sm text-slate-400 hover:text-orange-400 transition-all"
                                        data-testid={`social-${social.label.toLowerCase()}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-slate-800/50 hover:bg-orange-500/20 border border-slate-700 hover:border-orange-500/50 rounded-sm text-slate-400 hover:text-orange-400 transition-all"
                                data-testid="social-tiktok"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-mono font-semibold text-white uppercase tracking-wider text-sm mb-4">
                            {t('footer.quickLinks')}
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                                        data-testid={`footer-link-${link.path.slice(1)}`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-mono font-semibold text-white uppercase tracking-wider text-sm mb-4">
                            {t('footer.contactInfo')}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a 
                                    href="mailto:aelmekauy@gmail.com" 
                                    className="flex items-center gap-2 text-slate-400 hover:text-orange-400 text-sm transition-colors"
                                    data-testid="footer-email"
                                >
                                    <Mail className="w-4 h-4" />
                                    aelmekauy@gmail.com
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="tel:+393478303184" 
                                    className="flex items-center gap-2 text-slate-400 hover:text-orange-400 text-sm transition-colors"
                                    data-testid="footer-phone"
                                >
                                    <Phone className="w-4 h-4" />
                                    +39 347 8303184
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://linkedin.com/in/amir-elmekauy-54a68561" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-slate-400 hover:text-orange-400 text-sm transition-colors"
                                    data-testid="footer-linkedin"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <p className="text-center text-slate-500 text-sm">
                        © {new Date().getFullYear()} MecaLab - L'Officina Digitale. {t('footer.rights')}.
                    </p>
                </div>
            </div>
        </footer>
    );
};

// Main Layout Component
export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {/* Grid Background */}
            <div className="fixed inset-0 grid-background grid-background-fade pointer-events-none" />
            
            {/* Orange Glow Effect */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
            
            <Navbar />
            <Breadcrumbs />
            <main className="relative z-10">
                {children}
            </main>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default Layout;
