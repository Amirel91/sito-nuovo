import { motion } from 'framer-motion';
import { Wrench, Monitor, Smartphone, Zap, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

// Service Feature Card
const FeatureCard = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-slate-900/50 border border-slate-800 hover:border-orange-500/30 p-6 transition-all group"
        data-testid={`techsupport-feature-${index}`}
    >
        <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-sm flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
            <Icon className="w-6 h-6 text-orange-500" />
        </div>
        <h3 className="font-mono font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
);

// Service Item
const ServiceItem = ({ title, items, price }) => (
    <div className="bg-slate-900/50 border border-slate-800 p-6 hover:border-orange-500/30 transition-all">
        <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono font-bold text-lg text-white">{title}</h3>
            <span className="text-orange-500 font-mono font-bold">{price}</span>
        </div>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default function TechSupport() {
    const { t } = useI18n();

    const features = [
        {
            icon: Monitor,
            title: t('techSupportPage.services.pcRepair.title'),
            description: t('techSupportPage.services.pcRepair.description'),
        },
        {
            icon: Smartphone,
            title: t('techSupportPage.services.smartphone.title'),
            description: t('techSupportPage.services.smartphone.description'),
        },
        {
            icon: Zap,
            title: t('techSupportPage.services.optimization.title'),
            description: t('techSupportPage.services.optimization.description'),
        },
        {
            icon: MessageSquare,
            title: t('techSupportPage.services.consulting.title'),
            description: t('techSupportPage.services.consulting.description'),
        },
    ];

    const services = [
        {
            title: 'Diagnosi PC',
            price: 'Da €30',
            items: [
                'Analisi hardware completa',
                'Test componenti',
                'Report dettagliato',
                'Preventivo riparazione'
            ]
        },
        {
            title: 'Sostituzione Schermo',
            price: 'Da €80',
            items: [
                'Smartphone e tablet',
                'Ricambi originali/compatibili',
                'Garanzia 6 mesi',
                'Riparazione in giornata'
            ]
        },
        {
            title: 'Pulizia & Ottimizzazione',
            price: 'Da €40',
            items: [
                'Rimozione malware/virus',
                'Pulizia file temporanei',
                'Ottimizzazione avvio',
                'Aggiornamento driver'
            ]
        },
        {
            title: 'Upgrade Hardware',
            price: 'Da €50',
            items: [
                'Upgrade RAM e SSD',
                'Sostituzione batteria',
                'Pulizia termica',
                'Consulenza componenti'
            ]
        },
    ];

    return (
        <div className="min-h-screen pt-20" data-testid="tech-support-page">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-sm mb-6">
                            <Wrench className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-400 text-sm font-mono uppercase tracking-wider">
                                Repair & Support
                            </span>
                        </div>
                        <h1 className="font-mono font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            {t('techSupportPage.title')}
                        </h1>
                        <p className="text-xl text-orange-400 font-mono uppercase tracking-wider mb-4">
                            {t('techSupportPage.subtitle')}
                        </p>
                        <p className="text-slate-400 text-lg">
                            {t('techSupportPage.description')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Services & Pricing */}
            <section className="py-16 md:py-24 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-4">
                            Servizi & Prezzi
                        </h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ServiceItem {...service} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-6">
                                Assistenza Professionale
                            </h2>
                            <p className="text-slate-400 text-lg mb-6">
                                Con anni di esperienza nel settore, offro un servizio di assistenza tecnica completo 
                                e professionale. Dalla diagnosi alla riparazione, ogni intervento è eseguito con 
                                la massima cura e attenzione.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Preventivi gratuiti e trasparenti',
                                    'Riparazioni rapide in giornata',
                                    'Garanzia su tutti gli interventi',
                                    'Supporto post-vendita incluso'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-orange-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-video">
                                <div className="absolute inset-0 bg-orange-500/10 rounded-sm transform -rotate-2" />
                                <img
                                    src="https://images.unsplash.com/photo-1579803270143-4742a2897a1d?w=800&h=500&fit=crop"
                                    alt="Tech Support"
                                    className="relative w-full h-full object-cover rounded-sm"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 md:py-24 bg-slate-900/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-4">
                            Domande Frequenti
                        </h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto" />
                    </motion.div>

                    <div className="space-y-4">
                        {[
                            {
                                q: 'Quanto tempo richiede una riparazione?',
                                a: 'La maggior parte delle riparazioni viene completata in giornata. Per interventi più complessi, solitamente entro 2-3 giorni lavorativi.'
                            },
                            {
                                q: 'Offrite garanzia sulle riparazioni?',
                                a: 'Sì, tutti gli interventi sono coperti da garanzia di 6 mesi sui ricambi e 3 mesi sulla manodopera.'
                            },
                            {
                                q: 'Posso ottenere un preventivo gratuito?',
                                a: 'Certamente! La diagnosi e il preventivo sono sempre gratuiti e senza impegno.'
                            },
                            {
                                q: 'Riparate anche dispositivi fuori garanzia?',
                                a: 'Sì, ripariamo qualsiasi dispositivo indipendentemente dalla garanzia del produttore.'
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-900/50 border border-slate-800 p-6"
                            >
                                <h3 className="font-mono font-bold text-white mb-2">{faq.q}</h3>
                                <p className="text-slate-400 text-sm">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-6">
                            Hai un Problema Tecnico?
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Contattami per una diagnosi gratuita del tuo dispositivo.
                        </p>
                        <Button
                            asChild
                            className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold uppercase tracking-wider px-8 py-6 text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
                            data-testid="techsupport-cta-contact"
                        >
                            <Link to="/contatti">
                                Richiedi Assistenza
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
