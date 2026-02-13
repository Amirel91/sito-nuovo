import { motion } from 'framer-motion';
import { Box, Layers, Printer, Clock, ArrowRight } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { STLViewer } from '../components/STLViewer';
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
        data-testid={`feature-card-${index}`}
    >
        <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-sm flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-all">
            <Icon className="w-6 h-6 text-orange-500" />
        </div>
        <h3 className="font-mono font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </motion.div>
);

export default function Modellazione3D() {
    const { t } = useI18n();

    const features = [
        {
            icon: Box,
            title: t('modeling3dPage.services.cad.title'),
            description: t('modeling3dPage.services.cad.description'),
        },
        {
            icon: Printer,
            title: t('modeling3dPage.services.printing.title'),
            description: t('modeling3dPage.services.printing.description'),
        },
        {
            icon: Clock,
            title: t('modeling3dPage.services.prototyping.title'),
            description: t('modeling3dPage.services.prototyping.description'),
        },
    ];

    return (
        <div className="min-h-screen pt-20" data-testid="modeling-3d-page">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-sm mb-6">
                            <Box className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-400 text-sm font-mono uppercase tracking-wider">
                                CAD & 3D Print
                            </span>
                        </div>
                        <h1 className="font-mono font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
                            {t('modeling3dPage.title')}
                        </h1>
                        <p className="text-xl text-orange-400 font-mono uppercase tracking-wider mb-4">
                            {t('modeling3dPage.subtitle')}
                        </p>
                        <p className="text-slate-400 text-lg">
                            {t('modeling3dPage.description')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* STL Viewer Section */}
            <section className="py-16 md:py-24 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-4">
                            {t('modeling3dPage.stlViewer.title')}
                        </h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto" />
                    </motion.div>

                    <STLViewer />
                </div>
            </section>

            {/* Materials Info */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-mono font-bold text-2xl md:text-4xl text-white mb-4">
                            Materiali Disponibili
                        </h2>
                        <div className="w-16 h-1 bg-orange-500 mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: t('modeling3dPage.materials.pla'), color: '#22c55e', price: '€0.05/cm³', desc: 'Biodegradabile, facile da stampare' },
                            { name: t('modeling3dPage.materials.petg'), color: '#3b82f6', price: '€0.08/cm³', desc: 'Resistente, flessibile, durevole' },
                            { name: t('modeling3dPage.materials.abs'), color: '#ef4444', price: '€0.10/cm³', desc: 'Alta resistenza termica' },
                            { name: t('modeling3dPage.materials.carbonFiber'), color: '#1f2937', price: '€0.35/cm³', desc: 'Ultra resistente e leggero' },
                        ].map((material, index) => (
                            <motion.div
                                key={material.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-900/50 border border-slate-800 p-6 hover:border-orange-500/30 transition-all"
                                data-testid={`material-info-${index}`}
                            >
                                <div 
                                    className="w-12 h-12 rounded-sm mb-4"
                                    style={{ backgroundColor: material.color }}
                                />
                                <h3 className="font-mono font-bold text-white mb-1">{material.name}</h3>
                                <p className="text-orange-500 font-mono text-sm mb-2">{material.price}</p>
                                <p className="text-slate-400 text-sm">{material.desc}</p>
                            </motion.div>
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
                            Hai un progetto in mente?
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Contattami per discutere le tue esigenze di modellazione 3D e stampa.
                        </p>
                        <Button
                            asChild
                            className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold uppercase tracking-wider px-8 py-6 text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
                            data-testid="modeling-cta-contact"
                        >
                            <Link to="/contatti">
                                Richiedi Preventivo
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
