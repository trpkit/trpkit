import { useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string, blobType?: string) => Promise<void>;

/**
 * A hook to copy text to the clipboard
 *
 * @returns {[CopiedValue, CopyFn]} A tuple containing:
 * - The last copied value (string or null)
 * - The copy function to copy text to the clipboard
 */
export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  /**
   * Copies the given text to the clipboard
   *
   * @param {string} text - The text to be copied to the clipboard
   * @param {string} blobType - The MIME type of the text being copied
   * @returns {Promise<void>} A promise that resolves when the text is copied
   */
  const copy: CopyFn = async (text, blobType = "text/plain") => {
    if (!navigator.clipboard) {
      console.warn("Clipboard not supported");
      return;
    }

    const clipboardWriteSupported = Boolean(typeof ClipboardItem && navigator.clipboard.write);

    try {
      clipboardWriteSupported
        ? await clipboardWrite(text, blobType)
        : await clipboardWriteText(text);

      setCopiedText(text);
    } catch {
      console.warn("Failed to copy");
      setCopiedText(null);
    }
  };

  /**
   * Writes the given text to the clipboard
   *
   * Note: Firefox only supports text/plain, text/html and image/png
   *
   * @param {string} value - The text to be written to the clipboard
   * @param {string} blobType - The MIME type of the text being copied
   * @returns {Promise<void>} A promise that resolves when the text is written to the clipboard
   */
  async function clipboardWrite(value: string, blobType = "text/plain") {
    try {
      await navigator.clipboard.write([new ClipboardItem({ [blobType]: value })]);
    } catch {}
  }

  /**
   * Writes the given text to the clipboard
   *
   * Note: This method is supported by all modern browsers
   *
   * @param {string} value - The text to be written to the clipboard
   * @returns {Promise<void>} A promise that resolves when the text is written to the clipboard
   */
  async function clipboardWriteText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  return [copiedText, copy];
}
