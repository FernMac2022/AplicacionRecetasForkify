import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  const fetchPro = fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message || 'Request failed'} (${res.status})`);

  return data;
};
