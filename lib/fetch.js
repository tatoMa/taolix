import { AbortController } from "node-abort-controller";
export async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 6000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}
