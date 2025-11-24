'use client';

import React, { useState, useEffect } from 'react';

const LiveLogTicker = () => {
  const [logs, setLogs] = useState<string[]>([]);

  // 가상의 로그 데이터 뱅크
  const logMessages = [
    "[INFO] Zone-D Temp Check: 18.5°C (Normal)",
    "[BLOCKCHAIN] Block #829102 Validated",
    "[INBOUND] Truck #55 Arrived at Gate 3",
    "[AI-SCAN] Item #99203 Verified (Accuracy 99.9%)",
    "[NFT] Dynamic Metadata Updated: Item #302",
    "[AUTH] User Access: COO_Master_Key",
    "[SUPPLY] Inventory Updated: +2,340 Units",
    "[QUALITY] AI Quality Check: 99.7% Pass Rate",
    "[SHIPPING] Container #A-7742 Departed",
    "[SECURITY] Blockchain Anchor: Hash Verified"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
      const timestamp = new Date().toLocaleTimeString();
      const newLog = `[${timestamp}] ${randomMsg}`;

      setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 10)); // 최신 10개만 유지
    }, 1500); // 1.5초마다 갱신

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="nexus-panel log-panel">
      <h3 className="panel-title">SYSTEM LOG STREAM</h3>
      <div className="log-container">
        {logs.map((log, index) => (
          <div key={index} className="log-item">
            <span className="cursor">&gt;</span> {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveLogTicker;
