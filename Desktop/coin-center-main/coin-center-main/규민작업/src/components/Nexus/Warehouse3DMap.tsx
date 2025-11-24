'use client';

import React, { useState, useEffect } from 'react';

interface Robot {
  id: string;
  zone: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  status: 'moving' | 'picking' | 'returning' | 'charging';
  battery: number;
  speed: number;
  currentTask: string;
}

const Warehouse3DMap = () => {
  const [robotPositions, setRobotPositions] = useState<Robot[]>([
    { id: 'AGV-001', zone: 'D-3', x: 55, y: 52, targetX: 25, targetY: 25, status: 'moving', battery: 87, speed: 0.3, currentTask: 'Pick Item #A-4523' },
    { id: 'AGV-002', zone: 'A-2', x: 20, y: 22, targetX: 80, targetY: 50, status: 'returning', battery: 92, speed: 0.35, currentTask: 'Return to Dock' },
    { id: 'AGV-003', zone: 'B-1', x: 55, y: 18, targetX: 15, targetY: 55, status: 'picking', battery: 34, speed: 0, currentTask: 'Charging' },
    { id: 'PACKER-001', zone: 'Pack-1', x: 82, y: 50, targetX: 82, targetY: 50, status: 'picking', battery: 100, speed: 0, currentTask: 'Packing #7842' },
    { id: 'PACKER-002', zone: 'Pack-2', x: 82, y: 65, targetX: 82, targetY: 65, status: 'picking', battery: 100, speed: 0, currentTask: 'Packing #7843' },
  ]);

  const [conveyorBelts, setConveyorBelts] = useState([
    { id: 'CB-1', startX: 42, startY: 10, endX: 42, endY: 38, active: true, itemsPerMin: 45 },
    { id: 'CB-2', startX: 78, startY: 38, endX: 78, endY: 72, active: true, itemsPerMin: 52 },
  ]);

  const zones = [
    { name: 'Zone A', code: 'A', x: 5, y: 10, width: 32, height: 28, activity: 'high', items: 3420, capacity: 5000, temp: 18.5, humidity: 45 },
    { name: 'Zone B', code: 'B', x: 42, y: 10, width: 32, height: 28, activity: 'medium', items: 2150, capacity: 5000, temp: 19.2, humidity: 48 },
    { name: 'Zone C', code: 'C', x: 5, y: 42, width: 32, height: 28, activity: 'low', items: 980, capacity: 5000, temp: 18.8, humidity: 46 },
    { name: 'Zone D', code: 'D', x: 42, y: 42, width: 32, height: 28, activity: 'high', items: 4890, capacity: 5000, temp: 20.1, humidity: 52 },
  ];

  const packingStations = [
    { name: 'Pack-1', x: 82, y: 48, efficiency: 98.5, itemsProcessed: 234, targetPerHour: 240 },
    { name: 'Pack-2', x: 82, y: 63, efficiency: 99.1, itemsProcessed: 241, targetPerHour: 240 },
  ];

  const chargingStations = [
    { id: 'CS-1', x: 15, y: 75, occupied: true, robotId: 'AGV-003' },
    { id: 'CS-2', x: 23, y: 75, occupied: false, robotId: null },
  ];

  const sensors = [
    { id: 'TEMP-A', zone: 'A', type: 'temperature', value: 18.5, status: 'normal' },
    { id: 'TEMP-B', zone: 'B', type: 'temperature', value: 19.2, status: 'normal' },
    { id: 'TEMP-C', zone: 'C', type: 'temperature', value: 18.8, status: 'normal' },
    { id: 'TEMP-D', zone: 'D', type: 'temperature', value: 20.1, status: 'warning' },
  ];

  // 로봇 자동 이동 (부드러운 경로)
  useEffect(() => {
    const interval = setInterval(() => {
      setRobotPositions(prev => prev.map(robot => {
        if (robot.status === 'charging' || robot.speed === 0) return robot;

        const dx = robot.targetX - robot.x;
        const dy = robot.targetY - robot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 0.5) {
          // 목표 도달 - 새 목표 설정
          const newTargets = [
            { x: 25, y: 25 }, { x: 55, y: 20 }, { x: 25, y: 55 }, 
            { x: 55, y: 55 }, { x: 80, y: 50 }
          ];
          const newTarget = newTargets[Math.floor(Math.random() * newTargets.length)];
          return { ...robot, targetX: newTarget.x, targetY: newTarget.y };
        }

        const moveX = (dx / distance) * robot.speed;
        const moveY = (dy / distance) * robot.speed;

        return {
          ...robot,
          x: robot.x + moveX,
          y: robot.y + moveY,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getActivityColor = (activity: string) => {
    switch(activity) {
      case 'high': return 'rgba(255, 0, 0, 0.25)';
      case 'medium': return 'rgba(255, 165, 0, 0.18)';
      case 'low': return 'rgba(0, 255, 65, 0.12)';
      default: return 'rgba(100, 100, 100, 0.1)';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'moving': return '#00ff41';
      case 'picking': return '#00ccff';
      case 'returning': return '#ffcc00';
      case 'charging': return '#ff3333';
      default: return '#ffffff';
    }
  };

  return (
    <div className="nexus-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="panel-title" style={{ margin: 0 }}>🗺️ REAL-TIME WAREHOUSE MAP</h3>
        <div style={{ fontSize: '0.7rem', color: '#00ccff' }}>
          <span style={{ marginRight: '1rem' }}>📍 5,000㎡ Facility</span>
          <span>🤖 {robotPositions.filter(r => r.status !== 'charging').length} Active Robots</span>
        </div>
      </div>
      
      <div style={{ 
        position: 'relative',
        width: '100%',
        height: '500px',
        background: 'rgba(0, 20, 0, 0.3)',
        border: '2px solid rgba(0, 255, 65, 0.4)',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
      }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* 고급 그리드 배경 */}
          <defs>
            <pattern id="smallGrid" width="2" height="2" patternUnits="userSpaceOnUse">
              <path d="M 2 0 L 0 0 0 2" fill="none" stroke="rgba(0, 255, 65, 0.08)" strokeWidth="0.1"/>
            </pattern>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="url(#smallGrid)"/>
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0, 255, 65, 0.15)" strokeWidth="0.3"/>
            </pattern>
            
            {/* 컨베이어 벨트 애니메이션 */}
            <pattern id="conveyor" width="4" height="2" patternUnits="userSpaceOnUse">
              <rect width="4" height="2" fill="rgba(0, 204, 255, 0.1)"/>
              <line x1="0" y1="1" x2="4" y2="1" stroke="#00ccff" strokeWidth="0.3" strokeDasharray="1,1">
                <animate attributeName="stroke-dashoffset" from="0" to="2" dur="2s" repeatCount="indefinite"/>
              </line>
            </pattern>
          </defs>
          
          <rect width="100" height="100" fill="url(#grid)" />

          {/* 컨베이어 벨트 */}
          {conveyorBelts.map((belt, idx) => (
            <g key={idx}>
              <line
                x1={belt.startX}
                y1={belt.startY}
                x2={belt.endX}
                y2={belt.endY}
                stroke="url(#conveyor)"
                strokeWidth="2"
              />
              <text
                x={(belt.startX + belt.endX) / 2}
                y={(belt.startY + belt.endY) / 2}
                textAnchor="middle"
                fill="#00ccff"
                fontSize="1.5"
              >
                {belt.itemsPerMin}/min
              </text>
            </g>
          ))}

          {/* 구역 (히트맵 + 상세 정보) */}
          {zones.map((zone, idx) => (
            <g key={idx}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                fill={getActivityColor(zone.activity)}
                stroke="#00ff41"
                strokeWidth="0.5"
                rx="1.5"
              />
              
              {/* 구역 헤더 */}
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height="6"
                fill="rgba(0, 255, 65, 0.15)"
                stroke="#00ff41"
                strokeWidth="0.3"
              />
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + 4}
                textAnchor="middle"
                fill="#00ff41"
                fontSize="3"
                fontWeight="bold"
              >
                {zone.name}
              </text>

              {/* 재고 정보 */}
              <text
                x={zone.x + 2}
                y={zone.y + 10}
                fill="#00ccff"
                fontSize="2"
              >
                📦 {zone.items.toLocaleString()} / {zone.capacity.toLocaleString()}
              </text>
              
              {/* 사용률 바 */}
              <rect
                x={zone.x + 2}
                y={zone.y + 12}
                width={zone.width - 4}
                height="1.5"
                fill="rgba(0, 0, 0, 0.5)"
                stroke="rgba(0, 255, 65, 0.3)"
                strokeWidth="0.2"
              />
              <rect
                x={zone.x + 2}
                y={zone.y + 12}
                width={(zone.width - 4) * (zone.items / zone.capacity)}
                height="1.5"
                fill={zone.items / zone.capacity > 0.9 ? '#ff3333' : '#00ff41'}
              />
              
              {/* 환경 센서 */}
              <text
                x={zone.x + 2}
                y={zone.y + 16}
                fill={zone.temp > 20 ? '#ffcc00' : '#00ff41'}
                fontSize="1.8"
              >
                🌡️ {zone.temp}°C
              </text>
              <text
                x={zone.x + 2}
                y={zone.y + 19}
                fill="#00ccff"
                fontSize="1.8"
              >
                💧 {zone.humidity}%
              </text>

              {/* Activity 인디케이터 */}
              <circle
                cx={zone.x + zone.width - 3}
                cy={zone.y + 3}
                r="1.5"
                fill={zone.activity === 'high' ? '#ff3333' : zone.activity === 'medium' ? '#ffcc00' : '#00ff41'}
              >
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur={zone.activity === 'high' ? '1s' : '2s'}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {/* 충전 스테이션 */}
          {chargingStations.map((station, idx) => (
            <g key={idx}>
              <rect
                x={station.x - 2.5}
                y={station.y - 2.5}
                width="5"
                height="5"
                fill={station.occupied ? 'rgba(255, 204, 0, 0.3)' : 'rgba(0, 255, 65, 0.2)'}
                stroke={station.occupied ? '#ffcc00' : '#00ff41'}
                strokeWidth="0.5"
                rx="0.5"
              />
              <text
                x={station.x}
                y={station.y + 0.8}
                textAnchor="middle"
                fill={station.occupied ? '#ffcc00' : '#00ff41'}
                fontSize="3"
              >
                ⚡
              </text>
              <text
                x={station.x}
                y={station.y + 4}
                textAnchor="middle"
                fill="#00ccff"
                fontSize="1.2"
              >
                {station.id}
              </text>
            </g>
          ))}

          {/* 포장 스테이션 (상세) */}
          {packingStations.map((station, idx) => (
            <g key={idx}>
              <rect
                x={station.x - 4}
                y={station.y - 4}
                width="8"
                height="8"
                fill="rgba(0, 204, 255, 0.25)"
                stroke="#00ccff"
                strokeWidth="0.6"
                rx="1"
              />
              <text
                x={station.x}
                y={station.y - 1}
                textAnchor="middle"
                fill="#00ccff"
                fontSize="4"
              >
                📦
              </text>
              <text
                x={station.x}
                y={station.y + 2.5}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="1.5"
                fontWeight="bold"
              >
                {station.name}
              </text>
              <text
                x={station.x}
                y={station.y + 4.5}
                textAnchor="middle"
                fill="#00ff41"
                fontSize="1.3"
              >
                {station.efficiency}%
              </text>
              
              {/* 처리량 바 */}
              <rect
                x={station.x - 3}
                y={station.y + 5.5}
                width="6"
                height="0.8"
                fill="rgba(0, 0, 0, 0.5)"
                stroke="rgba(0, 204, 255, 0.5)"
                strokeWidth="0.2"
              />
              <rect
                x={station.x - 3}
                y={station.y + 5.5}
                width={6 * (station.itemsProcessed / station.targetPerHour)}
                height="0.8"
                fill="#00ccff"
              />
            </g>
          ))}

          {/* 로봇 (실시간 이동 + 경로 표시) */}
          {robotPositions.map((robot, idx) => (
            <g key={idx}>
              {/* 로봇 경로선 */}
              <line
                x1={robot.x}
                y1={robot.y}
                x2={robot.targetX}
                y2={robot.targetY}
                stroke={getStatusColor(robot.status)}
                strokeWidth="0.2"
                strokeDasharray="1,1"
                opacity="0.4"
              />
              
              {/* 로봇 본체 */}
              <circle
                cx={robot.x}
                cy={robot.y}
                r="2.5"
                fill={getStatusColor(robot.status)}
                stroke="#ffffff"
                strokeWidth="0.4"
                filter="url(#glow)"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.6;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* 로봇 방향 표시 */}
              <line
                x1={robot.x}
                y1={robot.y}
                x2={robot.x + (robot.targetX - robot.x) * 0.1}
                y2={robot.y + (robot.targetY - robot.y) * 0.1}
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              
              {/* 로봇 ID */}
              <text
                x={robot.x}
                y={robot.y - 4}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="1.8"
                fontWeight="bold"
                style={{ textShadow: '0 0 3px black' }}
              >
                {robot.id}
              </text>
              
              {/* 배터리 표시 */}
              <rect
                x={robot.x - 2}
                y={robot.y + 3}
                width="4"
                height="1"
                fill="rgba(0, 0, 0, 0.7)"
                stroke={robot.battery > 50 ? '#00ff41' : robot.battery > 20 ? '#ffcc00' : '#ff3333'}
                strokeWidth="0.2"
                rx="0.2"
              />
              <rect
                x={robot.x - 2}
                y={robot.y + 3}
                width={4 * (robot.battery / 100)}
                height="1"
                fill={robot.battery > 50 ? '#00ff41' : robot.battery > 20 ? '#ffcc00' : '#ff3333'}
                rx="0.2"
              />
              <text
                x={robot.x}
                y={robot.y + 3.7}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="0.8"
              >
                {robot.battery}%
              </text>
            </g>
          ))}

          {/* 글로우 효과 필터 */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* 상세 범례 */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.85)',
          padding: '0.8rem',
          borderRadius: '6px',
          border: '1px solid rgba(0, 255, 65, 0.3)',
          fontSize: '0.7rem',
          minWidth: '200px'
        }}>
          <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '1px solid rgba(0, 255, 65, 0.3)', paddingBottom: '0.3rem' }}>
            LEGEND
          </div>
          <div style={{ color: '#ff0000', marginBottom: '0.3rem' }}>🔴 High Activity (&gt;80%)</div>
          <div style={{ color: '#ffa500', marginBottom: '0.3rem' }}>🟠 Medium Activity (50-80%)</div>
          <div style={{ color: '#00ff41', marginBottom: '0.5rem' }}>🟢 Low Activity (&lt;50%)</div>
          <div style={{ borderTop: '1px solid rgba(100, 100, 100, 0.3)', paddingTop: '0.5rem' }}>
            <div style={{ color: '#00ff41', marginBottom: '0.3rem' }}>● AGV Moving</div>
            <div style={{ color: '#00ccff', marginBottom: '0.3rem' }}>● AGV Picking</div>
            <div style={{ color: '#ffcc00', marginBottom: '0.3rem' }}>● AGV Returning</div>
            <div style={{ color: '#ff3333', marginBottom: '0.5rem' }}>● Charging</div>
          </div>
          <div style={{ borderTop: '1px solid rgba(100, 100, 100, 0.3)', paddingTop: '0.5rem' }}>
            <div style={{ color: '#00ccff', marginBottom: '0.3rem' }}>📦 Packing Station</div>
            <div style={{ color: '#00ff41', marginBottom: '0.3rem' }}>⚡ Charging Station</div>
            <div style={{ color: '#00ccff' }}>→ Conveyor Belt</div>
          </div>
        </div>

        {/* 실시간 통계 오버레이 */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0, 0, 0, 0.85)',
          padding: '0.8rem',
          borderRadius: '6px',
          border: '1px solid rgba(0, 204, 255, 0.3)',
          fontSize: '0.65rem',
          minWidth: '180px'
        }}>
          <div style={{ color: '#00ccff', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            FACILITY STATUS
          </div>
          <div style={{ color: '#00ff41', marginBottom: '0.2rem' }}>
            Total Items: {zones.reduce((sum, z) => sum + z.items, 0).toLocaleString()}
          </div>
          <div style={{ color: '#00ff41', marginBottom: '0.2rem' }}>
            Capacity: {((zones.reduce((sum, z) => sum + z.items, 0) / zones.reduce((sum, z) => sum + z.capacity, 0)) * 100).toFixed(1)}%
          </div>
          <div style={{ color: sensors.some(s => s.status === 'warning') ? '#ffcc00' : '#00ff41', marginBottom: '0.2rem' }}>
            Avg Temp: {(sensors.reduce((sum, s) => sum + s.value, 0) / sensors.length).toFixed(1)}°C
          </div>
          <div style={{ color: '#00ccff' }}>
            Robots Active: {robotPositions.filter(r => r.status !== 'charging').length}/{robotPositions.length}
          </div>
        </div>
      </div>

      {/* 로봇 상세 정보 테이블 */}
      <div style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0, 255, 65, 0.3)' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Robot ID</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Status</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Task</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Battery</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Location</th>
            </tr>
          </thead>
          <tbody>
            {robotPositions.map((robot, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 100, 100, 0.2)' }}>
                <td style={{ padding: '0.5rem', color: '#00ccff', fontWeight: 'bold' }}>{robot.id}</td>
                <td style={{ padding: '0.5rem' }}>
                  <span style={{
                    background: `${getStatusColor(robot.status)}20`,
                    color: getStatusColor(robot.status),
                    padding: '0.2rem 0.5rem',
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase'
                  }}>
                    {robot.status}
                  </span>
                </td>
                <td style={{ padding: '0.5rem', color: '#00ff41' }}>{robot.currentTask}</td>
                <td style={{ padding: '0.5rem' }}>
                  <span style={{ color: robot.battery > 50 ? '#00ff41' : robot.battery > 20 ? '#ffcc00' : '#ff3333' }}>
                    {robot.battery}%
                  </span>
                </td>
                <td style={{ padding: '0.5rem', color: '#00ccff', fontFamily: 'Courier New, monospace' }}>
                  ({robot.x.toFixed(1)}, {robot.y.toFixed(1)})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Warehouse3DMap;
