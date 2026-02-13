import { useState, useRef, Suspense, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Box, Ruler, DollarSign, RefreshCw, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
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

// Parse STL file and extract basic info
const parseSTLFile = (arrayBuffer) => {
    const dataView = new DataView(arrayBuffer);
    
    // Check if ASCII or binary STL
    const header = new TextDecoder().decode(new Uint8Array(arrayBuffer, 0, 80));
    const isBinary = !header.startsWith('solid') || arrayBuffer.byteLength > header.indexOf('\n') + 1;
    
    let triangleCount = 0;
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    
    if (isBinary) {
        // Binary STL format
        triangleCount = dataView.getUint32(80, true);
        
        for (let i = 0; i < triangleCount; i++) {
            const offset = 84 + i * 50;
            
            // Skip normal (12 bytes), read 3 vertices (36 bytes)
            for (let v = 0; v < 3; v++) {
                const vOffset = offset + 12 + v * 12;
                const x = dataView.getFloat32(vOffset, true);
                const y = dataView.getFloat32(vOffset + 4, true);
                const z = dataView.getFloat32(vOffset + 8, true);
                
                minX = Math.min(minX, x); maxX = Math.max(maxX, x);
                minY = Math.min(minY, y); maxY = Math.max(maxY, y);
                minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
            }
        }
    } else {
        // ASCII STL - rough estimation
        const text = new TextDecoder().decode(arrayBuffer);
        const vertexMatches = text.match(/vertex\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)/g);
        
        if (vertexMatches) {
            triangleCount = Math.floor(vertexMatches.length / 3);
            
            vertexMatches.forEach(match => {
                const parts = match.split(/\s+/);
                const x = parseFloat(parts[1]);
                const y = parseFloat(parts[2]);
                const z = parseFloat(parts[3]);
                
                if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
                    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
                    minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
                }
            });
        }
    }
    
    const dimensions = {
        x: Math.abs(maxX - minX),
        y: Math.abs(maxY - minY),
        z: Math.abs(maxZ - minZ),
    };
    
    // Approximate volume calculation (bounding box * fill factor)
    const boundingVolume = dimensions.x * dimensions.y * dimensions.z;
    const estimatedVolume = boundingVolume * 0.3; // Approximate 30% fill
    
    return {
        triangleCount,
        dimensions,
        volume: estimatedVolume,
        boundingVolume
    };
};

