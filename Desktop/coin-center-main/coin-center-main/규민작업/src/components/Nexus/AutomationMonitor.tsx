'use client';

import React, { useState, useEffect } from 'react';

const AutomationMonitor = () => {
  const [robotStatus, setRobotStatus] = useState({
    agv1: { status: 'ACTIVE', task: 'Retrieving Item #A-4523', battery: 87 },
    agv2: { status: 'ACTIVE', task: 'Moving to Zone D-3', battery: 92 },
    agv3: { status: 'CHARGING', task: 'Standby', battery: 34 },
    packer1: { status: 'ACTIVE', task: 'Packing Order #7842', efficiency: 98.5 },
    packer2: { status: 'ACTIVE', task: 'Packing Order #7843', efficiency: 99.1 },
  });

  const [stats, setStats] = useState({
    itemsPickedToday: 14203,
    itemsPackedToday: 13987,
    averagePickTime: 23, // seconds
    systemEfficiency: 98.5,
    activeRobots: 5,
    errorRate: 0.1
  });

  // 실시간 숫자 변동 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        itemsPickedToday: prev.itemsPickedToday + Math.floor(Math.random() * 5),
        itemsPackedToday: prev.itemsPackedToday + Math.floor(Math.random() * 4),
        averagePickTime: 23 + Math.floor(Math.random() * 3) - 1,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="nexus-panel automation-panel">
      <h3 className="panel-title">🤖 AUTOMATION SYSTEM STATUS</h3>
      
      {/* 전체 통계 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div className="stat-box">
          <span className="label">PICKED TODAY</span>
          <span className="value" style={{ color: '#00ff41' }}>{stats.itemsPickedToday.toLocaleString()}</span>
        </div>
        <div className="stat-box">
          <span className="label">PACKED TODAY</span>
          <span className="value" style={{ color: '#00ccff' }}>{stats.itemsPackedToday.toLocaleString()}</span>
        </div>
        <div className="stat-box">
          <span className="label">EFFICIENCY</span>
          <span className="value" style={{ color: '#00ff41' }}>{stats.systemEfficiency}%</span>
        </div>
      </div>

      {/* 로봇 상태 */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ 
          fontSize: '0.9rem', 
          color: '#00ccff', 
          marginBottom: '0.8rem',
          borderBottom: '1px solid rgba(0, 204, 255, 0.3)',
          paddingBottom: '0.3rem'
        }}>
          ROBOT FLEET STATUS
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* AGV Robots */}
          <div style={{ 
            background: 'rgba(0, 255, 65, 0.05)', 
            border: '1px solid rgba(0, 255, 65, 0.2)',
            borderRadius: '4px',
            padding: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ color: '#00ff41', fontWeight: 'bold', fontSize: '0.85rem' }}>AGV-001</span>
              <span style={{ color: '#00ccff', fontSize: '0.75rem', marginLeft: '1rem' }}>
                {robotStatus.agv1.task}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#00ff41' }}>
                🔋 {robotStatus.agv1.battery}%
              </span>
              <span style={{ 
                fontSize: '0.7rem', 
                color: '#00ff41',
                background: 'rgba(0, 255, 65, 0.2)',
                padding: '0.2rem 0.5rem',
                borderRadius: '3px'
              }}>
                {robotStatus.agv1.status}
              </span>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(0, 255, 65, 0.05)', 
            border: '1px solid rgba(0, 255, 65, 0.2)',
            borderRadius: '4px',
            padding: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ color: '#00ff41', fontWeight: 'bold', fontSize: '0.85rem' }}>AGV-002</span>
              <span style={{ color: '#00ccff', fontSize: '0.75rem', marginLeft: '1rem' }}>
                {robotStatus.agv2.task}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#00ff41' }}>
                🔋 {robotStatus.agv2.battery}%
              </span>
              <span style={{ 
                fontSize: '0.7rem', 
                color: '#00ff41',
                background: 'rgba(0, 255, 65, 0.2)',
                padding: '0.2rem 0.5rem',
                borderRadius: '3px'
              }}>
                {robotStatus.agv2.status}
              </span>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 204, 0, 0.05)', 
            border: '1px solid rgba(255, 204, 0, 0.2)',
            borderRadius: '4px',
            padding: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '0.85rem' }}>AGV-003</span>
              <span style={{ color: '#ffcc00', fontSize: '0.75rem', marginLeft: '1rem' }}>
                {robotStatus.agv3.task}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#ffcc00' }}>
                🔋 {robotStatus.agv3.battery}%
              </span>
              <span style={{ 
                fontSize: '0.7rem', 
                color: '#ffcc00',
                background: 'rgba(255, 204, 0, 0.2)',
                padding: '0.2rem 0.5rem',
                borderRadius: '3px'
              }}>
                {robotStatus.agv3.status}
              </span>
            </div>
          </div>

          {/* Packer Robots */}
          <div style={{ 
            background: 'rgba(0, 204, 255, 0.05)', 
            border: '1px solid rgba(0, 204, 255, 0.2)',
            borderRadius: '4px',
            padding: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ color: '#00ccff', fontWeight: 'bold', fontSize: '0.85rem' }}>PACKER-001</span>
              <span style={{ color: '#00ff41', fontSize: '0.75rem', marginLeft: '1rem' }}>
                {robotStatus.packer1.task}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#00ccff' }}>
                ⚡ {robotStatus.packer1.efficiency}%
              </span>
              <span style={{ 
                fontSize: '0.7rem', 
                color: '#00ccff',
                background: 'rgba(0, 204, 255, 0.2)',
                padding: '0.2rem 0.5rem',
                borderRadius: '3px'
              }}>
                ACTIVE
              </span>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(0, 204, 255, 0.05)', 
            border: '1px solid rgba(0, 204, 255, 0.2)',
            borderRadius: '4px',
            padding: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ color: '#00ccff', fontWeight: 'bold', fontSize: '0.85rem' }}>PACKER-002</span>
              <span style={{ color: '#00ff41', fontSize: '0.75rem', marginLeft: '1rem' }}>
                {robotStatus.packer2.task}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#00ccff' }}>
                ⚡ {robotStatus.packer2.efficiency}%
              </span>
              <span style={{ 
                fontSize: '0.7rem', 
                color: '#00ccff',
                background: 'rgba(0, 204, 255, 0.2)',
                padding: '0.2rem 0.5rem',
                borderRadius: '3px'
              }}>
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI 비전 시스템 */}
      <div style={{
        background: 'rgba(138, 43, 226, 0.05)',
        border: '1px solid rgba(138, 43, 226, 0.3)',
        borderRadius: '4px',
        padding: '0.8rem',
        marginTop: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#8a2be2', fontWeight: 'bold', fontSize: '0.85rem' }}>
            📹 AI VISION SYSTEM
          </span>
          <span style={{ color: '#00ff41', fontSize: '0.8rem' }}>
            Accuracy: 99.9% | Error Rate: {stats.errorRate}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AutomationMonitor;
