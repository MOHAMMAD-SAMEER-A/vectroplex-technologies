/**
 * Vectroplex Technologies - Institutional Pilot Feasibility & Unit Economics Model
 * Verifiable 3-year TCO & hardware capital recovery benchmarks for bank innovation committees,
 * credit societies/RRBs, and deep-tech seed investors.
 */

(function () {
  const PRESETS = {
    "pilot-3": { nodes: 3, opex: 120000 },
    "cluster-10": { nodes: 10, opex: 150000 },
    "network-25": { nodes: 25, opex: 180000 }
  };

  const state = {
    nodes: 10,
    traditionalMonthlyOpex: 150000,
    activePreset: "cluster-10"
  };

  function formatIndianCurrency(num) {
    if (Math.abs(num) >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (Math.abs(num) >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${Math.round(num).toLocaleString('en-IN')}`;
  }

  function calculate() {
    const nodes = state.nodes;
    const tradOpexMonth = state.traditionalMonthlyOpex;

    // Traditional Staffed Branch Baseline:
    // CapEx per Location = ₹12,00,000 (Physical fit-out, vault room, counters)
    const tradCapex = nodes * 1200000;
    // 3-Year Cumulative OpEx = nodes * traditionalMonthlyOpex * 36
    const tradOpex3Yr = nodes * tradOpexMonth * 36;
    // Traditional 3-Year TCO = Total Traditional CapEx + 3-Year Cumulative OpEx
    const tradTco = tradCapex + tradOpex3Yr;

    // Vectroplex Autonomous Micro-Branch Model:
    // Autonomous Terminal Unit CapEx = ₹3,20,000 (Hardened steel chassis, dual-spectrum scanner, ESP32-S3/ATECC608B enclave, LiFePO4 solar failover)
    const vxpCapex = nodes * 320000;
    // Edge Telemetry, Cloud Security & Field SLA OpEx = ₹12,000 / node / month
    const vxpMonthlyTelemetry = 12000;
    // 3-Year Cumulative Telemetry OpEx = nodes * 12,000 * 36
    const vxpOpex3Yr = nodes * vxpMonthlyTelemetry * 36;
    // Vectroplex 3-Year TCO = Total Vectroplex Hardware CapEx + 3-Year Cumulative Telemetry OpEx
    const vxpTco = vxpCapex + vxpOpex3Yr;

    // Outcome Metrics:
    // Net Capital Preserved (3-Yr) = Traditional 3-Year TCO - Vectroplex 3-Year TCO
    const netSavings = tradTco - vxpTco;
    // Cost Reduction Efficiency = ((Traditional 3-Year TCO - Vectroplex 3-Year TCO) / Traditional 3-Year TCO) * 100
    const costReduction = Math.round((netSavings / tradTco) * 100);
    // Monthly Operational Savings = nodes * (traditionalMonthlyOpex - 12,000)
    const monthlySavings = nodes * (tradOpexMonth - vxpMonthlyTelemetry);
    // Payback Horizon (Months) = (Total Vectroplex Hardware CapEx) / Monthly Operational Savings
    const paybackMonths = monthlySavings > 0 ? (vxpCapex / monthlySavings).toFixed(1) : "0.0";
    // Projected ARR Yield for Platform (Investor Lens) = nodes * 12,00,000 -> 12,000 * 12 * nodes
    const arrYield = nodes * vxpMonthlyTelemetry * 12;

    return {
      nodes,
      tradOpexMonth,
      tradCapex,
      tradOpex3Yr,
      tradTco,
      vxpCapex,
      vxpMonthlyTelemetry,
      vxpOpex3Yr,
      vxpTco,
      netSavings,
      costReduction,
      monthlySavings,
      paybackMonths,
      arrYield
    };
  }

  function render() {
    const res = calculate();

    // 1. Inputs & Badge updates
    const nodesSlider = document.getElementById('calc-nodes-slider');
    const opexSlider = document.getElementById('calc-opex-slider');
    const nodesVal = document.getElementById('calc-nodes-val');
    const opexVal = document.getElementById('calc-opex-val');

    if (nodesSlider && parseInt(nodesSlider.value, 10) !== res.nodes) nodesSlider.value = res.nodes;
    if (opexSlider && parseInt(opexSlider.value, 10) !== res.tradOpexMonth) opexSlider.value = res.tradOpexMonth;

    if (nodesVal) nodesVal.textContent = `${res.nodes} ${res.nodes === 1 ? 'Terminal' : 'Terminals'}`;
    if (opexVal) opexVal.textContent = `₹${res.tradOpexMonth.toLocaleString('en-IN')} / mo`;

    // 2. Side-by-side Model Breakdown (Column 2)
    // Traditional:
    const tradCapexEl = document.getElementById('trad-breakdown-capex');
    const tradOpexEl = document.getElementById('trad-breakdown-opex');
    const tradTcoEl = document.getElementById('trad-breakdown-tco');
    if (tradCapexEl) tradCapexEl.textContent = formatIndianCurrency(res.tradCapex);
    if (tradOpexEl) tradOpexEl.textContent = formatIndianCurrency(res.tradOpex3Yr);
    if (tradTcoEl) tradTcoEl.textContent = formatIndianCurrency(res.tradTco);

    // Vectroplex:
    const vxpCapexEl = document.getElementById('vxp-breakdown-capex');
    const vxpOpexEl = document.getElementById('vxp-breakdown-opex');
    const vxpTcoEl = document.getElementById('vxp-breakdown-tco');
    if (vxpCapexEl) vxpCapexEl.textContent = formatIndianCurrency(res.vxpCapex);
    if (vxpOpexEl) vxpOpexEl.textContent = formatIndianCurrency(res.vxpOpex3Yr);
    if (vxpTcoEl) vxpTcoEl.textContent = formatIndianCurrency(res.vxpTco);

    // 3. Executive Summary (Column 3)
    const netSavingsEl = document.getElementById('summary-net-savings');
    const costReductionEl = document.getElementById('summary-cost-reduction');
    const paybackHorizonEl = document.getElementById('summary-payback-horizon');
    const monthlySavingsEl = document.getElementById('summary-monthly-savings');
    const arrYieldEl = document.getElementById('summary-arr-yield');
    const savingsBarEl = document.getElementById('summary-savings-bar');

    if (netSavingsEl) netSavingsEl.textContent = formatIndianCurrency(res.netSavings);
    if (costReductionEl) costReductionEl.textContent = `${res.costReduction}% Cost Reduction`;
    if (paybackHorizonEl) paybackHorizonEl.textContent = `${res.paybackMonths} Months`;
    if (monthlySavingsEl) monthlySavingsEl.textContent = `${formatIndianCurrency(res.monthlySavings)} / mo`;
    if (arrYieldEl) arrYieldEl.textContent = `${formatIndianCurrency(res.arrYield)} / yr`;
    if (savingsBarEl) savingsBarEl.style.width = `${Math.min(res.costReduction, 100)}%`;

    // 4. Update CTA button text with dynamic node count
    const ctaBtn = document.getElementById('feasibility-cta-btn');
    if (ctaBtn) {
      ctaBtn.innerHTML = `<span>Request Custom Feasibility Dossier for ${res.nodes} Nodes</span> <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i>`;
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    // 5. Update Preset chips active states
    document.querySelectorAll('.pilot-preset-chip').forEach(chip => {
      const pId = chip.getAttribute('data-preset');
      if (pId && PRESETS[pId]) {
        if (PRESETS[pId].nodes === res.nodes && PRESETS[pId].opex === res.tradOpexMonth) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      }
    });
  }

  function setPreset(presetKey) {
    if (PRESETS[presetKey]) {
      if (window.vectroSound) window.vectroSound.click();
      state.nodes = PRESETS[presetKey].nodes;
      state.traditionalMonthlyOpex = PRESETS[presetKey].opex;
      state.activePreset = presetKey;
      render();
    }
  }

  function onSliderChange(type, value) {
    const val = parseInt(value, 10);
    if (type === 'nodes') {
      state.nodes = val;
    } else if (type === 'opex') {
      state.traditionalMonthlyOpex = val;
    }
    render();
  }

  function requestFeasibilityDossier() {
    if (window.vectroSound) window.vectroSound.click();
    const contactSection = document.getElementById('contact');
    const areaSelect = document.getElementById('areaOfInterest');
    const messageField = document.getElementById('message');

    if (areaSelect) {
      areaSelect.value = "Autonomous Banking Terminals";
    }

    if (messageField) {
      messageField.value = `Inquiring about pilot feasibility analysis, architecture validation, and regulatory compliance dossier for a ${state.nodes}-node deployment.`;
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (messageField) messageField.focus();
      }, 500);
    }
  }

  // Public API
  window.pilotSimulator = {
    setPreset,
    onSliderChange,
    requestFeasibilityDossier,
    update: render,
    formatCurrency: formatIndianCurrency
  };

  // Legacy fallback compatibility
  window.roiCalc = {
    update: render,
    applyToProposal: requestFeasibilityDossier,
    formatCurrency: formatIndianCurrency
  };

  function init() {
    const nodesSlider = document.getElementById('calc-nodes-slider');
    const opexSlider = document.getElementById('calc-opex-slider');

    if (nodesSlider) {
      nodesSlider.addEventListener('input', (e) => onSliderChange('nodes', e.target.value));
    }
    if (opexSlider) {
      opexSlider.addEventListener('input', (e) => onSliderChange('opex', e.target.value));
    }

    document.querySelectorAll('.pilot-preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const pKey = chip.getAttribute('data-preset');
        if (pKey) setPreset(pKey);
      });
    });

    const ctaBtn = document.getElementById('feasibility-cta-btn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', requestFeasibilityDossier);
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
