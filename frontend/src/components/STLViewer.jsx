import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Upload, Box, Ruler, DollarSign, RefreshCw } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { Button } from './ui/button';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from './ui/select';

// Material prices per cm³
const MATERIAL_PRICES = {
    pla: { price: 0.05, name: 'PLA Standard', color: '#22c55e' },
    petg: { price: 0.08, name: 'PETG Resistente', color: '#3b82f6' },
    abs: { price: 0.10, name: 'ABS Tecnico', color: '#ef4444' },
    carbonFiber: { price: 0.35, name: 'Fibra di Carbonio', color: '#1f2937' },
};

// STL Model Component
const STLModel = ({ geometry, material }) => {
    const meshRef = useRef();
    const materialColor = MATERIAL_PRICES[material]?.color || '#f97316';

    return (
        <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial 
                color={materialColor}
                metalness={0.3}
                roughness={0.5}
            />
        </mesh>
    );
};

// Loading fallback
const LoadingFallback = () => {
    const { t } = useI18n();
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#f97316" wireframe />
        </mesh>
    );
};

// Calculate volume and dimensions from geometry
const calculateGeometryStats = (geometry) => {
    if (!geometry) return { volume: 0, dimensions: { x: 0, y: 0, z: 0 } };

    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;
    
    const dimensions = {
        x: Math.abs(boundingBox.max.x - boundingBox.min.x),
        y: Math.abs(boundingBox.max.y - boundingBox.min.y),
        z: Math.abs(boundingBox.max.z - boundingBox.min.z),
    };

    // Approximate volume calculation (bounding box volume * fill factor)
    // For more accurate volume, you'd need to calculate the actual mesh volume
    const boundingVolume = dimensions.x * dimensions.y * dimensions.z;
    const estimatedVolume = boundingVolume * 0.3; // Approximate fill factor

    return { volume: estimatedVolume, dimensions };
};

// STL Viewer Component
export const STLViewer = () => {
    const { t } = useI18n();
    const [file, setFile] = useState(null);
    const [geometry, setGeometry] = useState(null);
    const [material, setMaterial] = useState('pla');
    const [stats, setStats] = useState({ volume: 0, dimensions: { x: 0, y: 0, z: 0 } });
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Handle file upload
    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.name.toLowerCase().endsWith('.stl')) {
            loadSTLFile(selectedFile);
        }
    };

    // Load STL file
    const loadSTLFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const loader = new STLLoader();
            const geometry = loader.parse(e.target.result);
            geometry.center();
            geometry.computeVertexNormals();
            
            setGeometry(geometry);
            setFile(file);
            
            const calculatedStats = calculateGeometryStats(geometry);
            setStats(calculatedStats);
        };
        reader.readAsArrayBuffer(file);
    };

    // Drag and drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && droppedFile.name.toLowerCase().endsWith('.stl')) {
            loadSTLFile(droppedFile);
        }
    };

    // Calculate estimated cost
    const estimatedCost = stats.volume * MATERIAL_PRICES[material].price;
    const setupFee = 5; // Base setup fee
    const totalCost = estimatedCost + setupFee;

    return (
        <div className="space-y-6" data-testid="stl-viewer">
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-sm p-8 text-center transition-all cursor-pointer ${
                    isDragging 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-slate-700 hover:border-orange-500/50 bg-slate-900/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                data-testid="stl-upload-area"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".stl"
                    onChange={handleFileChange}
                    className="hidden"
                    data-testid="stl-file-input"
                />
                <Upload className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                <p className="text-slate-300 font-medium">{t('modeling3dPage.stlViewer.upload')}</p>
                <p className="text-slate-500 text-sm mt-2">{t('modeling3dPage.stlViewer.uploadDescription')}</p>
                {file && (
                    <p className="text-orange-400 text-sm mt-4 font-mono">
                        {file.name}
                    </p>
                )}
            </div>

            {/* 3D Viewer */}
            <div className="relative h-[400px] bg-slate-900/80 border border-slate-800 rounded-sm overflow-hidden">
                {geometry ? (
                    <Canvas
                        camera={{ position: [0, 0, 100], fov: 45 }}
                        gl={{ antialias: true }}
                        data-testid="stl-canvas"
                    >
                        <Suspense fallback={<LoadingFallback />}>
                            <Stage
                                intensity={0.5}
                                environment="city"
                                adjustCamera={1.5}
                            >
                                <Center>
                                    <STLModel geometry={geometry} material={material} />
                                </Center>
                            </Stage>
                            <OrbitControls 
                                autoRotate 
                                autoRotateSpeed={1}
                                enableZoom={true}
                                enablePan={true}
                            />
                        </Suspense>
                    </Canvas>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Box className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                            <p className="text-slate-500">{t('modeling3dPage.stlViewer.noFile')}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats and Quote */}
            {geometry && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {/* Volume */}
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-sm">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                            <Box className="w-4 h-4" />
                            {t('modeling3dPage.stlViewer.volume')}
                        </div>
                        <p className="font-mono text-xl text-white">
                            {stats.volume.toFixed(2)} <span className="text-sm text-slate-400">cm³</span>
                        </p>
                    </div>

                    {/* Dimensions */}
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-sm">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                            <Ruler className="w-4 h-4" />
                            {t('modeling3dPage.stlViewer.dimensions')}
                        </div>
                        <p className="font-mono text-white">
                            <span className="text-orange-400">{stats.dimensions.x.toFixed(1)}</span>
                            <span className="text-slate-500"> × </span>
                            <span className="text-orange-400">{stats.dimensions.y.toFixed(1)}</span>
                            <span className="text-slate-500"> × </span>
                            <span className="text-orange-400">{stats.dimensions.z.toFixed(1)}</span>
                            <span className="text-sm text-slate-400 ml-1">mm</span>
                        </p>
                    </div>

                    {/* Material Select */}
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-sm">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                            <RefreshCw className="w-4 h-4" />
                            {t('modeling3dPage.stlViewer.material')}
                        </div>
                        <Select value={material} onValueChange={setMaterial}>
                            <SelectTrigger 
                                className="bg-slate-950 border-slate-700 text-white"
                                data-testid="material-select"
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700">
                                <SelectItem value="pla" data-testid="material-pla">
                                    {t('modeling3dPage.materials.pla')}
                                </SelectItem>
                                <SelectItem value="petg" data-testid="material-petg">
                                    {t('modeling3dPage.materials.petg')}
                                </SelectItem>
                                <SelectItem value="abs" data-testid="material-abs">
                                    {t('modeling3dPage.materials.abs')}
                                </SelectItem>
                                <SelectItem value="carbonFiber" data-testid="material-carbon">
                                    {t('modeling3dPage.materials.carbonFiber')}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Estimated Cost */}
                    <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-sm">
                        <div className="flex items-center gap-2 text-orange-400 text-sm mb-2">
                            <DollarSign className="w-4 h-4" />
                            {t('modeling3dPage.stlViewer.estimatedCost')}
                        </div>
                        <p className="font-mono text-2xl text-orange-500 font-bold">
                            €{totalCost.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Materiale: €{estimatedCost.toFixed(2)} + Setup: €{setupFee}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Request Quote Button */}
            {geometry && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                >
                    <Button
                        className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold uppercase tracking-wider px-8 py-6 text-lg hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
                        data-testid="request-quote-btn"
                        onClick={() => window.location.href = '/contatti'}
                    >
                        {t('modeling3dPage.stlViewer.requestQuote')}
                    </Button>
                </motion.div>
            )}
        </div>
    );
};

export default STLViewer;
