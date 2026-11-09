import { animate, createTimeline, stagger } from 'animejs';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const confetti = document.querySelector('#confetti');
let celebration;

export function revealPage() {
  if (reducedMotion.matches) return;
  createTimeline({ defaults: { duration: 520, ease: 'outCubic' } })
    .add('.hero-copy > *', { opacity: [0, 1], y: [12, 0], delay: stagger(55) }, 0)
    .add('.hero-diagram', { opacity: [0, 1], y: [8, 0] }, 95);
}

export function accent(target) {
  if (!reducedMotion.matches) {
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
  if (reducedMotion.matches) return;
  const palette = ['#5945d9', '#e4a14e', '#42a68a', '#d7648b', '#81a6f5'];
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
