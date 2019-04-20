const preload = url => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = url;
  img.onload = () => resolve(url);
  img.onerror = reject;
});

export default (urls = []) =>
  Promise.all(urls.map(preload));
