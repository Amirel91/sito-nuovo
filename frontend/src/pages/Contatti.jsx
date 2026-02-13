import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

// Contact Info Card
const ContactCard = ({ icon: Icon, label, value, href }) => (
    <a 
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 hover:border-orange-500/30 transition-all group"
        data-testid={`contact-card-${label.toLowerCase().replace(/\s/g, '-')}`}
    >
        <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-sm flex items-center justify-center group-hover:bg-orange-500/20 transition-all">
            <Icon className="w-5 h-5 text-orange-500" />
        </div>
        <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">{label}</p>
            <p className="text-white font-medium">{value}</p>
        </div>
    </a>
);

export default function Contatti() {
    const { t } = useI18n();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://formspree.io/f/xdalaqjn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                setStatus('success');
                setFormState({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'aelmekauy@gmail.com',
            href: 'mailto:aelmekauy@gmail.com'
        },
        {
            icon: Phone,
            label: 'Telefono',
            value: '+39 347 8303184',
            href: 'tel:+393478303184'
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'Amir El Mekauy',
            href: 'https://linkedin.com/in/amir-elmekauy-54a68561'
        },
        {
            icon: MapPin,
            label: 'Zona',
            value: 'Italia',
            href: '#'
        }
    ];

    return (
        <div className="min-h-screen pt-20" data-testid="contatti-page">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-sm mb-6">
                            <Mail className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-400 text-sm font-mono uppercase tracking-wider">
                                Get in Touch
                            </span>
                        </div>
                        <h1 className="font-mono font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            {t('contact.title')}
                        </h1>
                        <p className="text-xl text-orange-400 font-mono uppercase tracking-wider mb-4">
                            {t('contact.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-12 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-slate-900/50 border border-slate-800 p-8">
                                <h2 className="font-mono font-bold text-2xl text-white mb-6">
                                    Invia un Messaggio
                                </h2>

                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                        <h3 className="font-mono font-bold text-xl text-white mb-2">
                                            {t('contact.success')}
                                        </h3>
                                        <p className="text-slate-400">
                                            Ti risponderò il prima possibile.
                                        </p>
                                        <Button
                                            onClick={() => setStatus('idle')}
                                            className="mt-6 bg-orange-500 hover:bg-orange-600 text-slate-950"
                                            data-testid="send-another-btn"
                                        >
                                            Invia un altro messaggio
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-sm"
                                            >
                                                <AlertCircle className="w-5 h-5" />
                                                <span className="text-sm">{t('contact.error')}</span>
                                            </motion.div>
                                        )}

                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-slate-300">
                                                {t('contact.name')}
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleChange}
                                                placeholder={t('contact.namePlaceholder')}
                                                required
                                                className="bg-slate-950 border-slate-700 focus:border-orange-500 text-white placeholder:text-slate-500"
                                                data-testid="contact-name-input"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-slate-300">
                                                {t('contact.email')}
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                placeholder={t('contact.emailPlaceholder')}
                                                required
                                                className="bg-slate-950 border-slate-700 focus:border-orange-500 text-white placeholder:text-slate-500"
                                                data-testid="contact-email-input"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-slate-300">
                                                {t('contact.message')}
                                            </Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formState.message}
                                                onChange={handleChange}
                                                placeholder={t('contact.messagePlaceholder')}
                                                required
                                                rows={6}
                                                className="bg-slate-950 border-slate-700 focus:border-orange-500 text-white placeholder:text-slate-500 resize-none"
                                                data-testid="contact-message-input"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold uppercase tracking-wider py-6 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all disabled:opacity-50"
                                            data-testid="contact-submit-btn"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <span className="animate-spin mr-2">⟳</span>
                                                    {t('contact.sending')}
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-2" />
                                                    {t('contact.send')}
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="font-mono font-bold text-2xl text-white mb-6">
                                Informazioni di Contatto
                            </h2>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <ContactCard key={index} {...info} />
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="bg-orange-500/10 border border-orange-500/30 p-6 mt-8">
                                <h3 className="font-mono font-bold text-lg text-white mb-3">
                                    Orari di Disponibilità
                                </h3>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li className="flex justify-between">
                                        <span>Lunedì - Venerdì</span>
                                        <span className="text-orange-400 font-mono">09:00 - 18:00</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Sabato</span>
                                        <span className="text-orange-400 font-mono">09:00 - 13:00</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Domenica</span>
                                        <span className="text-slate-500 font-mono">Chiuso</span>
                                    </li>
                                </ul>
                                <p className="text-slate-400 text-xs mt-4">
                                    Per urgenze, contattami via WhatsApp al numero indicato.
                                </p>
                            </div>

                            {/* Quick Response */}
                            <div className="bg-slate-900/50 border border-slate-800 p-6">
                                <h3 className="font-mono font-bold text-lg text-white mb-3">
                                    Tempo di Risposta
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    Rispondo generalmente entro <span className="text-orange-400 font-bold">24 ore</span> lavorative. 
                                    Per richieste urgenti, ti consiglio di chiamare direttamente.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
