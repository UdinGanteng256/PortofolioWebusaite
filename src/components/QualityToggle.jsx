import { usePerformance } from '../context/PerformanceContext';
import { Settings, Zap, HelpCircle, Info, Circle } from 'lucide-react';

export default function QualityToggle() {
    const { quality, setQuality, isMobile } = usePerformance();

    return (
        <div className="quality-toggle">
            <button className="quality-btn">
                <Settings size={18} strokeWidth={1.5} />
                <span className="quality-label">Quality: {quality.toUpperCase()}</span>
            </button>
            <div className="quality-dropdown">
                <button 
                    className={`quality-option ${quality === 'high' ? 'active' : ''}`}
                    onClick={() => setQuality('high')}
                >
                    <Circle size={16} strokeWidth={1.5} /> High
                </button>
                <button 
                    className={`quality-option ${quality === 'medium' ? 'active' : ''}`}
                    onClick={() => setQuality('medium')}
                >
                    <Zap size={16} strokeWidth={1.5} /> Medium
                </button>
                <button 
                    className={`quality-option ${quality === 'low' ? 'active' : ''}`}
                    onClick={() => setQuality('low')}
                >
                    <HelpCircle size={16} strokeWidth={1.5} /> Performance
                </button>
                {isMobile && (
                    <div className="mobile-warning">
                        <Info size={16} strokeWidth={1.5} /> Mobile detected
                    </div>
                )}
            </div>
        </div>
    );
}
