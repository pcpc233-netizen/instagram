'use client';

import React, { useState, useEffect } from 'react';

interface Prediction {
  type: string;
  label: string;
  value: number | string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  critical: boolean;
}

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  action?: string;
}

const PredictiveAI = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([
    { type: 'orders', label: 'Next Hour Orders', value: 245, confidence: 94.2, trend: 'up', critical: false },
    { type: 'robots', label: 'Recommended Robots', value: 7, confidence: 91.8, trend: 'stable', critical: false },
    { type: 'load', label: 'Expected Load Peak', value: '85% at 14:00-16:00', confidence: 88.5, trend: 'up', critical: true },
    { type: 'efficiency', label: 'Predicted Efficiency', value: '97.8%', confidence: 93.1, trend: 'stable', critical: false },
    { type: 'bottleneck', label: 'Bottleneck Risk', value: 'Zone D at 14:30', confidence: 76.3, trend: 'up', critical: true },
    { type: 'maintenance', label: 'Maintenance Due', value: 'AGV-002 in 48h', confidence: 99.5, trend: 'stable', critical: false },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', severity: 'critical', message: 'AGV-003 battery critical - 28 minutes remaining', timestamp: new Date(), action: 'Auto-routing to charging station' },
    { id: '2', severity: 'warning', message: 'Bubble Wrap inventory low (12 units)', timestamp: new Date(), action: 'Purchase order generated' },
    { id: '3', severity: 'info', message: 'Zone D activity will peak in 2 hours', timestamp: new Date(), action: 'Pre-positioning 2 additional AGVs' },
  ]);

  const [aiMetrics, setAiMetrics] = useState({
    modelAccuracy: 94.7,
    predictionsToday: 1847,
    correctPredictions: 1749,
    learningRate: 0.0023,
    dataPoints: 127845,
  });

  const [demandForecast, setDemandForecast] = useState([
    { hour: '12:00', orders: 189, actual: 195 },
    { hour: '13:00', orders: 212, actual: 208 },
    { hour: '14:00', orders: 245, actual: null },
    { hour: '15:00', orders: 268, actual: null },
    { hour: '16:00', orders: 221, actual: null },
    { hour: '17:00', orders: 198, actual: null },
  ]);

  const [inventoryPredictions, setInventoryPredictions] = useState([
    { item: 'Bubble Wrap', current: 12, reorderPoint: 50, predicted: 0, daysLeft: 0.3, status: 'critical' },
    { item: 'Box Type-A', current: 234, reorderPoint: 100, predicted: 87, daysLeft: 2.1, status: 'warning' },
    { item: 'Packing Tape', current: 89, reorderPoint: 30, predicted: 56, daysLeft: 3.2, status: 'normal' },
    { item: 'Labels', current: 1420, reorderPoint: 500, predicted: 980, daysLeft: 8.5, status: 'normal' },
  ]);

  const [robotOptimization, setRobotOptimization] = useState({
    currentFleet: 5,
    recommendedFleet: 7,
    utilizationRate: 87.3,
    idleTime: 12.7,
    avgTaskTime: 4.2,
    potentialSavings: '₩2.4M/month',
  });

  // 실시간 예측 업데이트 (더 현실적으로)
  useEffect(() => {
    const interval = setInterval(() => {
      // 주문 예측 업데이트
      setPredictions(prev => prev.map(p => {
        if (p.type === 'orders') {
          const newValue = 240 + Math.floor(Math.random() * 15);
          return { ...p, value: newValue, confidence: 93 + Math.random() * 3 };
        }
        if (p.type === 'load') {
          const loads = ['82%', '85%', '88%', '83%'];
          const times = ['14:00-16:00', '14:30-16:30', '13:45-15:45'];
          return { 
            ...p, 
            value: `${loads[Math.floor(Math.random() * loads.length)]} at ${times[Math.floor(Math.random() * times.length)]}`,
            confidence: 86 + Math.random() * 4
          };
        }
        return { ...p, confidence: p.confidence + (Math.random() - 0.5) * 0.5 };
      }));

      // 알림 동적 추가
      if (Math.random() > 0.7) {
        const newAlerts = [
          { severity: 'info' as const, message: 'Order spike detected - adjusting AGV routes', action: 'Route optimization in progress' },
          { severity: 'warning' as const, message: 'Zone D approaching capacity (92%)', action: 'Triggering overflow protocol' },
          { severity: 'info' as const, message: 'AGV-001 completed 50 tasks - efficiency 99.2%', action: 'None required' },
        ];
        const randomAlert = newAlerts[Math.floor(Math.random() * newAlerts.length)];
        setAlerts(prev => [
          { id: Date.now().toString(), ...randomAlert, timestamp: new Date() },
          ...prev.slice(0, 4)
        ]);
      }

      // AI 메트릭 업데이트
      setAiMetrics(prev => ({
        ...prev,
        predictionsToday: prev.predictionsToday + Math.floor(Math.random() * 3),
        correctPredictions: prev.correctPredictions + Math.floor(Math.random() * 2),
        modelAccuracy: ((prev.correctPredictions + Math.floor(Math.random() * 2)) / (prev.predictionsToday + Math.floor(Math.random() * 3))) * 100,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return '#ff3333';
      case 'warning': return '#ffcc00';
      case 'info': return '#00ccff';
      default: return '#00ff41';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'critical': return '#ff3333';
      case 'warning': return '#ffcc00';
      case 'normal': return '#00ff41';
      default: return '#00ccff';
    }
  };

  return (
    <div className="nexus-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="panel-title" style={{ margin: 0 }}>🤖 AI PREDICTIVE ANALYTICS</h3>
        <div style={{ fontSize: '0.7rem', color: '#00ccff' }}>
          <span style={{ marginRight: '1rem' }}>🎯 Accuracy: {aiMetrics.modelAccuracy.toFixed(1)}%</span>
          <span>📊 {aiMetrics.predictionsToday} predictions today</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* 주요 예측 카드 */}
        {predictions.map((pred, idx) => (
          <div 
            key={idx}
            style={{
              background: pred.critical ? 'rgba(255, 51, 51, 0.1)' : 'rgba(0, 255, 65, 0.05)',
              border: `1px solid ${pred.critical ? 'rgba(255, 51, 51, 0.3)' : 'rgba(0, 255, 65, 0.2)'}`,
              borderRadius: '6px',
              padding: '1rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {pred.critical && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: '#ff3333',
                color: 'white',
                padding: '0.2rem 0.5rem',
                fontSize: '0.6rem',
                borderBottomLeftRadius: '4px',
                fontWeight: 'bold'
              }}>
                CRITICAL
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ color: '#00ccff', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                {pred.label}
              </span>
              <span style={{ fontSize: '1.2rem' }}>{getTrendIcon(pred.trend)}</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00ff41', marginBottom: '0.5rem' }}>
              {pred.value}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#00ccff' }}>
                Confidence: {pred.confidence.toFixed(1)}%
              </div>
              <div style={{
                width: '100px',
                height: '4px',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${pred.confidence}%`,
                  height: '100%',
                  background: pred.confidence > 90 ? '#00ff41' : pred.confidence > 75 ? '#ffcc00' : '#ff3333',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 수요 예측 그래프 */}
      <div style={{
        background: 'rgba(0, 20, 0, 0.3)',
        border: '1px solid rgba(0, 255, 65, 0.3)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '0.5rem' }}>
          📈 HOURLY DEMAND FORECAST
        </h4>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '150px', gap: '0.5rem' }}>
          {demandForecast.map((item, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#00ccff', marginBottom: '0.3rem' }}>
                {item.orders}
              </div>
              <div style={{
                width: '100%',
                height: `${(item.orders / 300) * 100}%`,
                background: item.actual ? 'linear-gradient(to top, #00ff41, rgba(0, 255, 65, 0.5))' : 'linear-gradient(to top, #00ccff, rgba(0, 204, 255, 0.5))',
                borderRadius: '4px 4px 0 0',
                position: 'relative',
                minHeight: '20px',
                border: item.actual ? '1px solid #00ff41' : '1px dashed #00ccff'
              }}>
                {item.actual && (
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.65rem',
                    color: '#00ff41',
                    whiteSpace: 'nowrap'
                  }}>
                    ✓ {item.actual}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#ffffff', fontWeight: 'bold' }}>
                {item.hour}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(100, 100, 100, 0.2)' }}>
          <div style={{ fontSize: '0.7rem', color: '#00ff41' }}>━━ Actual Data</div>
          <div style={{ fontSize: '0.7rem', color: '#00ccff' }}>- - Predicted</div>
        </div>
      </div>

      {/* 로봇 최적화 제안 */}
      <div style={{
        background: 'rgba(0, 20, 40, 0.4)',
        border: '1px solid rgba(0, 204, 255, 0.3)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ color: '#00ccff', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 204, 255, 0.2)', paddingBottom: '0.5rem' }}>
          🤖 ROBOT FLEET OPTIMIZATION
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#00ccff', marginBottom: '0.3rem' }}>Current Fleet</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>{robotOptimization.currentFleet} robots</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#00ccff', marginBottom: '0.3rem' }}>Recommended Fleet</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ff41' }}>{robotOptimization.recommendedFleet} robots</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#00ccff', marginBottom: '0.3rem' }}>Potential Savings</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffcc00' }}>{robotOptimization.potentialSavings}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#00ccff', marginBottom: '0.3rem' }}>Utilization Rate</div>
            <div style={{ fontSize: '1.2rem', color: '#00ff41' }}>{robotOptimization.utilizationRate}%</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#00ccff', marginBottom: '0.3rem' }}>Idle Time</div>
            <div style={{ fontSize: '1.2rem', color: '#ffcc00' }}>{robotOptimization.idleTime}%</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#00ccff', marginBottom: '0.3rem' }}>Avg Task Time</div>
            <div style={{ fontSize: '1.2rem', color: '#00ff41' }}>{robotOptimization.avgTaskTime} min</div>
          </div>
        </div>
      </div>

      {/* 재고 예측 테이블 */}
      <div style={{
        background: 'rgba(0, 20, 0, 0.3)',
        border: '1px solid rgba(0, 255, 65, 0.3)',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '0.5rem' }}>
          📦 INVENTORY DEPLETION FORECAST
        </h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0, 255, 65, 0.3)' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Item</th>
              <th style={{ padding: '0.5rem', textAlign: 'right', color: '#00ff41' }}>Current</th>
              <th style={{ padding: '0.5rem', textAlign: 'right', color: '#00ff41' }}>Predicted (EOD)</th>
              <th style={{ padding: '0.5rem', textAlign: 'right', color: '#00ff41' }}>Days Left</th>
              <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00ff41' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventoryPredictions.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 100, 100, 0.2)' }}>
                <td style={{ padding: '0.5rem', color: '#ffffff', fontWeight: 'bold' }}>{item.item}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', color: '#00ccff' }}>{item.current}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', color: item.predicted < item.reorderPoint ? '#ff3333' : '#00ff41' }}>
                  {item.predicted}
                </td>
                <td style={{ padding: '0.5rem', textAlign: 'right', color: item.daysLeft < 1 ? '#ff3333' : item.daysLeft < 3 ? '#ffcc00' : '#00ff41' }}>
                  {item.daysLeft.toFixed(1)}d
                </td>
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                  <span style={{
                    background: `${getStatusColor(item.status)}20`,
                    color: getStatusColor(item.status),
                    padding: '0.2rem 0.5rem',
                    borderRadius: '3px',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 실시간 알림 */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(0, 255, 65, 0.3)',
        borderRadius: '8px',
        padding: '1rem'
      }}>
        <h4 style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '0.5rem' }}>
          🔔 AI-GENERATED ALERTS
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                background: `${getSeverityColor(alert.severity)}15`,
                border: `1px solid ${getSeverityColor(alert.severity)}`,
                borderLeft: `4px solid ${getSeverityColor(alert.severity)}`,
                borderRadius: '4px',
                padding: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                animation: alert.severity === 'critical' ? 'pulse 2s infinite' : 'none'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <span style={{
                    background: getSeverityColor(alert.severity),
                    color: 'white',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '3px',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {alert.severity}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#00ccff' }}>
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                  {alert.message}
                </div>
                {alert.action && (
                  <div style={{ fontSize: '0.7rem', color: '#00ff41', fontStyle: 'italic' }}>
                    → {alert.action}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI 모델 성능 지표 */}
      <div style={{
        marginTop: '1.5rem',
        background: 'rgba(0, 20, 40, 0.3)',
        border: '1px solid rgba(0, 204, 255, 0.2)',
        borderRadius: '8px',
        padding: '1rem'
      }}>
        <h4 style={{ color: '#00ccff', fontSize: '0.8rem', marginBottom: '0.8rem' }}>
          🧠 AI MODEL PERFORMANCE
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', fontSize: '0.7rem' }}>
          <div>
            <div style={{ color: '#00ccff', marginBottom: '0.2rem' }}>Accuracy</div>
            <div style={{ color: '#00ff41', fontSize: '1rem', fontWeight: 'bold' }}>{aiMetrics.modelAccuracy.toFixed(2)}%</div>
          </div>
          <div>
            <div style={{ color: '#00ccff', marginBottom: '0.2rem' }}>Predictions</div>
            <div style={{ color: '#00ff41', fontSize: '1rem', fontWeight: 'bold' }}>{aiMetrics.predictionsToday}</div>
          </div>
          <div>
            <div style={{ color: '#00ccff', marginBottom: '0.2rem' }}>Correct</div>
            <div style={{ color: '#00ff41', fontSize: '1rem', fontWeight: 'bold' }}>{aiMetrics.correctPredictions}</div>
          </div>
          <div>
            <div style={{ color: '#00ccff', marginBottom: '0.2rem' }}>Learning Rate</div>
            <div style={{ color: '#00ff41', fontSize: '1rem', fontWeight: 'bold' }}>{aiMetrics.learningRate}</div>
          </div>
          <div>
            <div style={{ color: '#00ccff', marginBottom: '0.2rem' }}>Data Points</div>
            <div style={{ color: '#00ff41', fontSize: '1rem', fontWeight: 'bold' }}>{aiMetrics.dataPoints.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAI;
