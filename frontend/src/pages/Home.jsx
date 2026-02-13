import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Box, FileSpreadsheet, Home as HomeIcon, Wrench, 
    ArrowRight, Cpu, Zap, Shield, ChevronRight 
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { Button } from '../components/ui/button';
import { Hero3D } from '../components/Hero3D';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, link, index, featured = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative overflow-hidden ${
                featured 
                    ? 'md:col-span-2 md:row-span-2' 
                    : ''
            }`}
        >
            <Link 
                to={link}
                className={`block h-full bg-slate-900/50 border border-slate-800 hover:border-orange-500/30 transition-all duration-300 ${
                    featured ? 'p-8 md:p-12' : 'p-6'
                }`}
                data-testid={`service-card-${link.slice(1)}`}
            >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500" />
                
                <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`${featured ? 'w-16 h-16' : 'w-12 h-12'} bg-orange-500/10 border border-orange-500/30 rounded-sm flex items-center justify-center mb-6 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all`}>
                        <Icon className={`${featured ? 'w-8 h-8' : 'w-6 h-6'} text-orange-500`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className={`font-mono font-bold text-white mb-3 ${featured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                        {title}
                    </h3>
                    <p className={`text-slate-400 flex-grow ${featured ? 'text-base md:text-lg' : 'text-sm'}`}>
                        {description}
                    </p>
                    
                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-orange-500 mt-6 group-hover:gap-3 transition-all">
                        <span className="text-sm font-medium uppercase tracking-wider">
                            {featured ? 'Esplora' : ''}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default function Home() {
    const { t } = useI18n();

    const services = [
        {
            icon: Box,
            title: t('services.modeling3d.title'),
            description: t('services.modeling3d.description'),
            link: '/modellazione-3d',
            featured: true
        },
        {
            icon: FileSpreadsheet,
            title: t('services.excel.title'),
            description: t('services.excel.description'),
            link: '/excel-automation'
        },
        {
            icon: HomeIcon,
            title: t('services.smartHome.title'),
            description: t('services.smartHome.description'),
            link: '/smart-home'
        },
        {
            icon: Wrench,
            title: t('services.techSupport.title'),
            description: t('services.techSupport.description'),
            link: '/tech-support'
        },
    ];

    return (
        <div className="min-h-screen" data-testid="home-page">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* 3D Background */}
                <Hero3D />
                
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-sm mb-8">
                            <Cpu className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-400 text-sm font-mono uppercase tracking-wider">
                                AI-Powered Solutions
                            </span>
                        </div>
                        
                        {/* Title */}
                        <h1 className="font-mono font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter mb-6">
                            <span className="text-orange-500">MECA</span>LAB
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-light mb-4">
                            {t('hero.title')}
                        </p>
                        <p className="text-lg text-orange-400 font-mono uppercase tracking-widest mb-8">
                            {t('hero.subtitle')}
                        </p>
                        
                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-12">
                            {t('hero.description')}
                        </p>
                        
                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold uppercase tracking-wider px-8 py-6 text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
                                data-testid="hero-cta-services"
                            >
                                <Link to="/modellazione-3d">
                                    {t('hero.cta')}
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-slate-700 hover:border-orange-500/50 hover:text-orange-400 text-slate-300 font-bold uppercase tracking-wider px-8 py-6 text-lg transition-all"
                                data-testid="hero-cta-contact"
                            >
                                <Link to="/contatti">
                                    {t('hero.ctaContact')}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-2 bg-orange-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Services Section */}
            <section className="py-24 md:py-32" data-testid="services-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-mono font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
                            {t('services.subtitle')}
                        </h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto" />
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                        {services.map((service, index) => (
                            <ServiceCard key={service.link} {...service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 md:py-32 bg-slate-900/30" data-testid="about-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-orange-500/20 rounded-sm transform rotate-3" />
                                <img
                                    src="https://images.unsplash.com/photo-1627890458144-4c0c481bf4b8?w=600&h=600&fit=crop"
                                    alt="Amir El Mekauy"
                                    className="relative w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Decorative elements */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-orange-500/50 rounded-sm" />
                                <div className="absolute -top-4 -left-4 w-16 h-16 bg-orange-500/10 rounded-sm" />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-mono font-bold text-3xl md:text-4xl text-white mb-2">
                                {t('about.title')}
                            </h2>
                            <p className="text-orange-500 font-mono uppercase tracking-wider text-sm mb-6">
                                {t('about.name')} - {t('about.role')}
                            </p>
                            <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                {t('about.bio')}
                            </p>
                            
                            {/* AI Note */}
                            <div className="flex items-start gap-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-sm">
                                <Zap className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                <p className="text-slate-300 text-sm">
                                    {t('about.aiNote')}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {[
                                    { icon: Cpu, label: 'AI Integration' },
                                    { icon: Shield, label: 'Privacy First' },
                                    { icon: Zap, label: 'Fast Delivery' },
                                    { icon: Box, label: 'Custom Solutions' },
                                ].map((feature) => (
                                    <div key={feature.label} className="flex items-center gap-3">
                                        <feature.icon className="w-5 h-5 text-orange-500" />
                                        <span className="text-slate-400 text-sm">{feature.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono font-bold text-3xl md:text-5xl text-white mb-6">
                            {t('contact.subtitle')}
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                            {t('hero.description')}
                        </p>
                        <Button
                            asChild
                            className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold uppercase tracking-wider px-10 py-6 text-lg hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all"
                            data-testid="cta-contact"
                        >
                            <Link to="/contatti">
                                {t('hero.ctaContact')}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
