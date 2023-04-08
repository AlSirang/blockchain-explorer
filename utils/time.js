export const timeAgo = (secondsAgo) => {
  if (!secondsAgo) return null;
  const seconds = Math.ceil((Date.now() - secondsAgo * 1000) / 1000);
  return seconds > 60 ? Math.floor(seconds / 60) + "min" : seconds + " secs";
};
