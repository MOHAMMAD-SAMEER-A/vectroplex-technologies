/**
 * Vectroplex Technologies - Enterprise CapEx / OpEx Savings Calculator
 * Formulates physical branch vs autonomous micro-branch TCO economics.
 */

window.roiCalc = {
  update: function () {
    const locationsSlider = document.getElementById('calc-branches');
    const opexSlider = document.getElementById('calc-opex');

    const branches = parseInt(locationsSlider ? locationsSlider.value : 5, 10);
    const monthlyBranchOpex = parseInt(opexSlider ? opexSlider.value : 150000, 10);

    // Update labels
    const branchesLabel = document.getElementById('calc-branches-val');
    const opexLabel = document.getElementById('calc-opex-val');
    if (branchesLabel) branchesLabel.innerText = `${branches} Locations`;
    if (opexLabel) opexLabel.innerText = `₹${monthlyBranchOpex.toLocaleString('en-IN')}/mo`;

    // Traditional 3-Year Model
    // Traditional Branch setup CapEx = ₹12,00,000 per branch
    const tradCapex = 1200000 * branches;
    const tradOpex3Yr = (monthlyBranchOpex * 36) * branches;
    const tradTotal = tradCapex + tradOpex3Yr;

    // Vectroplex Autonomous Micro-Branch Model
    // Terminal CapEx = ₹3,20,000 per autonomous unit
    // Edge cloud + telemetry maintenance OpEx = ₹12,000 / mo per unit
    const vxpCapex = 320000 * branches;
    const vxpOpex3Yr = (12000 * 36) * branches;
    const vxpTotal = vxpCapex + vxpOpex3Yr;

    const netSavings = tradTotal - vxpTotal;
    const savingsPercent = Math.round((netSavings / tradTotal) * 100);
    const paybackMonths = ((vxpCapex / (tradOpex3Yr / 36 - vxpOpex3Yr / 36))).toFixed(1);

    // Render formatted numbers
    const tradTotalEl = document.getElementById('calc-trad-total');
    const vxpTotalEl = document.getElementById('calc-vxp-total');
    const netSavingsEl = document.getElementById('calc-net-savings');
    const savingsPctEl = document.getElementById('calc-savings-pct');
    const paybackEl = document.getElementById('calc-payback');
    const barEl = document.getElementById('calc-savings-bar');

    if (tradTotalEl) tradTotalEl.innerText = this.formatCurrency(tradTotal);
    if (vxpTotalEl) vxpTotalEl.innerText = this.formatCurrency(vxpTotal);
    if (netSavingsEl) netSavingsEl.innerText = this.formatCurrency(netSavings);
    if (savingsPctEl) savingsPctEl.innerText = `${savingsPercent}% Cost Reduction`;
    if (paybackEl) paybackEl.innerText = `${paybackMonths} Months`;
    if (barEl) barEl.style.width = `${Math.min(savingsPercent, 100)}%`;
  },

  formatCurrency: function (num) {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  },

  applyToProposal: function () {
    if (window.vectroSound) window.vectroSound.click();
    const branches = document.getElementById('calc-branches') ? document.getElementById('calc-branches').value : 5;
    const interestSelect = document.getElementById('areaOfInterest');
    const messageField = document.getElementById('message');
    const contactSection = document.getElementById('contact');

    if (interestSelect) {
      interestSelect.value = "Autonomous Banking Terminals";
    }
    if (messageField) {
      messageField.value = `Feasibility Ingestion: We are evaluating deployment of ${branches} autonomous micro-branches. Requesting formal hardware specification and pilot deployment terms.`;
    }
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const branchInput = document.getElementById('calc-branches');
  const opexInput = document.getElementById('calc-opex');

  if (branchInput) branchInput.addEventListener('input', () => window.roiCalc.update());
  if (opexInput) opexInput.addEventListener('input', () => window.roiCalc.update());

  if (branchInput) window.roiCalc.update();
});
