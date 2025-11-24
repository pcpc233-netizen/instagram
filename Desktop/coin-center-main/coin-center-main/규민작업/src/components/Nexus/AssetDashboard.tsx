'use client';

import React from 'react';

const AssetDashboard = () => {
  // 가상의 데이터 (실제 API 연동 전 하드코딩)
  const assetData = {
    kausBalance: "1,507,666", // 보유 코인
    inventoryValue: "45,230,000,000", // 재고 가치 (KRW)
    totalOperatedItems: "14,203" // 관리 중인 물품 수
  };

  return (
    <div className="nexus-panel asset-panel">
      <h3 className="panel-title">ASSET VALUATION (Real-time)</h3>
      
      <div className="value-row">
        <span className="label">TOTAL ASSETS (KRW)</span>
        <span className="value highlight">₩ {assetData.inventoryValue}</span>
      </div>

      <div className="sub-stats">
        <div className="stat-box">
          <span className="label">KAUS Holdings</span>
          <span className="value">{assetData.kausBalance} KAUS</span>
        </div>
        <div className="stat-box">
          <span className="label">Active SKU</span>
          <span className="value">{assetData.totalOperatedItems} Unit</span>
        </div>
      </div>
      
      <div className="status-indicator">
        <span className="dot green"></span> SYSTEM OPTIMAL
      </div>
    </div>
  );
};

export default AssetDashboard;
