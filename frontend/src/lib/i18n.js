import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
    it: {
        // Navbar
        nav: {
            home: 'Home',
            modeling3d: 'Modellazione 3D',
            excelAutomation: 'Excel & Automazione',
            smartHome: 'Smart Home',
            techSupport: 'Assistenza Tech',
            contacts: 'Contatti',
        },
        // Hero
        hero: {
            title: "L'Officina Digitale",
            subtitle: 'Artigiano Tecnologico & Problem Solver',
            description: 'Soluzioni pratiche per automazione, modellazione 3D, domotica e riparazioni. Ottimizzazione dei flussi di lavoro con intelligenza artificiale.',
            cta: 'Scopri i Servizi',
            ctaContact: 'Contattami',
        },
        // Services
        services: {
            title: 'Servizi',
            subtitle: 'Cosa Posso Fare Per Te',
            modeling3d: {
                title: 'Modellazione 3D',
                description: 'Progettazione CAD, prototipazione rapida e stampa 3D professionale con preventivi istantanei.',
            },
            excel: {
                title: 'Excel & VBA',
                description: 'Automazione processi aziendali, macro personalizzate e gestionali su misura.',
            },
            smartHome: {
                title: 'Smart Home',
                description: 'Soluzioni domotiche basate su Home Assistant con focus su privacy e controllo locale.',
            },
            techSupport: {
                title: 'Assistenza Tech',
                description: 'Riparazioni PC e smartphone, consulenza hardware e ottimizzazione sistemi.',
            },
        },
        // About
        about: {
            title: 'Chi Sono',
            name: 'Amir El Mekauy',
            role: 'Artigiano Tecnologico',
            bio: 'Sono un problem solver con passione per la tecnologia pratica. Combino competenze tradizionali con strumenti moderni, inclusa l\'intelligenza artificiale, per creare soluzioni efficienti e personalizzate.',
            aiNote: 'L\'IA è il mio strumento core per ottimizzare i flussi di lavoro e accelerare la prototipazione.',
        },
        // Contact
        contact: {
            title: 'Contattami',
            subtitle: 'Parliamo del Tuo Progetto',
            name: 'Nome',
            email: 'Email',
            message: 'Messaggio',
            send: 'Invia Messaggio',
            sending: 'Invio in corso...',
            success: 'Messaggio inviato con successo!',
            error: 'Errore nell\'invio. Riprova.',
            namePlaceholder: 'Il tuo nome',
            emailPlaceholder: 'la.tua@email.com',
            messagePlaceholder: 'Descrivi il tuo progetto o la tua richiesta...',
        },
        // 3D Modeling Page
        modeling3dPage: {
            title: 'Modellazione 3D & Stampa',
            subtitle: 'Dal Concept al Prototipo',
            description: 'Servizi completi di progettazione CAD e stampa 3D. Carica il tuo file STL per ottenere un preventivo istantaneo basato su volume e materiale.',
            services: {
                cad: {
                    title: 'Progettazione CAD',
                    description: 'Modellazione 3D professionale per parti meccaniche, involucri e prototipi.',
                },
                printing: {
                    title: 'Stampa 3D',
                    description: 'Stampa FDM con materiali di alta qualità: PLA, PETG, ABS e Carbon Fiber.',
                },
                prototyping: {
                    title: 'Prototipazione',
                    description: 'Dalla progettazione al prodotto finito in tempi rapidi.',
                },
            },
            stlViewer: {
                title: 'Visualizzatore STL',
                upload: 'Carica File STL',
                uploadDescription: 'Trascina o clicca per caricare il tuo file .stl',
                volume: 'Volume',
                dimensions: 'Dimensioni',
                material: 'Materiale',
                estimatedCost: 'Costo Stimato',
                requestQuote: 'Richiedi Preventivo',
                noFile: 'Nessun file caricato',
            },
            materials: {
                pla: 'PLA Standard',
                petg: 'PETG Resistente',
                abs: 'ABS Tecnico',
                carbonFiber: 'Fibra di Carbonio',
            },
        },
        // Excel Automation Page
        excelPage: {
            title: 'Excel & Automazione',
            subtitle: 'Efficienza per il Tuo Business',
            description: 'Trasforma i tuoi processi aziendali con automazioni intelligenti. Macro VBA personalizzate, dashboard interattive e gestionali su misura.',
            services: {
                vba: {
                    title: 'Programmazione VBA',
                    description: 'Macro e script personalizzati per automatizzare operazioni ripetitive.',
                },
                dashboard: {
                    title: 'Dashboard & Report',
                    description: 'Visualizzazioni interattive e report automatizzati per decisioni data-driven.',
                },
                integration: {
                    title: 'Integrazione Sistemi',
                    description: 'Collegamento tra Excel, database e altre applicazioni aziendali.',
                },
                training: {
                    title: 'Formazione',
                    description: 'Training personalizzato per rendere il tuo team autonomo.',
                },
            },
        },
        // Smart Home Page
        smartHomePage: {
            title: 'Smart Home',
            subtitle: 'Domotica con Privacy',
            description: 'Soluzioni domotiche basate su Home Assistant. Controllo totale della tua casa con focus su privacy e elaborazione locale dei dati.',
            services: {
                homeAssistant: {
                    title: 'Home Assistant',
                    description: 'Installazione e configurazione della piattaforma domotica open-source più avanzata.',
                },
                automation: {
                    title: 'Automazioni',
                    description: 'Scenari intelligenti per illuminazione, climatizzazione, sicurezza e molto altro.',
                },
                privacy: {
                    title: 'Privacy Locale',
                    description: 'I tuoi dati restano a casa tua. Nessun cloud esterno necessario.',
                },
                integration: {
                    title: 'Integrazione Dispositivi',
                    description: 'Compatibilità con Zigbee, Z-Wave, WiFi e centinaia di dispositivi.',
                },
            },
        },
        // Tech Support Page
        techSupportPage: {
            title: 'Assistenza Tech',
            subtitle: 'Riparazioni & Consulenza',
            description: 'Supporto tecnico professionale per PC, smartphone e dispositivi. Riparazioni hardware, ottimizzazione software e consulenza personalizzata.',
            services: {
                pcRepair: {
                    title: 'Riparazione PC',
                    description: 'Diagnosi e riparazione hardware, upgrade componenti e recupero dati.',
                },
                smartphone: {
                    title: 'Smartphone',
                    description: 'Sostituzione schermi, batterie e riparazioni software.',
                },
                optimization: {
                    title: 'Ottimizzazione',
                    description: 'Pulizia software, rimozione malware e velocizzazione sistemi.',
                },
                consulting: {
                    title: 'Consulenza',
                    description: 'Consigli su acquisti, configurazioni e soluzioni personalizzate.',
                },
            },
        },
        // Footer
        footer: {
            tagline: 'Artigiano Tecnologico',
            rights: 'Tutti i diritti riservati',
            quickLinks: 'Link Rapidi',
            contactInfo: 'Contatti',
        },
        // Common
        common: {
            learnMore: 'Scopri di più',
            backToTop: 'Torna su',
            loading: 'Caricamento...',
        },
    },
    en: {
        // Navbar
        nav: {
            home: 'Home',
            modeling3d: '3D Modeling',
            excelAutomation: 'Excel & Automation',
            smartHome: 'Smart Home',
            techSupport: 'Tech Support',
            contacts: 'Contacts',
        },
        // Hero
        hero: {
            title: 'The Digital Workshop',
            subtitle: 'Tech Artisan & Problem Solver',
            description: 'Practical solutions for automation, 3D modeling, home automation and repairs. Workflow optimization with artificial intelligence.',
            cta: 'Discover Services',
            ctaContact: 'Contact Me',
        },
        // Services
        services: {
            title: 'Services',
            subtitle: 'What I Can Do For You',
            modeling3d: {
                title: '3D Modeling',
                description: 'CAD design, rapid prototyping and professional 3D printing with instant quotes.',
            },
            excel: {
                title: 'Excel & VBA',
                description: 'Business process automation, custom macros and tailored management systems.',
            },
            smartHome: {
                title: 'Smart Home',
                description: 'Home automation solutions based on Home Assistant with focus on privacy and local control.',
            },
            techSupport: {
                title: 'Tech Support',
                description: 'PC and smartphone repairs, hardware consulting and system optimization.',
            },
        },
        // About
        about: {
            title: 'About Me',
            name: 'Amir El Mekauy',
            role: 'Tech Artisan',
            bio: 'I am a problem solver with a passion for practical technology. I combine traditional skills with modern tools, including artificial intelligence, to create efficient and customized solutions.',
            aiNote: 'AI is my core tool for optimizing workflows and accelerating prototyping.',
        },
        // Contact
        contact: {
            title: 'Contact Me',
            subtitle: "Let's Talk About Your Project",
            name: 'Name',
            email: 'Email',
            message: 'Message',
            send: 'Send Message',
            sending: 'Sending...',
            success: 'Message sent successfully!',
            error: 'Error sending. Please try again.',
            namePlaceholder: 'Your name',
            emailPlaceholder: 'your@email.com',
            messagePlaceholder: 'Describe your project or request...',
        },
        // 3D Modeling Page
        modeling3dPage: {
            title: '3D Modeling & Printing',
            subtitle: 'From Concept to Prototype',
            description: 'Complete CAD design and 3D printing services. Upload your STL file to get an instant quote based on volume and material.',
            services: {
                cad: {
                    title: 'CAD Design',
                    description: 'Professional 3D modeling for mechanical parts, enclosures and prototypes.',
                },
                printing: {
                    title: '3D Printing',
                    description: 'FDM printing with high quality materials: PLA, PETG, ABS and Carbon Fiber.',
                },
                prototyping: {
                    title: 'Prototyping',
                    description: 'From design to finished product in quick turnaround times.',
                },
            },
            stlViewer: {
                title: 'STL Viewer',
                upload: 'Upload STL File',
                uploadDescription: 'Drag or click to upload your .stl file',
                volume: 'Volume',
                dimensions: 'Dimensions',
                material: 'Material',
                estimatedCost: 'Estimated Cost',
                requestQuote: 'Request Quote',
                noFile: 'No file uploaded',
            },
            materials: {
                pla: 'Standard PLA',
                petg: 'Resistant PETG',
                abs: 'Technical ABS',
                carbonFiber: 'Carbon Fiber',
            },
        },
        // Excel Automation Page
        excelPage: {
            title: 'Excel & Automation',
            subtitle: 'Efficiency for Your Business',
            description: 'Transform your business processes with intelligent automation. Custom VBA macros, interactive dashboards and tailored management systems.',
            services: {
                vba: {
                    title: 'VBA Programming',
                    description: 'Custom macros and scripts to automate repetitive operations.',
                },
                dashboard: {
                    title: 'Dashboard & Reports',
                    description: 'Interactive visualizations and automated reports for data-driven decisions.',
                },
                integration: {
                    title: 'System Integration',
                    description: 'Connection between Excel, databases and other business applications.',
                },
                training: {
                    title: 'Training',
                    description: 'Personalized training to make your team autonomous.',
                },
            },
        },
        // Smart Home Page
        smartHomePage: {
            title: 'Smart Home',
            subtitle: 'Home Automation with Privacy',
            description: 'Home automation solutions based on Home Assistant. Total control of your home with focus on privacy and local data processing.',
            services: {
                homeAssistant: {
                    title: 'Home Assistant',
                    description: 'Installation and configuration of the most advanced open-source home automation platform.',
                },
                automation: {
                    title: 'Automations',
                    description: 'Smart scenarios for lighting, climate control, security and much more.',
                },
                privacy: {
                    title: 'Local Privacy',
                    description: 'Your data stays at home. No external cloud needed.',
                },
                integration: {
                    title: 'Device Integration',
                    description: 'Compatibility with Zigbee, Z-Wave, WiFi and hundreds of devices.',
                },
            },
        },
        // Tech Support Page
        techSupportPage: {
            title: 'Tech Support',
            subtitle: 'Repairs & Consulting',
            description: 'Professional technical support for PCs, smartphones and devices. Hardware repairs, software optimization and personalized consulting.',
            services: {
                pcRepair: {
                    title: 'PC Repair',
                    description: 'Hardware diagnosis and repair, component upgrades and data recovery.',
                },
                smartphone: {
                    title: 'Smartphone',
                    description: 'Screen and battery replacement, software repairs.',
                },
                optimization: {
                    title: 'Optimization',
                    description: 'Software cleanup, malware removal and system speedup.',
                },
                consulting: {
                    title: 'Consulting',
                    description: 'Advice on purchases, configurations and customized solutions.',
                },
            },
        },
        // Footer
        footer: {
            tagline: 'Tech Artisan',
            rights: 'All rights reserved',
            quickLinks: 'Quick Links',
            contactInfo: 'Contact Info',
        },
        // Common
        common: {
            learnMore: 'Learn more',
            backToTop: 'Back to top',
            loading: 'Loading...',
        },
    },
};

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
    const [language, setLanguage] = useState('it');

    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    }, [language]);

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === 'it' ? 'en' : 'it');
    }, []);

    return (
        <I18nContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

export default I18nProvider;
