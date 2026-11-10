import { animate, stagger } from 'animejs';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const confetti = document.querySelector('#confetti');
let celebration;
let aurora;

export function stopAurora() {
  aurora?.animation.cancel();
  aurora?.overlay.remove();
  aurora = undefined;
}

export function openWithAurora(node, navigate) {
  stopAurora();
  if (!motionEnabled()) {
    navigate();
    return;
  }

  const bounds = node.getBoundingClientRect();
  const overlay = document.createElement('div');
  overlay.className = 'aurora-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.setProperty('--aurora-x', `${bounds.left + bounds.width / 2}px`);
  overlay.style.setProperty('--aurora-y', `${bounds.top + bounds.height / 2}px`);
  overlay.innerHTML = `
    <div class="aurora-origin">
      <svg viewBox="0 0 900 390" class="aurora-ribbons">
        <defs>
          <linearGradient id="aurora-light" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stop-color="#85d88f" stop-opacity="0"></stop>
            <stop offset=".38" stop-color="#9ffbc9"></stop>
            <stop offset=".67" stop-color="#75dfbf" stop-opacity=".78"></stop>
            <stop offset="1" stop-color="#88b5e4" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <path d="M43 320 C172 120 279 313 450 195 S692 35 858 69"></path>
        <path d="M31 302 C175 87 300 286 450 195 S698 10 869 94"></path>
        <path d="M55 338 C216 168 296 329 450 195 S700 87 849 119"></path>
      </svg>
    </div>
  `;
  document.body.append(overlay);
  const animation = animate(overlay.querySelector('svg'), {
    scale: [{ from: .04, to: 1, duration: 1250, ease: 'outCubic' }],
    rotate: [-12, 3],
    opacity: [{ from: 0, to: .88, duration: 480 }, { to: 0, duration: 770 }],
    duration: 1250,
    onComplete: () => {
      stopAurora();
      navigate();
    },
  });
  aurora = { overlay, animation };
}

export function motionEnabled() {
  return !reducedMotion.matches && document.documentElement.dataset.motion !== 'reduce';
}

export function revealPage(target) {
  if (motionEnabled() && target) {
    animate(target, { opacity: [0.7, 1], y: [9, 0], duration: 320, ease: 'outCubic' });
  }
}

export function accent(target) {
  if (motionEnabled()) {
    animate(target, { scale: [0.94, 1], duration: 220, ease: 'outCubic' });
  }
}

export function stopCelebration() {
  celebration?.cancel();
  celebration = undefined;
  confetti.replaceChildren();
}

export function celebrate() {
  stopCelebration();
  if (!motionEnabled()) return;
  const palette = ['#b5fa70', '#75edc4', '#e4a14e', '#ffaaa3', '#9dc7fc'];
  const pieces = Array.from({ length: 65 }, (_, index) => {
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = palette[index % palette.length];
    return piece;
  });
  confetti.append(...pieces);
  celebration = animate(pieces, {
    x: () => (Math.random() - 0.5) * 250,
    y: () => innerHeight + 38,
    rotate: () => 360 + Math.random() * 720,
    opacity: [{ to: 1, duration: 400 }, { to: 0, duration: 650, delay: 3500 }],
    delay: stagger(17),
    duration: 4400,
    ease: 'linear',
    onComplete: () => {
      celebration = undefined;
      confetti.replaceChildren();
    },
  });
}

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) stopCelebration();
});
