/**
 * Vectroplex Technologies - Interactive Enterprise Product Simulators
 * Powers hands-on scenarios for Banking Nodes, AI Tax Engine, and Hyperlocal Pre-Booking Radar.
 */

// ==========================================
// 1. AUTONOMOUS BANKING TERMINAL SIMULATOR
// ==========================================
window.terminalSim = {
  currentStep: 1,
  isRunning: false,

  startSession: function () {
    if (this.isRunning) return;
    this.isRunning = true;
    this.currentStep = 1;
    if (window.vectroSound) window.vectroSound.scan();

    const display = document.getElementById('term-display');
    const logs = document.getElementById('term-logs');
    const btn = document.getElementById('term-start-btn');
    if (btn) btn.disabled = true;

    this.updateScreen("INITIATING SECURE BIO-SESSION...", "Contacting Edge TPM 2.0 Enclave...");
    this.log("Terminal #TN-CBE-01 session initialized with ephemeral token.");

    setTimeout(() => {
      this.stepBiometric();
    }, 1200);
  },

  stepBiometric: function () {
    this.updateScreen("STEP 1: MULTIMODAL AUTHENTICATION", "Place Citizen Smart Card or Biometric Sensor...");
    this.log("Optical face + iris verification matched (Confidence: 99.4%)");
    if (window.vectroSound) window.vectroSound.click();

    setTimeout(() => {
      this.stepDocument();
    }, 1600);
  },

  stepDocument: function () {
    this.updateScreen("STEP 2: DOCUMENT & COLLATERAL SCAN", "Intake Slot 1 opened. Ingesting physical deed/invoice...");
    this.log("Dual-spectrum optical camera scanning physical document...");
    if (window.vectroSound) window.vectroSound.scan();

    setTimeout(() => {
      this.log("OCR parsed: Document Type = Commercial Collateral Deed #C-8812");
      this.log("Government registry hash cross-verified via secure edge gateway.");
      this.stepCustody();
    }, 2000);
  },

  stepCustody: function () {
    this.updateScreen("STEP 3: SMART CUSTODY & VAULT LOCK", "Document verified. Securing into Fireproof Micro-Vault Unit #03...");
    this.log("Electromagnetic servo locked. Physical tamper seal energized.");
    if (window.vectroSound) window.vectroSound.click();

    setTimeout(() => {
      this.stepComplete();
    }, 1800);
  },

  stepComplete: function () {
    this.isRunning = false;
    this.updateScreen("TRANSACTION COMPLETE", "Custody Hash #VXP-88392-CBE generated. Digital receipt dispatched via SMS/WhatsApp.");
    this.log("Terminal ready for next user. Edge node telemetry reset to IDLE.");
    if (window.vectroSound) window.vectroSound.success();

    const btn = document.getElementById('term-start-btn');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="refresh-cw" class="w-4 h-4"></i> Run Another Simulation`;
      if (window.lucide) lucide.createIcons();
    }
  },

  updateScreen: function (title, subtitle) {
    const titleEl = document.getElementById('term-screen-title');
    const subEl = document.getElementById('term-screen-sub');
    if (titleEl) titleEl.innerText = title;
    if (subEl) subEl.innerText = subtitle;
  },

  log: function (msg) {
    const logs = document.getElementById('term-logs');
    if (!logs) return;
    const time = new Date().toTimeString().split(' ')[0];
    const el = document.createElement('div');
    el.className = 'text-xs text-emerald-400 font-mono py-0.5 border-b border-emerald-950/40';
    el.innerHTML = `<span class="text-slate-500">[${time}]</span> ${msg}`;
    logs.prepend(el);
  }
};


// ==========================================
// 2. AI TAX ENGINE COMPLIANCE SANDBOX
// ==========================================
window.taxSim = {
  sampleInvoices: {
    msme: {
      type: "B2B Hardware Supply Invoice",
      vendor: "Vectro Micro-Machining Systems Ltd.",
      gstin: "33AABCV9921E1Z4",
      buyerGstin: "33AABCT4412P1ZF",
      invNo: "VXP/INV/2026/0419",
      date: "2026-10-10",
      items: [
        { desc: "Industrial Robotic Actuator 24V", hsn: "84798999", qty: 4, rate: 25000, taxable: 100000, gstRate: 18, tax: 18000 }
      ],
      subtotal: 100000,
      cgst: 9000,
      sgst: 9000,
      igst: 0,
      total: 118000,
      itcStatus: "100% Eligible (Sec 16(2) Fully Reconciled)",
      riskScore: "0.01 (Ultra-Clean)"
    },
    retail: {
      type: "Hyperlocal Store Aggregation Summary",
      vendor: "Coimbatore Electronics & Fasteners Co.",
      gstin: "33AAACG2210K1ZP",
      buyerGstin: "Unregistered (B2C Consolidated)",
      invNo: "POS/TXN/88921",
      date: "2026-10-11",
      items: [
        { desc: "Microcontroller Dev Boards ESP32-S3", hsn: "85423100", qty: 15, rate: 850, taxable: 12750, gstRate: 18, tax: 2295 },
        { desc: "Thermal Insulated Spacers", hsn: "39269099", qty: 50, rate: 40, taxable: 2000, gstRate: 12, tax: 240 }
      ],
      subtotal: 14750,
      cgst: 1267.50,
      sgst: 1267.50,
      igst: 0,
      total: 17285,
      itcStatus: "Output Liability Processed",
      riskScore: "0.03 (Low Variance Risk)"
    },
    export: {
      type: "Zero-Rated Software Development Export",
      vendor: "Vectroplex Autonomous Technologies Pvt Ltd",
      gstin: "33AAFCV1234F1Z8",
      buyerGstin: "OVERSEAS (Singapore Branch Client)",
      invNo: "EXP/2026/089",
      date: "2026-10-08",
      items: [
        { desc: "Autonomous Node Firmware Telemetry Module", hsn: "998314", qty: 1, rate: 320000, taxable: 320000, gstRate: 0, tax: 0 }
      ],
      subtotal: 320000,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total: 320000,
      itcStatus: "Zero-Rated Export with LUT (Refund Eligible)",
      riskScore: "0.00 (FIRC Reconciled)"
    }
  },

  loadSample: function (sampleKey) {
    if (window.vectroSound) window.vectroSound.click();
    const data = this.sampleInvoices[sampleKey];
    if (!data) return;

    const rawInput = document.getElementById('tax-raw-input');
    if (rawInput) {
      rawInput.value = `INVOICE: ${data.invNo}\nDATE: ${data.date}\nSUPPLIER: ${data.vendor} (GSTIN: ${data.gstin})\nBUYER GSTIN: ${data.buyerGstin}\nITEM: ${data.items[0].desc} [HSN: ${data.items[0].hsn}]\nAMOUNT: ₹${data.subtotal.toLocaleString()} + TAX: ₹${(data.cgst + data.sgst + data.igst).toLocaleString()} = TOTAL ₹${data.total.toLocaleString()}`;
    }

    this.runAudit(data);
  },

  runAudit: function (customData = null) {
    if (window.vectroSound) window.vectroSound.scan();
    const loadingState = document.getElementById('tax-loading-state');
    const resultState = document.getElementById('tax-result-state');

    if (loadingState) loadingState.classList.remove('hidden');
    if (resultState) resultState.classList.add('hidden');

    const sample = customData || this.sampleInvoices.msme;

    setTimeout(() => {
      if (loadingState) loadingState.classList.add('hidden');
      if (resultState) resultState.classList.remove('hidden');

      document.getElementById('tax-out-vendor').innerText = sample.vendor;
      document.getElementById('tax-out-gstin').innerText = sample.gstin;
      document.getElementById('tax-out-inv').innerText = sample.invNo;
      document.getElementById('tax-out-taxable').innerText = `₹${sample.subtotal.toLocaleString('en-IN')}`;
      document.getElementById('tax-out-tax').innerText = `₹${(sample.cgst + sample.sgst + sample.igst).toLocaleString('en-IN')}`;
      document.getElementById('tax-out-total').innerText = `₹${sample.total.toLocaleString('en-IN')}`;
      document.getElementById('tax-out-itc').innerText = sample.itcStatus;
      document.getElementById('tax-out-risk').innerText = sample.riskScore;

      const itemsTbody = document.getElementById('tax-out-items-tbody');
      if (itemsTbody) {
        itemsTbody.innerHTML = sample.items.map(item => `
          <tr class="border-b border-slate-800 text-xs">
            <td class="py-2 text-white font-medium">${item.desc}</td>
            <td class="py-2 text-slate-400 font-mono">${item.hsn}</td>
            <td class="py-2 text-slate-300">₹${item.taxable.toLocaleString('en-IN')}</td>
            <td class="py-2 text-emerald-400">${item.gstRate}%</td>
            <td class="py-2 text-sky-400 font-mono">₹${item.tax.toLocaleString('en-IN')}</td>
          </tr>
        `).join('');
      }

      if (window.vectroSound) window.vectroSound.success();
    }, 700);
  }
};


// ==========================================
// 3. HYPERLOCAL PRE-BOOKING RADAR
// ==========================================
window.radarSim = {
  inventoryCatalog: [
    {
      query: "esp32",
      name: "ESP32-S3 Dual-Core AI Edge Kit",
      stores: [
        { store: "Coimbatore Peelamedu Tech Spares", dist: "1.2 km", inStock: 14, price: "₹899", readyMins: "8 mins", verified: true },
        { store: "Gandhipuram Electronic Avenue", dist: "3.4 km", inStock: 6, price: "₹870", readyMins: "15 mins", verified: true },
        { store: "Avinashi Road Industrial Components", dist: "4.8 km", inStock: 22, price: "₹910", readyMins: "12 mins", verified: true }
      ]
    },
    {
      query: "relay",
      name: "Industrial 24V 8-Channel Relay Module (Optocoupled)",
      stores: [
        { store: "Avinashi Road Industrial Components", dist: "2.1 km", inStock: 35, price: "₹650", readyMins: "10 mins", verified: true },
        { store: "Cross Cut Electrical Systems", dist: "3.9 km", inStock: 8, price: "₹680", readyMins: "20 mins", verified: true }
      ]
    },
    {
      query: "fastener",
      name: "M4 Grade 12.9 High-Tensile Hex Socket Bolts (Pack of 100)",
      stores: [
        { store: "Avarampalayam Fastener & Hardware Mart", dist: "1.8 km", inStock: 50, price: "₹420", readyMins: "5 mins", verified: true },
        { store: "Singanallur Machine Tools & Spares", dist: "5.2 km", inStock: 80, price: "₹400", readyMins: "25 mins", verified: true }
      ]
    }
  ],

  search: function () {
    if (window.vectroSound) window.vectroSound.scan();
    const queryEl = document.getElementById('radar-query');
    const radiusEl = document.getElementById('radar-radius');
    const resultBox = document.getElementById('radar-results-list');
    const badgeCount = document.getElementById('radar-found-count');

    const term = (queryEl ? queryEl.value.toLowerCase() : "") || "esp32";
    let match = this.inventoryCatalog.find(item => item.query.includes(term) || term.includes(item.query));
    if (!match) match = this.inventoryCatalog[0];

    if (badgeCount) badgeCount.innerText = `${match.stores.length} Verified Stores Nearby`;

    if (resultBox) {
      resultBox.innerHTML = `
        <div class="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl mb-3 flex items-center justify-between text-xs">
          <span class="text-sky-300 font-semibold">Matched SKU: ${match.name}</span>
          <span class="text-slate-400">Inventory synchronized 4s ago</span>
        </div>
      ` + match.stores.map((st, idx) => `
        <div class="glass-card rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800 hover:border-indigo-500/40 transition-all">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-white text-sm">${st.store}</span>
              ${st.verified ? '<span class="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">Verified Merchant</span>' : ''}
            </div>
            <div class="flex items-center gap-3 text-xs text-slate-400">
              <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-indigo-400"></i> ${st.dist}</span>
              <span class="flex items-center gap-1"><i data-lucide="package-check" class="w-3.5 h-3.5 text-emerald-400"></i> ${st.inStock} In Stock Now</span>
              <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i> Pickup Ready in ${st.readyMins}</span>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div class="text-right">
              <div class="text-xs text-slate-400">Price</div>
              <div class="text-base font-bold text-white font-mono">${st.price}</div>
            </div>
            <button onclick="window.radarSim.bookItem('${st.store}', '${match.name}', '${st.price}')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5">
              <span>Instant Pre-Book</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `).join('');

      if (window.lucide) lucide.createIcons();
    }
  },

  bookItem: function (storeName, itemName, price) {
    if (window.vectroSound) window.vectroSound.success();
    const modal = document.getElementById('prebook-modal');
    const token = 'VXP-' + Math.floor(1000 + Math.random() * 9000) + '-RES';
    
    document.getElementById('prebook-modal-store').innerText = storeName;
    document.getElementById('prebook-modal-item').innerText = itemName;
    document.getElementById('prebook-modal-price').innerText = price;
    document.getElementById('prebook-modal-token').innerText = token;

    if (modal) {
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.classList.remove('hidden');
      }
    }
  },

  closeModal: function () {
    const modal = document.getElementById('prebook-modal');
    if (modal) {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.classList.add('hidden');
      }
    }
  }
};
