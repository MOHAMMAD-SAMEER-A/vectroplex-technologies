/**
 * Vectroplex Technologies - Synthesized Web Audio Interface Feedback
 * Low-latency, zero-dependency procedural audio for cyber-physical interactions.
 */

class VectroSound {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('vectro_audio_enabled') === 'true';
    this.initAudioContext = this.initAudioContext.bind(this);
  }

  initAudioContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('vectro_audio_enabled', this.enabled);
    if (this.enabled) {
      this.initAudioContext();
      this.beep(880, 0.05, 'sine');
    }
    return this.enabled;
  }

  beep(freq = 440, duration = 0.06, type = 'sine', volume = 0.05) {
    if (!this.enabled) return;
    try {
      this.initAudioContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  click() {
    this.beep(1200, 0.03, 'triangle', 0.03);
  }

  scan() {
    if (!this.enabled) return;
    this.initAudioContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(1400, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  success() {
    if (!this.enabled) return;
    setTimeout(() => this.beep(523.25, 0.08, 'sine', 0.04), 0);
    setTimeout(() => this.beep(659.25, 0.08, 'sine', 0.04), 80);
    setTimeout(() => this.beep(783.99, 0.15, 'sine', 0.05), 160);
  }

  alert() {
    if (!this.enabled) return;
    setTimeout(() => this.beep(400, 0.1, 'sawtooth', 0.06), 0);
    setTimeout(() => this.beep(320, 0.12, 'sawtooth', 0.06), 110);
  }
}

window.vectroSound = new VectroSound();
