import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    ContactShadows,
    useGLTF,
    Html,
    Float
} from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from '../context/PerformanceContext';

// Loading Spinner Component
function Loader() {
    return (
        <Html center>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                color: '#88ff00',
                fontFamily: 'Space Grotesk, sans-serif'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(136, 255, 0, 0.3)',
                    borderTop: '3px solid #88ff00',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <span>Loading 3D Model...</span>
            </div>
        </Html>
    );
}

// Animated Placeholder Geometry (when no model is loaded)
function PlaceholderGeometry({ type = 'torusKnot' }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const { quality } = usePerformance();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    // Reduce geometry complexity based on quality
    const complexity = quality === 'high' ? 128 : quality === 'medium' ? 64 : 32;

    const geometry = type === 'box' ?
        <boxGeometry args={[1.5, 1.5, 1.5]} /> :
        type === 'sphere' ?
        <sphereGeometry args={[1.2, quality === 'low' ? 16 : 32, quality === 'low' ? 16 : 32]} /> :
        <torusKnotGeometry args={[1, 0.3, complexity, 32]} />;

    return (
        <Float speed={quality === 'low' ? 0 : 2} rotationIntensity={quality === 'low' ? 0.2 : 0.5} floatIntensity={quality === 'low' ? 0.2 : 0.5}>
            <mesh
                ref={meshRef}
                geometry={geometry}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.1 : 1}
            >
                <meshStandardMaterial
                    color={hovered ? '#88ff00' : '#4a9eff'}
                    metalness={0.7}
                    roughness={0.2}
                    emissive={hovered ? '#88ff00' : '#4a9eff'}
                    emissiveIntensity={hovered ? 0.5 : 0.2}
                />
            </mesh>
        </Float>
    );
}

// 3D Model Component
function Model({ url, onModelLoad }) {
    const { scene } = useGLTF(url);
    const modelRef = useRef();

    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.002;
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={2}
            position={[0, -1, 0]}
        />
    );
}

// Main Viewer Component
function Viewer({ modelUrl, placeholderType, environment, intensity }) {
    const { quality, shadowQuality, enableSoftShadows } = usePerformance();

    return (
        <Canvas 
            shadows 
            dpr={quality === 'high' ? [1, 2] : 1} 
            gl={{ 
                preserveDrawingBuffer: true,
                antialias: quality !== 'low',
                powerPreference: 'high-performance'
            }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <OrbitControls
                makeDefault
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
                enableZoom={true}
                enablePan={false}
                autoRotate={!modelUrl && quality !== 'low'}
                autoRotateSpeed={quality === 'low' ? 0.2 : 0.5}
            />
            <Environment preset={environment || 'city'} />
            <ambientLight intensity={intensity || 0.5} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow={quality !== 'low'}
                shadow-mapSize={shadowQuality}
            />
            <Suspense fallback={<Loader />}>
                {modelUrl ? (
                    <Model url={modelUrl} />
                ) : (
                    <PlaceholderGeometry type={placeholderType || 'torusKnot'} />
                )}
            </Suspense>
            <ContactShadows
                position={[0, -1.5, 0]}
                opacity={enableSoftShadows ? 0.4 : 0.6}
                scale={10}
                blur={enableSoftShadows ? 2 : 0}
                far={4}
            />
        </Canvas>
    );
}

// Main Export Component
export default function ModelViewer({
    modelUrl = null,
    placeholderType = 'torusKnot',
    environment = 'city',
    intensity = 0.5,
    title,
    description,
    height = '400px'
}) {
    const [viewMode, setViewMode] = useState('viewer');

    return (
        <div className="model-viewer-container">
            <div className="model-viewer-header">
                <div className="model-viewer-title">
                    <i className="fas fa-cube"></i>
                    <span>{title || '3D Model Viewer'}</span>
                </div>
                <div className="model-viewer-controls">
                    <button
                        className={`view-btn ${viewMode === 'viewer' ? 'active' : ''}`}
                        onClick={() => setViewMode('viewer')}
                    >
                        <i className="fas fa-box"></i> 3D View
                    </button>
                    {modelUrl && (
                        <a
                            href={modelUrl}
                            download
                            className="view-btn download-btn"
                        >
                            <i className="fas fa-download"></i> Download
                        </a>
                    )}
                </div>
            </div>

            <div className="model-viewer-viewport" style={{ height }}>
                <Viewer
                    modelUrl={modelUrl}
                    placeholderType={placeholderType}
                    environment={environment}
                    intensity={intensity}
                />
            </div>

            {description && (
                <div className="model-viewer-info">
                    <p>{description}</p>
                    <div className="model-viewer-hints">
                        <span><i className="fas fa-mouse"></i> Drag to rotate</span>
                        <span><i className="fas fa-search"></i> Scroll to zoom</span>
                    </div>
                </div>
            )}
        </div>
    );
}

// Preload common models
useGLTF.preload('/models/placeholder.glb');