// STL Viewer Component with CSS 3D Preview
export const STLViewer = () => {
    const { t } = useI18n();
    const [file, setFile] = useState(null);
    const [stlData, setStlData] = useState(null);
    const [material, setMaterial] = useState('pla');
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isRotating, setIsRotating] = useState(true);
    const fileInputRef = useRef(null);
    const animationRef = useRef(null);

    // Auto rotation animation
    useEffect(() => {
        if (isRotating && stlData) {
            const animate = () => {
                setRotation(prev => ({
                    x: prev.x,
                    y: prev.y + 0.5
                }));
                animationRef.current = requestAnimationFrame(animate);
            };
            animationRef.current = requestAnimationFrame(animate);
        }
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isRotating, stlData]);

    // Handle file upload
    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.name.toLowerCase().endsWith('.stl')) {
            loadSTLFile(selectedFile);
        }
    };

    // Load STL file
    const loadSTLFile = async (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = parseSTLFile(e.target.result);
                setStlData(data);
                setFile(file);
                setRotation({ x: -20, y: 0 });
            } catch (error) {
                console.error('Error parsing STL:', error);
            }
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
    const estimatedCost = stlData ? stlData.volume * MATERIAL_PRICES[material].price : 0;
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

            {/* 3D Preview */}
            <div className="relative h-[400px] bg-slate-900/80 border border-slate-800 rounded-sm overflow-hidden">
                {stlData ? (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
                        {/* Grid floor */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-800/50 to-transparent" />
                        
                        {/* CSS 3D Box representation */}
                        <div
                            className="relative"
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                            }}
                        >
                            {/* Normalize dimensions for display */}
                            {(() => {
                                const maxDim = Math.max(stlData.dimensions.x, stlData.dimensions.y, stlData.dimensions.z);
                                const scale = maxDim > 0 ? 100 / maxDim : 1;
                                const w = stlData.dimensions.x * scale;
                                const h = stlData.dimensions.y * scale;
                                const d = stlData.dimensions.z * scale;
                                
                                return (
                                    <>
                                        {/* Front face */}
                                        <div
                                            className="absolute bg-orange-500/20 border-2 border-orange-500/60"
                                            style={{
                                                width: w,
                                                height: h,
                                                transform: `translateZ(${d/2}px)`,
                                                left: -w/2,
                                                top: -h/2
                                            }}
                                        />
                                        {/* Back face */}
                                        <div
                                            className="absolute bg-orange-500/10 border-2 border-orange-500/40"
                                            style={{
                                                width: w,
                                                height: h,
                                                transform: `translateZ(${-d/2}px) rotateY(180deg)`,
                                                left: -w/2,
                                                top: -h/2
                                            }}
                                        />
                                        {/* Left face */}
                                        <div
                                            className="absolute bg-orange-500/15 border-2 border-orange-500/50"
                                            style={{
                                                width: d,
                                                height: h,
                                                transform: `rotateY(-90deg) translateZ(${w/2}px)`,
                                                left: -d/2,
                                                top: -h/2
                                            }}
                                        />
                                        {/* Right face */}
                                        <div
                                            className="absolute bg-orange-500/15 border-2 border-orange-500/50"
                                            style={{
                                                width: d,
                                                height: h,
                                                transform: `rotateY(90deg) translateZ(${w/2}px)`,
                                                left: -d/2,
                                                top: -h/2
                                            }}
                                        />
                                        {/* Top face */}
                                        <div
                                            className="absolute bg-orange-500/25 border-2 border-orange-500/60"
                                            style={{
                                                width: w,
                                                height: d,
                                                transform: `rotateX(90deg) translateZ(${h/2}px)`,
                                                left: -w/2,
                                                top: -d/2
                                            }}
                                        />
                                        {/* Bottom face */}
                                        <div
                                            className="absolute bg-orange-500/10 border-2 border-orange-500/30"
                                            style={{
                                                width: w,
                                                height: d,
                                                transform: `rotateX(-90deg) translateZ(${h/2}px)`,
                                                left: -w/2,
                                                top: -d/2
                                            }}
                                        />
                                    </>
                                );
                            })()}
                        </div>

                        {/* Controls */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="bg-slate-900/80 border-slate-700"
                                onClick={() => setIsRotating(!isRotating)}
                                data-testid="toggle-rotation"
                            >
                                <RotateCcw className={`w-4 h-4 ${isRotating ? 'text-orange-500' : 'text-slate-400'}`} />
                            </Button>
                        </div>
                        
                        {/* File info overlay */}
                        <div className="absolute top-4 left-4 text-xs font-mono text-slate-400">
                            <p>Triangoli: {stlData.triangleCount.toLocaleString()}</p>
                        </div>
                    </div>
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
            {stlData && (
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
                            {stlData.volume.toFixed(2)} <span className="text-sm text-slate-400">cm³</span>
                        </p>
                    </div>

                    {/* Dimensions */}
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-sm">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                            <Ruler className="w-4 h-4" />
                            {t('modeling3dPage.stlViewer.dimensions')}
                        </div>
                        <p className="font-mono text-white">
                            <span className="text-orange-400">{stlData.dimensions.x.toFixed(1)}</span>
                            <span className="text-slate-500"> × </span>
                            <span className="text-orange-400">{stlData.dimensions.y.toFixed(1)}</span>
                            <span className="text-slate-500"> × </span>
                            <span className="text-orange-400">{stlData.dimensions.z.toFixed(1)}</span>
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
            {stlData && (
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
