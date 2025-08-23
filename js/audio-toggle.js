/**
 * Audio Toggle Functionality for Hero Section
 * Controls video audio and text visibility
 */

class AudioToggle {
  constructor() {
    this.audioToggle = document.getElementById('audioToggle');
    this.heroVideo = document.getElementById('heroVideo');
    this.heroContent = document.getElementById('heroContent');
    this.isAudioOn = false;
    
    this.init();
  }
  
  init() {
    if (!this.audioToggle || !this.heroVideo || !this.heroContent) {
      console.warn('Audio toggle elements not found');
      return;
    }
    
    this.bindEvents();
    this.updateUI();
  }
  
  bindEvents() {
    this.audioToggle.addEventListener('click', () => this.toggleAudio());
    
    // Handle video events
    this.heroVideo.addEventListener('loadedmetadata', () => {
      this.updateUI();
    });
    
    // Handle user interaction requirement for autoplay
    this.heroVideo.addEventListener('canplay', () => {
      // Ensure video is muted initially
      this.heroVideo.muted = true;
      this.isAudioOn = false;
      this.updateUI();
    });
  }
  
  toggleAudio() {
    if (this.isAudioOn) {
      this.muteAudio();
    } else {
      this.unmuteAudio();
    }
  }
  
  muteAudio() {
    this.heroVideo.muted = true;
    this.isAudioOn = false;
    this.heroContent.classList.remove('audio-playing');
    this.updateUI();
  }
  
  unmuteAudio() {
    // Check if user has interacted with the page
    if (document.visibilityState === 'visible') {
      try {
        this.heroVideo.muted = false;
        this.isAudioOn = true;
        this.heroContent.classList.add('audio-playing');
        this.updateUI();
        
        // No more auto-mute - user has full control
      } catch (error) {
        console.warn('Could not unmute video:', error);
        // Fallback: keep muted if unmuting fails
        this.isAudioOn = false;
        this.updateUI();
      }
    }
  }
  
  updateUI() {
    if (this.isAudioOn) {
      this.audioToggle.classList.add('audio-on');
      this.audioToggle.setAttribute('aria-label', 'Ton ausschalten');
      this.audioToggle.setAttribute('title', 'Ton ausschalten');
    } else {
      this.audioToggle.classList.remove('audio-on');
      this.audioToggle.setAttribute('aria-label', 'Ton einschalten');
      this.audioToggle.setAttribute('title', 'Ton einschalten');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AudioToggle();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioToggle;
}
