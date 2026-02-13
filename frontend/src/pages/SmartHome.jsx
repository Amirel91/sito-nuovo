import { motion } from 'framer-motion';
import { Home, Server, Workflow, Shield, Plug, ArrowRight, Lightbulb, Thermometer, Lock, Wifi } from 'lucide-react';
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
        data-testid={`smarthome-feature-${index}`}
    >
        <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-sm flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
            <Icon className="w-6 h-6 text-orange-500" />
        </div>
        <h3 className="font-mono font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
);

// Dashboard Preview Card
const DashboardCard = ({ icon: Icon, label, value, status }) => (
    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-sm">
        <div className="flex items-center justify-between mb-2">
            <Icon className="w-5 h-5 text-orange-500" />
            <span className={`text-xs px-2 py-1 rounded-full ${
                status === 'on' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/50 text-slate-400'
            }`}>
                {status}
            </span>
        </div>
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        <p className="text-white font-mono font-bold">{value}</p>
    </div>
);

export default function SmartHome() {
    const { t } = useI18n();

    const features = [
        {
            icon: Server,
            title: t('smartHomePage.services.homeAssistant.title'),
            description: t('smartHomePage.services.homeAssistant.description'),
        },
        {
            icon: Workflow,
            title: t('smartHomePage.services.automation.title'),
            description: t('smartHomePage.services.automation.description'),
        },
        {
            icon: Shield,
            title: t('smartHomePage.services.privacy.title'),
            description: t('smartHomePage.services.privacy.description'),
        },
        {
            icon: Plug,
            title: t('smartHomePage.services.integration.title'),
            description: t('smartHomePage.services.integration.description'),
        },
    ];

    const compatibleDevices = [
        'Philips Hue', 'IKEA Tradfri', 'Shelly', 'Sonoff',
        'Xiaomi Mi Home', 'TP-Link', 'Tuya', 'Zigbee2MQTT',
        'Z-Wave', 'ESPHome', 'Tasmota', 'Google Home'
    ];

    return (
        <div className="min-h-screen pt-20" data-testid="smart-home-page">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-sm mb-6">
                            <Home className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-400 text-sm font-mono uppercase tracking-wider">
                                Home Assistant
                            </span>
                        </div>
                        <h1 className="font-mono font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            {t('smartHomePage.title')}
                        </h1>
                        <p className="text-xl text-orange-400 font-mono uppercase tracking-wider mb-4">
                            {t('smartHomePage.subtitle')}
                        </p>
                        <p className="text-slate-400 text-lg">
                            {t('smartHomePage.description')}
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

            {/* Dashboard Preview */}
            <section className="py-16 md:py-24 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-6">
                                Dashboard Stile Home Assistant
                            </h2>
                            <p className="text-slate-400 text-lg mb-6">
                                Creo dashboard personalizzate che ti permettono di controllare ogni aspetto della tua casa 
                                da un'unica interfaccia. Design intuitivo, responsive e completamente customizzabile.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Controllo completo da smartphone',
                                    'Automazioni basate su condizioni',
                                    'Notifiche push personalizzate',
                                    'Statistiche consumo energetico'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        
                        {/* Mock Dashboard */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-950 border border-slate-800 rounded-sm p-6"
                            data-testid="dashboard-preview"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-mono font-bold text-white">Casa Mia</h3>
                                <span className="text-xs text-slate-400">Home Assistant</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <DashboardCard icon={Lightbulb} label="Soggiorno" value="75%" status="on" />
                                <DashboardCard icon={Thermometer} label="Temperatura" value="22.5°C" status="on" />
                                <DashboardCard icon={Lock} label="Porta Ingresso" value="Chiusa" status="off" />
                                <DashboardCard icon={Wifi} label="Dispositivi" value="12 Online" status="on" />
                            </div>
                            <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-sm">
                                <p className="text-xs text-slate-400 mb-2">Ultima automazione</p>
                                <p className="text-sm text-white">Luci spente automaticamente alle 23:30</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Compatible Devices */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-4">
                            Dispositivi Compatibili
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Home Assistant supporta centinaia di integrazioni. Ecco alcuni dei brand più popolari.
                        </p>
                        <div className="w-16 h-1 bg-orange-500 mx-auto mt-4" />
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {compatibleDevices.map((device, index) => (
                            <motion.div
                                key={device}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="px-4 py-2 bg-slate-900/50 border border-slate-800 hover:border-orange-500/30 rounded-sm text-slate-300 text-sm transition-all"
                            >
                                {device}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Privacy Section */}
            <section className="py-16 md:py-24 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-video">
                                <div className="absolute inset-0 bg-orange-500/10 rounded-sm transform rotate-2" />
                                <img
                                    src="https://images.unsplash.com/photo-1655298801080-0bfffe5d8db3?w=800&h=500&fit=crop"
                                    alt="Smart Home Privacy"
                                    className="relative w-full h-full object-cover rounded-sm"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-sm mb-4">
                                <Shield className="w-4 h-4 text-green-500" />
                                <span className="text-green-400 text-xs font-mono uppercase">Privacy First</span>
                            </div>
                            <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-6">
                                I Tuoi Dati Restano a Casa Tua
                            </h2>
                            <p className="text-slate-400 text-lg mb-6">
                                A differenza di molte soluzioni cloud-based, Home Assistant funziona completamente in locale. 
                                Nessun dato lascia la tua rete domestica.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Nessuna dipendenza da server esterni',
                                    'Funziona anche senza internet',
                                    'Controllo totale sui tuoi dati',
                                    'Nessun abbonamento mensile'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-slate-300">
                                        <Shield className="w-4 h-4 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
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
                            Rendi la Tua Casa Intelligente
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Contattami per una consulenza gratuita sul progetto domotico della tua casa.
                        </p>
                        <Button
                            asChild
                            className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold uppercase tracking-wider px-8 py-6 text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
                            data-testid="smarthome-cta-contact"
                        >
                            <Link to="/contatti">
                                Richiedi Consulenza
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
