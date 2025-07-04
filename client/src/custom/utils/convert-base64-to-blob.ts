export const base64ToBlob = (base64: string, contentType = "") => {
  // Decode Base64 string
  const binary = atob(base64);

  // Create an ArrayBuffer and a view (Uint8Array) for the binary data
  const arrayBuffer = new ArrayBuffer(binary.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Fill the view with binary data
  for (let i = 0; i < binary.length; i++) {
    uint8Array[i] = binary.charCodeAt(i);
  }

  // Create and return the Blob
  return new Blob([uint8Array], { type: contentType });
};
