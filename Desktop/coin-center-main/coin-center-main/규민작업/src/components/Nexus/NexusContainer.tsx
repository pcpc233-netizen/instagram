'use client';

import React from 'react';
import AssetDashboard from './AssetDashboard';
import LiveLogTicker from './LiveLogTicker';
import AutomationMonitor from './AutomationMonitor';
import Warehouse3DMap from './Warehouse3DMap';
import PredictiveAI from './PredictiveAI';
import HardwareGuide from './HardwareGuide';
import './nexus-style.css';

const NexusContainer = () => {
  return (
    <div className="nexus-container">
      {/* 헤더 */}
      <div className="nexus-header" style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          textAlign: 'right'
        }}>
          <div style={{
            fontSize: '1.2rem',
            color: '#00ff41',
            fontWeight: 'bold',
            letterSpacing: '3px',
            textShadow: '0 0 15px rgba(0, 255, 65, 0.6)',
            marginBottom: '0.3rem'
          }}>
            JH LOGISTICS
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#00ccff',
            letterSpacing: '2px',
            opacity: 0.8,
            marginBottom: '0.5rem'
          }}>
            CONTROL CENTER
          </div>
          <div style={{
            fontSize: '0.7rem',
            color: '#00ff41',
            letterSpacing: '1.5px',
            opacity: 0.6,
            borderTop: '1px solid rgba(0, 255, 65, 0.3)',
            paddingTop: '0.3rem'
          }}>
            CENTER DIRECTOR: PARK JUNHO
          </div>
        </div>
        
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#00ff41', 
          textAlign: 'center',
          letterSpacing: '4px',
          textShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
          marginBottom: '0.5rem'
        }}>
          NEXUS OS v2.1
        </h1>
        <p style={{ 
          textAlign: 'center', 
          opacity: 0.7,
          fontSize: '0.9rem',
          letterSpacing: '2px'
        }}>
          5,000㎡ LOGISTICS CONTROL CENTER
        </p>
      </div>

      {/* 대시보드 그리드 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <AssetDashboard />
        <LiveLogTicker />
      </div>

      {/* 3D 창고 맵 - 전체 너비 */}
      <Warehouse3DMap />

      {/* AI 예측 시스템 */}
      <PredictiveAI />

      {/* 자동화 시스템 모니터 - 전체 너비 */}
      <AutomationMonitor />

      {/* 하드웨어 연동 가이드 */}
      <HardwareGuide />

      {/* 시스템 상태 바 */}
      <div className="nexus-panel" style={{ 
        display: 'flex', 
        justifyContent: 'space-around',
        padding: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>CPU USAGE</div>
          <div style={{ fontSize: '1.5rem', color: '#00ff41', fontWeight: 'bold' }}>23%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>BLOCKCHAIN SYNC</div>
          <div style={{ fontSize: '1.5rem', color: '#00ccff', fontWeight: 'bold' }}>100%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>NETWORK STATUS</div>
          <div style={{ fontSize: '1.5rem', color: '#00ff41', fontWeight: 'bold' }}>ONLINE</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.3rem' }}>UPTIME</div>
          <div style={{ fontSize: '1.5rem', color: '#00ccff', fontWeight: 'bold' }}>99.9%</div>
        </div>
      </div>
    </div>
  );
};

export default NexusContainer;
