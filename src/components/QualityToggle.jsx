import { usePerformance } from '../context/PerformanceContext';

export default function QualityToggle() {
    const { quality, setQuality, isMobile } = usePerformance();

    return (
        <div className="quality-toggle">
            <button className="quality-btn">
                <i className="fas fa-sliders-h"></i>
                <span className="quality-label">Quality: {quality.toUpperCase()}</span>
            </button>
            <div className="quality-dropdown">
                <button 
                    className={`quality-option ${quality === 'high' ? 'active' : ''}`}
                    onClick={() => setQuality('high')}
                >
                    <i className="fas fa-gem"></i> High
                </button>
                <button 
                    className={`quality-option ${quality === 'medium' ? 'active' : ''}`}
                    onClick={() => setQuality('medium')}
                >
                    <i className="fas fa-adjust"></i> Medium
                </button>
                <button 
                    className={`quality-option ${quality === 'low' ? 'active' : ''}`}
                    onClick={() => setQuality('low')}
                >
                    <i className="fas fa-bolt"></i> Performance
                </button>
                {isMobile && (
                    <div className="mobile-warning">
                        <i className="fas fa-info-circle"></i> Mobile detected
                    </div>
                )}
            </div>
        </div>
    );
}
