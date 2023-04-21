import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
console.log(Player);

const vimeoPlayer = new Player(document.getElementById('vimeo-player'));
let videoPlayerTime = 0;
const updateLocalStorage = throttle(() => {
    localStorage.setItem('videoplayer-current-time', videoPlayerTime);
}, 1000);

vimeoPlayer.on('timeupdate', (data) => {
    videoPlayerTime = data.seconds;
    updateLocalStorage();
});
    
window.addEventListener('load', () => {
    const storedTime = localStorage.getItem('videoplayer-current-time');
    if (storedTime) {
        vimeoPlayer.setCurrentTime(storedTime).then(() => {
            console.log(`play video ${storedTime}`);
        }).catch((error) => {
            console.log(`stored time ${error}`);
        });
    }
});