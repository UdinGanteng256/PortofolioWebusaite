import { createContext, useContext, useState, useEffect } from 'react';

const PerformanceContext = createContext();

export function PerformanceProvider({ children }) {
    const [quality, setQuality] = useState('high');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile devices
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Auto-detect low-end devices
        const deviceMemory = navigator.deviceMemory || 4;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        
        if (deviceMemory <= 2 || hardwareConcurrency <= 2) {
            setQuality('low');
        } else if (deviceMemory <= 4 || hardwareConcurrency <= 4) {
            setQuality('medium');
        }
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const value = {
        quality,
        setQuality,
        isMobile,
        particleCount: quality === 'high' ? 400 : quality === 'medium' ? 200 : 100,
        shadowQuality: quality === 'high' ? [1024, 1024] : [512, 512],
        enableBloom: quality === 'high',
        enableSoftShadows: quality !== 'low',
    };

    return (
        <PerformanceContext.Provider value={value}>
            {children}
        </PerformanceContext.Provider>
    );
}

export function usePerformance() {
    const context = useContext(PerformanceContext);
    if (!context) {
        throw new Error('usePerformance must be used within PerformanceProvider');
    }
    return context;
}
