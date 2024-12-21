class MusicApp {
    constructor() {
        this.musicPlayer = new MusicPlayer();
        this.tracks = [
            {
                title: "Starry Night",
                artist: "Lunar Waves",
                url: "path/to/starry-night.mp3",
                album: "Cosmic Sounds",
                duration: "3:45"
            },
            {
                title: "Ocean Breeze",
                artist: "Seaside Rhythms",
                url: "path/to/ocean-breeze.mp3",
                album: "Coastal Vibes",
                duration: "4:12"
            },
            {
                title: "Mountain Echoes",
                artist: "Alpine Harmony",
                url: "path/to/mountain-echoes.mp3",
                album: "Nature's Symphony",
                duration: "3:58"
            }
        ];
        
        this.initializeUI();
    }

    initializeUI() {
        this.renderPlaylist();
        this.setupProgressBar();
        this.setupVolumeControl();
    }

    renderPlaylist() {
        const playlistElement = document.getElementById('playlist');
        playlistElement.innerHTML = ''; // Clear existing playlist

        this.tracks.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.classList.add('playlist-track');
            trackElement.innerHTML = `
                <span class="track-info">
                    <strong>${track.title}</strong>
                    <p>${track.artist} - ${track.duration}</p>
                </span>
                <button class="play-track-btn" data-index="${index}">▶️</button>
            `;

            trackElement.querySelector('.play-track-btn').addEventListener('click', () => {
                this.playTrackFromPlaylist(index);
            });

            playlistElement.appendChild(trackElement);
        });
    }

    playTrackFromPlaylist(index) {
        // Set the entire playlist
        this.musicPlayer.playlist = this.tracks;
        
        // Load and play the selected track
        this.musicPlayer.loadTrack(this.tracks[index]);
    }

    setupProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        const progressFill = document.getElementById('progress-fill');

        this.musicPlayer.audioElement.addEventListener('timeupdate', () => {
            const percentage = (this.musicPlayer.audioElement.currentTime / this.musicPlayer.audioElement.duration) * 100;
            progressFill.style.width = `${percentage}%`;
        });

        // Allow seeking through the track
        progressBar.addEventListener('click', (e) => {
            const clickPosition = (e.offsetX / progressBar.offsetWidth);
            this.musicPlayer.audioElement.currentTime = 
                clickPosition * this.musicPlayer.audioElement.duration;
        });
    }

    setupVolumeControl() {
        const volumeSlider = document.getElementById('volume-slider');
        
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.musicPlayer.audioElement.volume = volume;
        });

        // Set initial volume
        this.musicPlayer.audioElement.volume = 0.5;
        volumeSlider.value = 50;
    }

    addTrackToPlaylist(track) {
        this.tracks.push(track);
        this.renderPlaylist();
    }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const musicApp = new MusicApp();
});