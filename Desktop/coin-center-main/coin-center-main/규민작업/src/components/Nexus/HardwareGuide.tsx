'use client';

import React, { useState } from 'react';

interface HardwareComponent {
  name: string;
  model: string;
  price: string;
  quantity: number;
  specs: string;
  supplier: string;
}

interface DeploymentStep {
  step: number;
  title: string;
  description: string;
  commands?: string[];
  time: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const HardwareGuide = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rfid' | 'api' | 'deployment' | 'troubleshoot'>('overview');

  const hardwareComponents: HardwareComponent[] = [
    { name: 'Raspberry Pi 4 Model B', model: '8GB RAM', price: '₩85,000', quantity: 10, specs: 'Quad-core ARM Cortex-A72, 2.4GHz WiFi, Bluetooth 5.0', supplier: 'RS Components' },
    { name: 'RC522 RFID Reader', model: 'MFRC522', price: '₩5,200', quantity: 10, specs: '13.56MHz, SPI interface, Read distance: 5-7cm', supplier: 'AliExpress' },
    { name: 'RFID Tags (125kHz)', model: 'EM4100', price: '₩180', quantity: 10000, specs: 'Read-only, 64-bit ID, ISO11784/11785', supplier: 'Taobao' },
    { name: 'Power Supply (5V/3A)', model: 'USB-C PD', price: '₩12,000', quantity: 10, specs: '15W official adapter, overcurrent protection', supplier: 'CanaKit' },
    { name: 'MicroSD Card', model: 'SanDisk 64GB', price: '₩14,000', quantity: 10, specs: 'Class 10, UHS-I, 100MB/s read', supplier: 'Amazon' },
    { name: 'Jumper Wires (F/F)', model: '40pin 20cm', price: '₩3,500', quantity: 5, specs: '40-pin ribbon cable, Dupont connector', supplier: 'Eleparts' },
    { name: 'Ethernet Cable (CAT6)', model: '3m shielded', price: '₩8,000', quantity: 10, specs: '10Gbps, RJ45, gold-plated', supplier: 'Monoprice' },
    { name: 'Acrylic Case', model: 'Transparent', price: '₩7,500', quantity: 10, specs: 'Heat dissipation, fan mount', supplier: 'iCODIS' },
  ];

  const deploymentSteps: DeploymentStep[] = [
    { 
      step: 1, 
      title: 'OS Installation', 
      description: 'Flash Raspberry Pi OS Lite (64-bit) to microSD card',
      commands: ['sudo dd if=raspios.img of=/dev/sdX bs=4M status=progress', 'sync'],
      time: '15 min',
      difficulty: 'easy'
    },
    {
      step: 2,
      title: 'SSH & Network Setup',
      description: 'Enable SSH and configure WiFi for headless operation',
      commands: ['touch /boot/ssh', 'nano /boot/wpa_supplicant.conf'],
      time: '10 min',
      difficulty: 'easy'
    },
    {
      step: 3,
      title: 'System Update',
      description: 'Update package lists and upgrade all packages',
      commands: ['sudo apt update', 'sudo apt upgrade -y', 'sudo reboot'],
      time: '20 min',
      difficulty: 'easy'
    },
    {
      step: 4,
      title: 'Python Environment',
      description: 'Install Python 3.11+ and required libraries',
      commands: ['sudo apt install python3-pip python3-venv -y', 'python3 -m venv /opt/kaus-env', 'source /opt/kaus-env/bin/activate', 'pip install spidev mfrc522 requests'],
      time: '15 min',
      difficulty: 'medium'
    },
    {
      step: 5,
      title: 'SPI Interface Enable',
      description: 'Enable SPI communication for RFID reader',
      commands: ['sudo raspi-config nonint do_spi 0', 'sudo reboot'],
      time: '5 min',
      difficulty: 'easy'
    },
    {
      step: 6,
      title: 'RFID Wiring',
      description: 'Connect RC522 module to Raspberry Pi GPIO pins',
      time: '10 min',
      difficulty: 'medium'
    },
    {
      step: 7,
      title: 'KAUS Scanner Deploy',
      description: 'Clone repository and configure API endpoints',
      commands: ['git clone https://github.com/kaus/scanner.git', 'cd scanner', 'cp config.example.json config.json', 'nano config.json'],
      time: '10 min',
      difficulty: 'medium'
    },
    {
      step: 8,
      title: 'Systemd Service',
      description: 'Create auto-start service for production',
      commands: ['sudo nano /etc/systemd/system/kaus-scanner.service', 'sudo systemctl enable kaus-scanner', 'sudo systemctl start kaus-scanner'],
      time: '10 min',
      difficulty: 'hard'
    },
  ];

