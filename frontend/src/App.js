import "@/App.css";
import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./lib/i18n";
import { Layout } from "./components/Layout";
import { Toaster } from "./components/ui/sonner";

// Pages
import Home from "./pages/Home";
import Modellazione3D from "./pages/Modellazione3D";
import ExcelAutomation from "./pages/ExcelAutomation";
import SmartHome from "./pages/SmartHome";
import TechSupport from "./pages/TechSupport";
import Contatti from "./pages/Contatti";

function App() {
    return (
        <I18nProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/modellazione-3d" element={<Modellazione3D />} />
                        <Route path="/excel-automation" element={<ExcelAutomation />} />
                        <Route path="/smart-home" element={<SmartHome />} />
                        <Route path="/tech-support" element={<TechSupport />} />
                        <Route path="/contatti" element={<Contatti />} />
                    </Routes>
                </Layout>
                <Toaster position="top-right" />
            </BrowserRouter>
        </I18nProvider>
    );
}

export default App;
