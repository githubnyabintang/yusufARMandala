export type SfxType = 'click' | 'select' | 'correct' | 'wrong' | 'win' | 'good' | 'fail';

const SFX_URLS: Record<SfxType, string> = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  select: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  correct: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  wrong: 'https://assets.mixkit.co/active_storage/sfx/2945/2945-preview.mp3',
  win: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  good: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  fail: 'https://assets.mixkit.co/active_storage/sfx/3067/3067-preview.mp3',
};

const audioPool: Partial<Record<SfxType, HTMLAudioElement>> = {};

// Preload standard game audios
export function preloadSfx() {
  if (typeof window === 'undefined') return;
  (Object.keys(SFX_URLS) as SfxType[]).forEach((key) => {
    const audio = new Audio(SFX_URLS[key]);
    audio.preload = 'auto';
    audio.volume = 0.6; // Not too loud
    audioPool[key] = audio;
  });
}

// Play an SFX
export function playSfx(type: SfxType) {
  if (typeof window === 'undefined') return;
  try {
    let audio = audioPool[type];
    if (!audio) {
      audio = new Audio(SFX_URLS[type]);
      audio.volume = 0.6;
      audioPool[type] = audio;
    }
    
    // Reset time to allow overlapping or rapid clicks
    audio.currentTime = 0;
    audio.play().catch((err) => {
      // Auto-play might be blocked by browser until user interacts
      console.warn('Failed to play SFX:', err);
    });
  } catch (error) {
    console.warn('Audio playback error:', error);
  }
}
