/* ============================================================
   HAND HYGIENE PORTAL — main.js
   St. Therese de Lisieux Women and Children Medical Center
   ============================================================ */

/* ── POPUP ── */

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.animation = 'fadeOverlay 0.3s ease reverse forwards';
  setTimeout(() => popup.style.display = 'none', 280);
}

// Close popup when clicking the dark overlay
document.getElementById('popup').addEventListener('click', function (e) {
  if (e.target === this) closePopup();
});


/* ── SCROLL REVEAL ── */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.module-card, .why-card, .step-item, .stat-item, .playlist-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});


/* ── VIDEO PLAYLIST ── */

const videos = [
  {
    title: 'Handwashing Video',
    desc: 'From an accredited US hospital. Learn how experts define health sources in a journal of the National Academy of Medicine',
    duration: '1:41',
    thumb: `https://img.youtube.com/vi/8wi8gYBSq1Q/maxresdefault.jpg`,
    videoId: '8wi8gYBSq1Q'
  },
  {
    title: 'What If You Never Washed Your Hands',
    desc: 'Your hands can pick up a few million germs from the world around you. But hand washing only became standard practice in hospitals in the 1840s. So what if you just stopped washing your hands?',
    duration: '4:51',
    thumb: `https://img.youtube.com/vi/ztDVRwgfj_M/maxresdefault.jpg`,
    videoId: 'ztDVRwgfj_M'
  },
  {
    title: 'Hand hygiene and Antimicrobial Resistance: The Invisible Challenge III',
    desc: 'English version of instruction film about infection control in hospital settings. Made for World Hand Hygiene Day 2018. Movie last updated in 2025.',
    duration: '1:56',
    thumb: `https://img.youtube.com/vi/0Jrxd3Iy21s/maxresdefault.jpg`,
    videoId: '0Jrxd3Iy21s'
  }
];

let activeVideoIndex = 0;

// Elements
const mainThumb  = document.getElementById('main-video-thumb');
const mainTitle  = document.getElementById('main-video-title');
const mainDesc   = document.getElementById('main-video-desc');
const mainDur    = document.getElementById('main-video-duration');
const playlistEl = document.getElementById('playlist');

function renderPlaylist() {
  playlistEl.innerHTML = '';
  videos.forEach((vid, i) => {
    const item = document.createElement('div');
    item.className = 'playlist-item' + (i === activeVideoIndex ? ' active' : '');
    item.innerHTML = `
      <div class="playlist-thumb">
        <img src="https://placehold.co/160x90/2a1520/f4a7bc?text=Vid+${i + 1}" alt="${vid.title}">
        <div class="mini-play">▶</div>
      </div>
      <div class="playlist-info">
        <strong>${vid.title}</strong>
        <span>${vid.desc} · ${vid.duration}</span>
      </div>
    `;
    item.addEventListener('click', () => selectVideo(i));
    playlistEl.appendChild(item);
  });
}

function selectVideo(index) {
  activeVideoIndex = index;
  const vid = videos[index];

  // Update main display
  mainThumb.src = vid.thumb;
  mainThumb.alt = vid.title;
  mainTitle.textContent = vid.title;
  mainDesc.textContent  = vid.desc;
  mainDur.textContent   = '▶  ' + vid.duration;

  // Re-render playlist to update active state
  renderPlaylist();
}


document.getElementById('main-play-btn').addEventListener('click', () => {
  const videoId = videos[activeVideoIndex].videoId;
  const thumb = document.getElementById('main-video-thumb');
  const playBtn = document.querySelector('.play-btn');

  
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.style.cssText = 'width:100%;height:100%;border:none;position:absolute;inset:0;';

  
  thumb.replaceWith(iframe);
  playBtn.style.display = 'none';
});

// Initialize
renderPlaylist();
selectVideo(0);
