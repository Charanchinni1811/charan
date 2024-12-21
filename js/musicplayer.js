class MusicPlayer {
    constructor() {
        this.audioElement = new Audio();
        this.currentTrack = null;
        this.playlist = [];
        this.isPlaying = false;

        // UI Elements
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');

        this.initEventListeners();
    }

    initEventListeners() {
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.playPreviousTrack());
        this.nextBtn.addEventListener('click', () => this.playNextTrack());
    }

    loadTrack(track) {
        this.currentTrack = track;
        this.audioElement.src = track.url;

        // Update UI with current track info
        const songInfoElements = document.querySelectorAll('.song-info');
        if (songInfoElements.length > 1) {
            songInfoElements[1].querySelector('strong').textContent = track.title;
            songInfoElements[1].querySelector('p').textContent = track.artist;
        }

        this.play();
    }

    play() {
        this.audioElement.play();
        this.isPlaying = true;
        this.playPauseBtn.textContent = '⏸️';
    }

    pause() {
        this.audioElement.pause();
        this.isPlaying = false;
        this.playPauseBtn.textContent = '▶️';
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    playNextTrack() {
        if (this.playlist.length === 0) return;

        const currentIndex = this.playlist.findIndex(
            track => track.url === this.currentTrack.url
        );

        const nextIndex = (currentIndex + 1) % this.playlist.length;
        this.loadTrack(this.playlist[nextIndex]);
    }

    playPreviousTrack() {
        if (this.playlist.length === 0) return;

        const currentIndex = this.playlist.findIndex(
            track => track.url === this.currentTrack.url
        );

        const previousIndex = (currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.playlist[previousIndex]);
    }
}