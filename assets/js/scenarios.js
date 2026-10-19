/**
 * Vectroplex Technologies - Real-World Deployment Scenarios Interactive Engine
 * Provides tabbed scenario inspection, operational metrics, and telemetry correlation.
 */

window.scenarioViewer = {
  activeScenario: 'banking',

  scenarios: {
    banking: {
      badge: "Cyber-Physical FinTech • Edge Hardware",
      title: "Semi-Urban & Rural Unstaffed Banking Inclusivity",
      subtitle: "Deploying self-contained autonomous micro-branches in unbanked tier-2/3 regions.",
      challenge: "Financial institutions struggle with the high CapEx (₹15L+) and recurring branch staffing costs needed to serve semi-urban and rural centers. As a result, millions of citizens must commute 20+ km for basic loan collateral deposits, document attestation, and secure physical filings.",
      solution: "Vectroplex engineers autonomous unstaffed terminals housed in 3mm hardened cold-rolled steel. Integrated with dual-spectrum optical scanners, biometrics, multi-lingual voice guidance, and FIPS 140-3 cryptographic enclaves, citizens authenticate and deposit physical records 24/7 without on-site branch staff.",
      architecture: [
        "Broadcom BCM2711 + ESP32-S3 dual-core redundant hardware watchdog",
        "Hardware security enclave (Microchip ATECC608B + TPM 2.0)",
        "Zero-voltage tamper detection with instantaneous memory purge",
        "Solar DC array input + LiFePO4 battery for 48-hour continuous power autonomy"
      ],
      metrics: [
        { label: "OpEx Reduction", val: "89%", desc: "vs. staffed brick-and-mortar branch" },
        { label: "Service Availability", val: "24/7/365", desc: "Zero downtime unstaffed operations" },
        { label: "Average Session Time", val: "2.4 mins", desc: "From biometric scan to vault custody" },
        { label: "Hardware Tamper Incidents", val: "0 Breaches", desc: "Across 48 pilot test nodes" }
      ],
      statusText: "Pilot Validated across Peelamedu & Coimbatore Test Nodes",
      futurePlatform: "Dedicated VectroBank Platform Launching in Phase 2"
    },
    tax: {
      badge: "Automated Fiscal Intelligence • NLP & Rules",
      title: "Enterprise & MSME High-Volume Tax & ITC Automation",
      subtitle: "Eliminating manual bookkeeping, invoice discrepancies, and input tax credit friction.",
      challenge: "Trading firms and manufacturing MSMEs process hundreds of non-standardized paper invoices each billing cycle. Manual data entry delays result in GSTR-2B mismatches, missed input tax credits (ITC under Section 16(2)), and costly tax penalty notices.",
      solution: "A deterministic financial intelligence pipeline that ingests raw optical payloads from unformatted invoices, extracts critical fields via localized document models, cross-verifies vendor GSTIN legitimacy with the central tax database, and validates ledger reconciliation in under 50 milliseconds.",
      architecture: [
        "Deterministic transformer OCR fine-tuned for regional and crumpled receipts",
        "Section 16(2) GST compliance engine verifying 4-way invoice matching",
        "Immutable cryptographic JSON-LD audit hashing for immediate tax officer audits",
        "Sub-50ms REST/mTLS dispatch directly to certified GSP/ASP gateways"
      ],
      metrics: [
        { label: "Processing Latency", val: "< 50 ms", desc: "Per complete optical document audit" },
        { label: "Field Extraction Precision", val: "99.4%", desc: "On multi-line item HSN and tax breakdowns" },
        { label: "Ledger Reconciliation", val: "Automated", desc: "Zero manual spreadsheet intervention" },
        { label: "Audit Readiness", val: "100%", desc: "Cryptographically verified receipts" }
      ],
      statusText: "Engine Benchmarked with Live GSTR Tax Formats",
      futurePlatform: "Dedicated TaxPulse Web Portal Launching Soon"
    },
    commerce: {
      badge: "Decentralized Commerce • Geo-Mesh Protocol",
      title: "Hyperlocal Merchant Preservation & Inventory Mesh",
      subtitle: "Empowering brick-and-mortar retail stores against monopolistic e-commerce giants.",
      challenge: "Local electronics, hardware, and retail store owners hold verified inventory within walking distance of buyers, yet lose sales to remote e-commerce platforms because nearby customers cannot see live neighborhood stock levels from their phones.",
      solution: "Vectroplex NearGrid deploys an ultra-lightweight distributed GeoHash Level 7 mesh. When buyers search for critical parts or items, nearby participating shops broadcast verified stock. Consumers pre-book and reserve the item with instant payment, guaranteeing immediate counter pickup within minutes.",
      architecture: [
        "GeoHash Level 7 distributed spatial indexing (< 5km precision cluster)",
        "Lightweight MQTT over TLS 1.3 heartbeat keeping store stock synchronized",
        "Cryptographic reservation claim tokens preventing phantom double-bookings",
        "Zero-hardware merchant onboarding via mobile-friendly inventory agent"
      ],
      metrics: [
        { label: "Fulfillment Speed", val: "< 15 mins", desc: "Instant local walk-in pickup vs 2-day delivery" },
        { label: "Merchant Footfall Lift", val: "+38%", desc: "Direct foot traffic from prepaid reservations" },
        { label: "Coverage Radius", val: "5.0 km", desc: "Optimized for dense semi-urban neighborhoods" },
        { label: "Reservation Integrity", val: "100%", desc: "Cryptographically locked inventory claims" }
      ],
      statusText: "Geo-Mesh Protocol Tested in Commercial Corridors",
      futurePlatform: "Dedicated NearGrid Consumer & Merchant Web Platform in Phase 2"
    }
  },

  select: function (key) {
    if (!this.scenarios[key]) return;
    this.activeScenario = key;

    if (window.vectroSound) window.vectroSound.click();

    // Update Tab Buttons
    document.querySelectorAll('.scenario-tab').forEach(tab => {
      if (tab.getAttribute('data-scenario') === key) {
        tab.classList.add('active', 'border-sky-500/50', 'bg-sky-500/10');
        tab.classList.remove('border-slate-800', 'bg-slate-900/40');
      } else {
        tab.classList.remove('active', 'border-sky-500/50', 'bg-sky-500/10');
        tab.classList.add('border-slate-800', 'bg-slate-900/40');
      }
    });

    const data = this.scenarios[key];

    // Render Data into DOM
    const badgeEl = document.getElementById('scen-badge');
    const titleEl = document.getElementById('scen-title');
    const subEl = document.getElementById('scen-sub');
    const challengeEl = document.getElementById('scen-challenge');
    const solutionEl = document.getElementById('scen-solution');
    const archContainer = document.getElementById('scen-arch-list');
    const metricsContainer = document.getElementById('scen-metrics-grid');
    const statusTextEl = document.getElementById('scen-status-text');
    const futurePlatformEl = document.getElementById('scen-future-platform');

    if (badgeEl) badgeEl.innerText = data.badge;
    if (titleEl) titleEl.innerText = data.title;
    if (subEl) subEl.innerText = data.subtitle;
    if (challengeEl) challengeEl.innerText = data.challenge;
    if (solutionEl) solutionEl.innerText = data.solution;
    if (statusTextEl) statusTextEl.innerText = data.statusText;
    if (futurePlatformEl) futurePlatformEl.innerText = data.futurePlatform;

    if (archContainer) {
      archContainer.innerHTML = data.architecture.map(item => `
        <li class="flex items-start gap-2.5">
          <i data-lucide="check-circle-2" class="w-4 h-4 text-blue-600 shrink-0 mt-0.5"></i>
          <span class="text-xs text-slate-700 leading-relaxed font-medium">${item}</span>
        </li>
      `).join('');
    }

    if (metricsContainer) {
      metricsContainer.innerHTML = data.metrics.map(m => `
        <div class="p-4 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-blue-300 transition-colors">
          <span class="text-slate-500 text-[11px] font-mono block uppercase font-medium">${m.label}</span>
          <span class="font-display font-bold text-2xl text-slate-900 mt-1 block">${m.val}</span>
          <span class="text-slate-600 text-[10px] mt-0.5 block leading-tight font-medium">${m.desc}</span>
        </div>
      `).join('');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const defaultTab = document.querySelector('.scenario-tab');
  if (defaultTab) {
    const key = defaultTab.getAttribute('data-scenario') || 'banking';
    window.scenarioViewer.select(key);
  }
});
