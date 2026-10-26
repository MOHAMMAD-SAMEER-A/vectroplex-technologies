/**
 * Vectroplex Technologies - Global Command Center (Cmd+K / Ctrl+K)
 * Enterprise-grade keyboard-driven navigation and fast system shortcuts.
 */

(function () {
  const commands = [
    { label: "Explore Real-World Deployment Scenarios", category: "Case Studies", action: () => { window.location.hash = "#scenarios"; } },
    { label: "Strategic Technology Portfolio & Roadmap", category: "Corporate R&D", action: () => { window.location.hash = "#portfolio"; } },
    { label: "Company Profile, Vision & Founders", category: "Corporate", action: () => { window.location.hash = "#about"; } },
    { label: "Enterprise Economics & Feasibility", category: "Institutional", action: () => { window.location.hash = "#economics"; } },
    { label: "R&D Technology Roadmap (2026-2027)", category: "Strategic Vision", action: () => { window.location.hash = "#roadmap"; } },
    { label: "Cyber-Physical Architecture Whitepaper", category: "Technical Spec", action: () => { window.location.href = "technology.html"; } },
    { label: "Live Fleet Telemetry & Network Health", category: "Infrastructure", action: () => { window.location.href = "status.html"; } },
    { label: "Student Collaborative Internship Cell", category: "Careers & Talent", action: () => { window.location.href = "careers.html"; } },
    { label: "Partner With Us / Founder Direct Channel", category: "Inquiries", action: () => { window.location.hash = "#contact"; } },
    { label: "Official LinkedIn Company Profile", category: "Corporate", action: () => { window.open("https://www.linkedin.com/company/vectroplex-technologies/", "_blank"); } },
    { label: "Toggle Cyber Synthesizer Audio", category: "Settings", action: () => { if (window.vectroSound) { const en = window.vectroSound.toggle(); alert(`Cyber Audio FX: ${en ? 'ENABLED' : 'MUTED'}`); } } },
  ];

  let selectedIndex = 0;
  let filteredCommands = [...commands];

  function openPalette() {
    const dialog = document.getElementById('cmd-palette-dialog');
    const input = document.getElementById('cmd-palette-input');
    if (!dialog) return;

    if (window.vectroSound) window.vectroSound.click();
    filteredCommands = [...commands];
    renderList();

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.classList.remove('hidden');
    }

    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 50);
    }
  }

  function closePalette() {
    const dialog = document.getElementById('cmd-palette-dialog');
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.classList.add('hidden');
    }
  }

  function renderList() {
    const container = document.getElementById('cmd-palette-results');
    if (!container) return;

    if (filteredCommands.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-xs text-slate-500 font-mono">No matching system directives found.</div>`;
      return;
    }

    container.innerHTML = filteredCommands.map((cmd, idx) => `
      <div data-index="${idx}" class="cmd-item px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${idx === selectedIndex ? 'bg-blue-50 border border-blue-300 text-blue-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'}">
        <div class="flex items-center gap-3">
          <span class="w-2 h-2 rounded-full ${idx === selectedIndex ? 'bg-blue-600' : 'bg-slate-300'}"></span>
          <span class="text-sm font-medium">${cmd.label}</span>
        </div>
        <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">${cmd.category}</span>
      </div>
    `).join('');

    container.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-index'), 10);
        executeCommand(idx);
      });
    });
  }

  function executeCommand(index) {
    if (filteredCommands[index]) {
      if (window.vectroSound) window.vectroSound.success();
      closePalette();
      filteredCommands[index].action();
    }
  }

  // Keyboard events
  window.addEventListener('keydown', (e) => {
    // Open on Cmd+K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const dialog = document.getElementById('cmd-palette-dialog');
      if (dialog && dialog.open) {
        closePalette();
      } else {
        openPalette();
      }
    }

    const dialog = document.getElementById('cmd-palette-dialog');
    if (dialog && dialog.open) {
      if (e.key === 'Escape') {
        closePalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        renderList();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderList();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(selectedIndex);
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const triggerBtn = document.getElementById('cmd-palette-trigger');
    const input = document.getElementById('cmd-palette-input');
    const closeBtn = document.getElementById('cmd-palette-close');

    if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
    if (closeBtn) closeBtn.addEventListener('click', closePalette);

    if (input) {
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        filteredCommands = commands.filter(c => 
          c.label.toLowerCase().includes(query) || 
          c.category.toLowerCase().includes(query)
        );
        selectedIndex = 0;
        renderList();
      });
    }
  });

  window.openCommandPalette = openPalette;
  window.closeCommandPalette = closePalette;
})();
