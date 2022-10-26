/**
 * function to format file size for the build size charts
 * @param bytes - number that indicates file size
 * @param decimals - default parameter indicating formatting at 2 places after decimal point
 * @returns string that indicates file size
 */
export default function formatBytes(bytes: number, decimals = 2) {
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
