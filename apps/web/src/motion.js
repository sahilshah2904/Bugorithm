import { animate, stagger } from 'animejs';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const confetti = document.querySelector('#confetti');
let celebration;

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
