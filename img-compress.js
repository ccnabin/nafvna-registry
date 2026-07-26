// Compresses an image file down to under `maxKB` (default 50KB) by
// progressively shrinking dimensions and JPEG quality. Returns a Blob.
// Usage: const smallBlob = await compressImage(fileInput.files[0]);
async function compressImage(file, maxKB = 50) {
  const dataUrl = await new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = dataUrl;
  });

  let width = img.width;
  let height = img.height;
  const maxBytes = maxKB * 1024;

  // Cap starting size so we don't waste passes on huge photos
  const startMaxDim = 800;
  if (width > startMaxDim || height > startMaxDim) {
    const scale = startMaxDim / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  let quality = 0.85;
  let blob;

  for (let attempt = 0; attempt < 12; attempt++) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(img, 0, 0, width, height);

    blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));

    if (blob.size <= maxBytes) return blob;

    // Still too big: reduce quality first, then dimensions
    if (quality > 0.4) {
      quality -= 0.1;
    } else {
      width = Math.round(width * 0.85);
      height = Math.round(height * 0.85);
    }
  }

  return blob; // best effort after 12 tries
}
