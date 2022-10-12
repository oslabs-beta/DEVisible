export default function formatTime(ms: number) {
  const seconds = ms / 1000;
  const minutes = ms / (1000 * 60);
  const hours = ms / (1000 * 60 * 60);
  if (seconds < 60) return `${seconds}sec`;
  if (minutes < 60)
    return `${Math.floor(minutes)}min ${Math.floor(
      (ms % (1000 * 60)) / 1000
    )}sec`;
  return `${Math.floor(hours)}hr ${Math.floor(
    (ms % (1000 * 60 * 60)) / (1000 * 60)
  )}min ${Math.floor((ms % (1000 * 60)) / 1000)}sec`;
}

console.log(formatTime(2000)); // 2 sec
console.log(formatTime(121000)); // 2 min
console.log(formatTime(7605000)); // 2 hr
