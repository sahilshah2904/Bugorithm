import { animate, stagger } from 'animejs';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const confetti = document.querySelector('#confetti');
let celebration;
let stopReactorEffect;

export function stopReactor() {
  stopReactorEffect?.();
  stopReactorEffect = undefined;
}

export function startReactor(node, map) {
  const marker = node.getBoundingClientRect();
  const mapBounds = map.getBoundingClientRect();
  const x = marker.left + marker.width / 2;
  const y = marker.top + marker.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const overlay = document.createElement('div');
  overlay.className = 'reactor-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.setProperty('--reactor-x', `${x}px`);
  overlay.style.setProperty('--reactor-y', `${y}px`);
  overlay.style.setProperty('--wave-size', `${Math.ceil(radius * 2.48)}px`);
  overlay.innerHTML = `
    <div class="reactor-wave"></div>
    <div class="reactor-wave reactor-echo"></div>
    <svg class="reactor-core" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke="#7be9e0" stroke-width="2" stroke-dasharray="12 8.65"></circle>
      <circle cx="50" cy="50" r="37" stroke="#a9fff2" stroke-width="2"></circle>
      <path d="M50 24 74 66H26Z" fill="#70e6df" fill-opacity=".25" stroke="#d1fff7" stroke-width="3" stroke-linejoin="round"></path>
      <path d="M50 40 61 60H39Z" fill="#b5fff4"></path>
    </svg>
  `;
  map.inert = true;
  map.classList.add('reactor-map-out');
  Object.assign(map.style, { top: `${mapBounds.top}px`, left: `${mapBounds.left}px`, width: `${mapBounds.width}px` });
  document.body.append(overlay);

  const pulse = (wave, delay, opacity, aspect) => wave.animate([
    { transform: `scale(.06, ${.06 * aspect})`, opacity: 0 },
    { opacity, offset: .14 },
    { opacity: opacity * .72, offset: .72 },
    { transform: `scale(1.04, ${1.04 * aspect})`, opacity: 0 },
  ], { duration: 1350, delay, easing: 'cubic-bezier(.24, .45, .52, .98)', fill: 'backwards' });
  const [wave, echo, core] = overlay.children;
  const animations = [
    pulse(wave, 0, .88, 1),
    pulse(echo, 145, .53, .89),
    core.animate([
      { transform: 'scale(.72) rotate(-22deg)', opacity: .15 },
      { transform: 'scale(1.04) rotate(0)', opacity: 1, offset: .27 },
      { transform: 'scale(1.4) rotate(23deg)', opacity: 0 },
    ], { duration: 720, easing: 'ease-out' }),
    map.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 930, easing: 'ease-in-out', fill: 'forwards' }),
  ];
  animations[1].addEventListener('finish', stopReactor, { once: true });
  stopReactorEffect = () => {
    animations.forEach((animation) => animation.cancel());
    overlay.remove();
    map.hidden = true;
    map.inert = false;
    map.classList.remove('reactor-map-out');
    ['top', 'left', 'width'].forEach((property) => map.style.removeProperty(property));
  };
  return (lesson) => {
    animations.push(lesson.animate([
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 1110, delay: 100, easing: 'cubic-bezier(.25, .62, .28, 1)', fill: 'backwards' }));
  };
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
  if (reducedMotion.matches) {
    stopReactor();
    stopCelebration();
  }
});