  const troubleshootIssues = [
    { issue: 'RFID not detected', solution: 'Check SPI enabled: lsmod | grep spi. Verify wiring connections.', severity: 'critical' },
    { issue: 'Read distance too short', solution: 'Ensure 3.3V power supply. Check antenna orientation. Remove metal objects nearby.', severity: 'warning' },
    { issue: 'API connection failed', solution: 'Verify network connectivity: ping api.kaus.io. Check firewall rules.', severity: 'critical' },
    { issue: 'Permission denied (GPIO)', solution: 'Add user to gpio group: sudo usermod -a -G gpio $USER. Reboot.', severity: 'warning' },
    { issue: 'Service crashes on boot', solution: 'Check journalctl -u kaus-scanner. Verify Python dependencies installed.', severity: 'critical' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return '#00ff41';
      case 'medium': return '#ffcc00';
      case 'hard': return '#ff3333';
      default: return '#00ccff';
    }
  };

  return (
    <div className="nexus-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="panel-title" style={{ margin: 0 }}>🔧 HARDWARE INTEGRATION GUIDE</h3>
        <div style={{ fontSize: '0.7rem', color: '#00ccff' }}>
          Total Investment: ₩{hardwareComponents.reduce((sum, c) => sum + parseInt(c.price.replace(/[^\d]/g, '')) * c.quantity, 0).toLocaleString()}
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid rgba(0, 255, 65, 0.3)',
        paddingBottom: '0.5rem'
      }}>
        {[
          { id: 'overview', label: '📦 OVERVIEW', icon: '📦' },
          { id: 'rfid', label: '📡 RFID SETUP', icon: '📡' },
          { id: 'api', label: '🔌 API INTEGRATION', icon: '🔌' },
          { id: 'deployment', label: '🚀 DEPLOYMENT', icon: '🚀' },
          { id: 'troubleshoot', label: '🛠️ TROUBLESHOOTING', icon: '🛠️' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              background: activeTab === tab.id ? 'rgba(0, 255, 65, 0.2)' : 'transparent',
              border: activeTab === tab.id ? '1px solid #00ff41' : '1px solid rgba(0, 255, 65, 0.3)',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              color: activeTab === tab.id ? '#00ff41' : '#00ccff',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW 탭 */}
      {activeTab === 'overview' && (
        <div>
          <h4 style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '0.5rem' }}>
            💰 COMPLETE HARDWARE BOM (Bill of Materials)
          </h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', marginBottom: '1.5rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0, 255, 65, 0.3)' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Component</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Model</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', color: '#00ff41' }}>Unit Price</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', color: '#00ff41' }}>Qty</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', color: '#00ff41' }}>Total</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', color: '#00ff41' }}>Supplier</th>
              </tr>
            </thead>
            <tbody>
              {hardwareComponents.map((item, idx) => {
                const totalPrice = parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity;
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 100, 100, 0.2)' }}>
                    <td style={{ padding: '0.5rem', color: '#ffffff', fontWeight: 'bold' }}>{item.name}</td>
                    <td style={{ padding: '0.5rem', color: '#00ccff' }}>{item.model}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', color: '#00ff41' }}>{item.price}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'center', color: '#ffffff' }}>{item.quantity}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', color: '#ffcc00', fontWeight: 'bold' }}>₩{totalPrice.toLocaleString()}</td>
                    <td style={{ padding: '0.5rem', color: '#00ccff', fontSize: '0.7rem' }}>{item.supplier}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid rgba(0, 255, 65, 0.5)', fontWeight: 'bold' }}>
                <td colSpan={4} style={{ padding: '0.8rem', textAlign: 'right', color: '#00ff41', fontSize: '0.9rem' }}>
                  TOTAL PROJECT COST:
                </td>
                <td style={{ padding: '0.8rem', textAlign: 'right', color: '#00ff41', fontSize: '1.2rem' }}>
                  ₩{hardwareComponents.reduce((sum, c) => sum + parseInt(c.price.replace(/[^\d]/g, '')) * c.quantity, 0).toLocaleString()}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          {/* 상세 스펙 */}
          <h4 style={{ color: '#00ccff', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 204, 255, 0.2)', paddingBottom: '0.5rem' }}>
            📋 TECHNICAL SPECIFICATIONS
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {hardwareComponents.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(0, 20, 0, 0.3)',
                  border: '1px solid rgba(0, 255, 65, 0.2)',
                  borderRadius: '6px',
                  padding: '1rem'
                }}
              >
                <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  {item.name}
                </div>
                <div style={{ color: '#00ccff', fontSize: '0.7rem', marginBottom: '0.3rem' }}>
                  Model: {item.model}
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.7rem', lineHeight: '1.4' }}>
                  {item.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RFID SETUP 탭 */}
      {activeTab === 'rfid' && (
        <div>
          <h4 style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '0.5rem' }}>
            🔌 RC522 WIRING DIAGRAM
          </h4>
          
          {/* 배선도 */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '2px solid rgba(0, 255, 65, 0.4)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            fontFamily: 'Courier New, monospace'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  RC522 PINS
                </div>
                {[
                  { pin: 'SDA', gpio: 'GPIO 8 (CE0)', color: '#ffcc00' },
                  { pin: 'SCK', gpio: 'GPIO 11 (SCLK)', color: '#00ccff' },
                  { pin: 'MOSI', gpio: 'GPIO 10 (MOSI)', color: '#ff3333' },
                  { pin: 'MISO', gpio: 'GPIO 9 (MISO)', color: '#00ff41' },
                  { pin: 'IRQ', gpio: 'Not Connected', color: '#888888' },
                  { pin: 'GND', gpio: 'Ground (Pin 6)', color: '#000000' },
                  { pin: 'RST', gpio: 'GPIO 25', color: '#ff00ff' },
                  { pin: '3.3V', gpio: '3.3V (Pin 1)', color: '#ff6600' },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    marginBottom: '0.3rem',
                    borderLeft: `4px solid ${item.color}`,
                    borderRadius: '4px'
                  }}>
                    <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{item.pin}</span>
                    <span style={{ color: item.color }}>→</span>
                    <span style={{ color: '#00ccff' }}>{item.gpio}</span>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ color: '#00ccff', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  RASPBERRY PI GPIO
                </div>
                <pre style={{
                  color: '#00ff41',
                  fontSize: '0.7rem',
                  lineHeight: '1.6',
                  background: 'rgba(0, 20, 0, 0.5)',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto'
                }}>
{`     3.3V (1) ●━━━━━━━● (2)  5V
     GPIO 2 (3) ●      ● (4)  5V
     GPIO 3 (5) ●      ● (6)  GND ← RC522 GND
     GPIO 4 (7) ●      ● (8)  GPIO 14
        GND (9) ●      ● (10) GPIO 15
    GPIO 17 (11) ●      ● (12) GPIO 18
    GPIO 27 (13) ●      ● (14) GND
    GPIO 22 (15) ●      ● (16) GPIO 23
       3.3V (17) ●      ● (18) GPIO 24
 GPIO 10 (19) ●━━━━━━━● (20) GND
  GPIO 9 (21) ●━━━━━━━● (22) GPIO 25 ← RC522 RST
 GPIO 11 (23) ●━━━━━━━● (24) GPIO 8 ← RC522 SDA`}
                </pre>
              </div>
            </div>
          </div>

          {/* Python 코드 */}
          <h4 style={{ color: '#00ccff', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 204, 255, 0.2)', paddingBottom: '0.5rem' }}>
            🐍 PYTHON TEST CODE
          </h4>
          <pre style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(0, 255, 65, 0.3)',
            borderRadius: '6px',
            padding: '1rem',
            color: '#00ff41',
            fontSize: '0.75rem',
            overflowX: 'auto',
            lineHeight: '1.5'
          }}>
{`#!/usr/bin/env python3
# KAUS RFID Scanner - Test Program
# Requirements: pip install spidev mfrc522

import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import time

reader = SimpleMFRC522()

try:
    print("🔍 KAUS RFID Scanner Ready...")
    print("📡 Place RFID tag near reader")
    print("-" * 40)
    
    while True:
        id, text = reader.read()
        print(f"✅ Tag Detected!")
        print(f"   ID: {id}")
        print(f"   Data: {text}")
        print(f"   Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 40)
        
        # Send to KAUS API (Next step: see API tab)
        # requests.post('https://api.kaus.io/scan', json={'id': id, 'data': text})
        
        time.sleep(1)
        
except KeyboardInterrupt:
    print("\\n🛑 Scanner stopped by user")
    
finally:
    GPIO.cleanup()
    print("✅ GPIO cleanup complete")`}
          </pre>
        </div>
      )}

      {/* API INTEGRATION 탭 */}
      {activeTab === 'api' && (
        <div>
          <h4 style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '0.5rem' }}>
            🌐 KAUS API ENDPOINTS
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { method: 'POST', endpoint: '/api/scan', description: 'Record RFID scan event', body: '{"tag_id": "ABC123", "location": "Zone-A", "timestamp": 1699876543}' },
              { method: 'POST', endpoint: '/api/inventory/update', description: 'Update item location', body: '{"item_id": "SKU-4523", "zone": "D-3", "status": "in_transit"}' },
              { method: 'GET', endpoint: '/api/robots/status', description: 'Get AGV fleet status', body: null },
              { method: 'POST', endpoint: '/api/blockchain/verify', description: 'Verify product authenticity', body: '{"nft_id": "0x742d...", "hash": "SHA256..."}' },
            ].map((api, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(0, 20, 0, 0.3)',
                  border: '1px solid rgba(0, 255, 65, 0.3)',
                  borderRadius: '6px',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: api.method === 'POST' ? 'rgba(0, 204, 255, 0.3)' : 'rgba(0, 255, 65, 0.3)',
                    color: api.method === 'POST' ? '#00ccff' : '#00ff41',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {api.method}
                  </span>
                  <span style={{ color: '#00ff41', fontFamily: 'Courier New, monospace', fontSize: '0.85rem' }}>
                    {api.endpoint}
                  </span>
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  {api.description}
                </div>
                {api.body && (
                  <pre style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    color: '#00ccff',
                    fontSize: '0.7rem',
                    overflow: 'auto'
                  }}>
                    {api.body}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Python API 연동 코드 */}
          <h4 style={{ color: '#00ccff', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 204, 255, 0.2)', paddingBottom: '0.5rem' }}>
            🔌 PYTHON API CLIENT
          </h4>
          <pre style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(0, 204, 255, 0.3)',
            borderRadius: '6px',
            padding: '1rem',
            color: '#00ccff',
            fontSize: '0.75rem',
            overflowX: 'auto',
            lineHeight: '1.5'
          }}>
{`#!/usr/bin/env python3
# KAUS API Client with Blockchain Integration

import requests
import hashlib
import time

API_BASE = "https://api.kaus.io"
API_KEY = "your_api_key_here"

class KAUSClient:
    def __init__(self, api_key):
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def scan_tag(self, tag_id, location):
        """Record RFID scan event"""
        payload = {
            "tag_id": tag_id,
            "location": location,
            "timestamp": int(time.time()),
            "hash": self._generate_hash(tag_id)
        }
        response = requests.post(
            f"{API_BASE}/api/scan",
            json=payload,
            headers=self.headers
        )
        return response.json()
    
    def update_inventory(self, item_id, zone, status):
        """Update item location in warehouse"""
        payload = {
            "item_id": item_id,
            "zone": zone,
            "status": status,
            "updated_at": int(time.time())
        }
        response = requests.post(
            f"{API_BASE}/api/inventory/update",
            json=payload,
            headers=self.headers
        )
        return response.json()
    
    def verify_blockchain(self, nft_id, product_hash):
        """Verify product authenticity on KAUS blockchain"""
        payload = {
            "nft_id": nft_id,
            "hash": product_hash,
            "timestamp": int(time.time())
        }
        response = requests.post(
            f"{API_BASE}/api/blockchain/verify",
            json=payload,
            headers=self.headers
        )
        return response.json()
    
    def _generate_hash(self, data):
        """Generate SHA-256 hash for blockchain"""
        return hashlib.sha256(data.encode()).hexdigest()

# Usage Example
client = KAUSClient(API_KEY)
result = client.scan_tag("ABC123", "Zone-A")
print(f"✅ Scan recorded: {result}")`}
          </pre>
        </div>
      )}

      {/* DEPLOYMENT 탭 */}
      {activeTab === 'deployment' && (
        <div>
          <h4 style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '0.5rem' }}>
            🚀 STEP-BY-STEP DEPLOYMENT GUIDE
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {deploymentSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(0, 20, 0, 0.3)',
                  border: `2px solid ${getDifficultyColor(step.difficulty)}`,
                  borderLeft: `6px solid ${getDifficultyColor(step.difficulty)}`,
                  borderRadius: '6px',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      background: getDifficultyColor(step.difficulty),
                      color: 'white',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '50%',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      minWidth: '30px',
                      textAlign: 'center'
                    }}>
                      {step.step}
                    </span>
                    <span style={{ color: '#00ff41', fontSize: '0.9rem', fontWeight: 'bold' }}>
                      {step.title}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem' }}>
                    <span style={{
                      background: `${getDifficultyColor(step.difficulty)}20`,
                      color: getDifficultyColor(step.difficulty),
                      padding: '0.2rem 0.5rem',
                      borderRadius: '3px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold'
                    }}>
                      {step.difficulty}
                    </span>
                    <span style={{ color: '#00ccff' }}>
                      ⏱️ {step.time}
                    </span>
                  </div>
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.75rem', marginBottom: '0.5rem', paddingLeft: '3rem' }}>
                  {step.description}
                </div>
                {step.commands && (
                  <pre style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '0.8rem',
                    borderRadius: '4px',
                    color: '#00ccff',
                    fontSize: '0.7rem',
                    marginLeft: '3rem',
                    overflow: 'auto',
                    border: '1px solid rgba(0, 204, 255, 0.3)'
                  }}>
                    {step.commands.join('\n')}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* 총 소요 시간 */}
          <div style={{
            marginTop: '1.5rem',
            background: 'rgba(0, 204, 255, 0.1)',
            border: '1px solid rgba(0, 204, 255, 0.3)',
            borderRadius: '6px',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ color: '#00ccff', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              TOTAL DEPLOYMENT TIME
            </div>
            <div style={{ color: '#00ff41', fontSize: '1.5rem', fontWeight: 'bold' }}>
              ~95 minutes
            </div>
            <div style={{ color: '#ffffff', fontSize: '0.7rem', marginTop: '0.3rem' }}>
              (Excluding package download time)
            </div>
          </div>
        </div>
      )}

      {/* TROUBLESHOOTING 탭 */}
      {activeTab === 'troubleshoot' && (
        <div>
          <h4 style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 65, 0.2)', paddingBottom: '0.5rem' }}>
            🛠️ COMMON ISSUES & SOLUTIONS
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {troubleshootIssues.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: item.severity === 'critical' ? 'rgba(255, 51, 51, 0.1)' : 'rgba(255, 204, 0, 0.1)',
                  border: `2px solid ${item.severity === 'critical' ? '#ff3333' : '#ffcc00'}`,
                  borderLeft: `6px solid ${item.severity === 'critical' ? '#ff3333' : '#ffcc00'}`,
                  borderRadius: '6px',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: item.severity === 'critical' ? '#ff3333' : '#ffcc00',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '3px',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {item.severity}
                  </span>
                  <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {item.issue}
                  </span>
                </div>
                <div style={{
                  color: '#00ff41',
                  fontSize: '0.75rem',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid rgba(0, 255, 65, 0.3)',
                  marginLeft: '0.5rem'
                }}>
                  💡 Solution: {item.solution}
                </div>
              </div>
            ))}
          </div>

          {/* 추가 리소스 */}
          <div style={{
            marginTop: '1.5rem',
            background: 'rgba(0, 204, 255, 0.1)',
            border: '1px solid rgba(0, 204, 255, 0.3)',
            borderRadius: '6px',
            padding: '1rem'
          }}>
            <h4 style={{ color: '#00ccff', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
              📚 ADDITIONAL RESOURCES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
              <div style={{ color: '#00ff41' }}>
                📖 Official Documentation: <a href="https://docs.kaus.io" target="_blank" style={{ color: '#00ccff' }}>docs.kaus.io</a>
              </div>
              <div style={{ color: '#00ff41' }}>
                💬 Community Forum: <a href="https://forum.kaus.io" target="_blank" style={{ color: '#00ccff' }}>forum.kaus.io</a>
              </div>
              <div style={{ color: '#00ff41' }}>
                📧 Technical Support: support@kaus.io
              </div>
              <div style={{ color: '#00ff41' }}>
                🐙 GitHub Repository: <a href="https://github.com/kaus/scanner" target="_blank" style={{ color: '#00ccff' }}>github.com/kaus/scanner</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HardwareGuide;
