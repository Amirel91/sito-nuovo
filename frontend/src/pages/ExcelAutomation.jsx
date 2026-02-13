import { motion } from 'framer-motion';
import { FileSpreadsheet, Code, BarChart3, Plug, GraduationCap, ArrowRight, Zap } from 'lucide-react';
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
        data-testid={`excel-feature-${index}`}
    >
        <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-sm flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
            <Icon className="w-6 h-6 text-orange-500" />
        </div>
        <h3 className="font-mono font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
);

// Use Case Card
const UseCaseCard = ({ title, items, index }) => (
    <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-slate-900/50 border border-slate-800 p-6"
        data-testid={`usecase-${index}`}
    >
        <h3 className="font-mono font-bold text-lg text-orange-500 mb-4">{title}</h3>
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <Zap className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    {item}
                </li>
            ))}
        </ul>
    </motion.div>
);

export default function ExcelAutomation() {
    const { t } = useI18n();

    const features = [
        {
            icon: Code,
            title: t('excelPage.services.vba.title'),
            description: t('excelPage.services.vba.description'),
        },
        {
            icon: BarChart3,
            title: t('excelPage.services.dashboard.title'),
            description: t('excelPage.services.dashboard.description'),
        },
        {
            icon: Plug,
            title: t('excelPage.services.integration.title'),
            description: t('excelPage.services.integration.description'),
        },
        {
            icon: GraduationCap,
            title: t('excelPage.services.training.title'),
            description: t('excelPage.services.training.description'),
        },
    ];

    const useCases = [
        {
            title: 'Gestione Magazzino',
            items: [
                'Tracciamento automatico scorte',
                'Alert riordino automatici',
                'Report inventario periodici',
                'Integrazione con barcode scanner'
            ]
        },
        {
            title: 'Fatturazione',
            items: [
                'Generazione automatica fatture',
                'Calcolo IVA e totali',
                'Export per commercialista',
                'Solleciti pagamento automatici'
            ]
        },
        {
            title: 'HR & Payroll',
            items: [
                'Calcolo presenze e straordinari',
                'Gestione ferie e permessi',
                'Report costi del personale',
                'Integrazione con sistemi paghe'
            ]
        },
        {
            title: 'Analisi Vendite',
            items: [
                'Dashboard KPI real-time',
                'Previsioni trend vendite',
                'Analisi margini prodotto',
                'Report performance agenti'
            ]
        },
    ];

    return (
        <div className="min-h-screen pt-20" data-testid="excel-automation-page">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-sm mb-6">
                            <FileSpreadsheet className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-400 text-sm font-mono uppercase tracking-wider">
                                VBA & Automation
                            </span>
                        </div>
                        <h1 className="font-mono font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            {t('excelPage.title')}
                        </h1>
                        <p className="text-xl text-orange-400 font-mono uppercase tracking-wider mb-4">
                            {t('excelPage.subtitle')}
                        </p>
                        <p className="text-slate-400 text-lg">
                            {t('excelPage.description')}
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

            {/* Hero Image */}
            <section className="py-16 md:py-24 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-6">
                                Automatizza i Processi Ripetitivi
                            </h2>
                            <p className="text-slate-400 text-lg mb-6">
                                Ogni azienda ha processi che consumano tempo prezioso. Con le automazioni Excel e VBA, 
                                trasformo ore di lavoro manuale in secondi di esecuzione automatica.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Riduzione errori umani fino al 99%',
                                    'Risparmio di ore di lavoro settimanali',
                                    'Report automatici e puntuali',
                                    'Integrazione con sistemi esistenti'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
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
                                    src="https://images.unsplash.com/photo-1770734360042-676ef707d022?w=800&h=500&fit=crop"
                                    alt="Excel Automation"
                                    className="relative w-full h-full object-cover rounded-sm"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-4">
                            Casi d'Uso
                        </h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {useCases.map((useCase, index) => (
                            <UseCaseCard key={index} {...useCase} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-slate-900/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-6">
                            Pronto a Ottimizzare il Tuo Business?
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Parliamo delle tue esigenze di automazione. La prima consulenza è gratuita.
                        </p>
                        <Button
                            asChild
                            className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold uppercase tracking-wider px-8 py-6 text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
                            data-testid="excel-cta-contact"
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
