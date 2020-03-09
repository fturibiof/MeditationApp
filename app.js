const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    const sounds = document.querySelectorAll('.sound-picker button');

    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    // Length of outline
    const outlineLength = outline.getTotalLength();

    // Set default duration
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            reset();
            checkPlaying(song);
        })
    })

    // play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select time
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            reset(0);
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`;
        })
    });

    const checkPlaying = song => {
        if (song.paused) {
            setPlay();
        } else {
            setPause();
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let minutes = Math.floor(elapsed / 60);
        let seconds = Math.floor(elapsed % 60);

        // Animate the circle
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate text
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (currentTime >= duration) {
            song.currentTime = 0;
            setPause();
            // song.pause();
            // play.src = './svg/play.svg'
        }
    }

    const setPlay = () => {
        song.play();
        video.play();
        play.src = './svg/pause.svg'
    }

    const setPause = () => {
        song.pause();
        video.pause();
        play.src = './svg/play.svg'
    }

    const reset = () => {
        song.currentTime = 0;
        setPause();
    }
}

app();