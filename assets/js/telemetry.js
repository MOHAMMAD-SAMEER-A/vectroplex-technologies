/**
 * Vectroplex Technologies - Real-Time Cyber-Physical Telemetry Engine
 * Simulates edge micro-branch telemetry, OCR engine throughput, and geo-mesh pings.
 */

(function () {
  const edgeNodes = [
    { id: "TN-CBE-01", location: "Coimbatore Peelamedu Pilot", status: "ONLINE", latency: 11, temp: 34.2, tamper: "LOCKED", tps: 18.4 },
    { id: "TN-CHE-04", location: "Chennai OMR FinTech Hub", status: "ONLINE", latency: 14, temp: 36.1, tamper: "LOCKED", tps: 27.8 },
    { id: "KA-BLR-02", location: "Bengaluru Koramangala Edge", status: "ONLINE", latency: 9, temp: 33.8, tamper: "LOCKED", tps: 34.1 },
    { id: "TS-HYD-03", location: "Hyderabad Hitec City Cluster", status: "ONLINE", latency: 15, temp: 35.0, tamper: "LOCKED", tps: 21.6 },
    { id: "TN-MDU-01", location: "Madurai Retail Merchant Hub", status: "ONLINE", latency: 18, temp: 37.4, tamper: "LOCKED", tps: 14.2 },
  ];

  const logPool = [
    "Optical OCR Intake: Verified Aadhaar / Land record digest (0.018s latency)",
    "FIPS 140-3 Hardware Cryptographic Enclave: Session ephemeral key rotated",
    "Mesh Pre-Booking Token #VXP-8829 matched with 3 nearby hardware merchants",
    "Autonomous Terminal #TN-CBE-01 vault door magnetic interlock engaged",
    "AI Tax Compliance Engine: Batch 45 GSTIN B2B invoices reconciled (ITC OK)",
    "Edge Tamper Watchdog: Accelerometer & optical intrusion sensors nominal",
    "Hyperlocal Merchant Stock Heartbeat: 1,420 SKUs synchronized across 12 stores",
    "Voice KYC biometric audio spectral envelope authenticated at edge node",
    "Zero-trust mTLS tunnel established with central financial clearing relay",
    "Low-power solar fallback power bank nominal: 98.4% battery charge"
  ];

  function getTimestamp() {
    const d = new Date();
    return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
  }

  function updateLiveMetrics() {
    const tpsElement = document.getElementById('telemetry-tps');
    const latencyElement = document.getElementById('telemetry-latency');
    const uptimeElement = document.getElementById('telemetry-uptime');
    const activeNodesElement = document.getElementById('telemetry-nodes');

    if (tpsElement) {
      const baseTps = 118 + Math.floor(Math.random() * 24);
      tpsElement.innerText = baseTps + ' req/s';
    }

    if (latencyElement) {
      const baseLat = (12.4 + (Math.random() * 2.2 - 1.1)).toFixed(1);
      latencyElement.innerText = baseLat + ' ms';
    }

    if (uptimeElement) {
      uptimeElement.innerText = '99.98%';
    }

    if (activeNodesElement) {
      activeNodesElement.innerText = '48 Nodes (Active)';
    }
  }

  function appendTelemetryLog() {
    const logContainer = document.getElementById('telemetry-log-stream');
    if (!logContainer) return;

    const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
    const randomNode = edgeNodes[Math.floor(Math.random() * edgeNodes.length)].id;
    const time = getTimestamp();

    const logEntry = document.createElement('div');
    logEntry.className = 'font-mono text-xs flex items-start gap-2 py-1 border-b border-slate-900/60 hover:bg-slate-900/30 transition-colors';
    logEntry.innerHTML = `
      <span class="text-slate-500 shrink-0">[${time}]</span>
      <span class="text-sky-400 font-semibold shrink-0">[${randomNode}]</span>
      <span class="text-slate-300 leading-snug">${randomLog}</span>
    `;

    logContainer.prepend(logEntry);

    // Keep log length manageable
    while (logContainer.children.length > 25) {
      logContainer.removeChild(logContainer.lastChild);
    }
  }

  window.initTelemetry = function() {
    updateLiveMetrics();
    setInterval(updateLiveMetrics, 3500);

    // Initial logs fill
    const logContainer = document.getElementById('telemetry-log-stream');
    if (logContainer && logContainer.children.length === 0) {
      for (let i = 0; i < 6; i++) {
        appendTelemetryLog();
      }
    }

    setInterval(appendTelemetryLog, 4200);
  };

  // Expose node test method
  window.testNodePing = function(nodeId, callback) {
    if (window.vectroSound) window.vectroSound.scan();
    const startTime = performance.now();
    setTimeout(() => {
      const duration = (performance.now() - startTime).toFixed(1);
      if (window.vectroSound) window.vectroSound.success();
      if (callback) callback({ nodeId, duration, status: "NOMINAL", enclave: "FIPS 140-3 ACTIVE" });
    }, 180 + Math.random() * 120);
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.initTelemetry();
  });
})();
