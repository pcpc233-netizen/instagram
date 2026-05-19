import { toPng } from 'html-to-image';

export async function captureElement(element: HTMLElement): Promise<string> {
  await document.fonts.ready;

  return toPng(element, {
    width: 1080,
    height: 1080,
    pixelRatio: 1,
    cacheBust: true,
  });
}

export function triggerDownload(dataUrl: string, filename: string): void {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function downloadSlide(element: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await captureElement(element);
  triggerDownload(dataUrl, filename);
}

export async function downloadAllAsZip(
  elements: (HTMLElement | null)[],
  brandName: string
): Promise<void> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  const folder = zip.folder(brandName) ?? zip;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (!el) continue;

    const dataUrl = await captureElement(el);
    const base64 = dataUrl.split(',')[1];
    const padded = String(i + 1).padStart(2, '0');
    folder.file(`slide_${padded}.png`, base64, { base64: true });
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, `${brandName}_카드뉴스.zip`);
  URL.revokeObjectURL(url);
}
