import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem(STORAGE_KEY, seconds);
  });
}

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });
const curentTime = localStorage.getItem(STORAGE_KEY) || 0;
console.log(curentTime);
player.setCurrentTime(curentTime).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      // the time was less than 0 or greater than the video’s duration
      break;

    default:
      // some other error occurred
      break;
  }
});
