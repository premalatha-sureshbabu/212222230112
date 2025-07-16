export function logEvent(type, payload) {
  const log = {
    timestamp: new Date().toISOString(),
    type,
    payload,
  };
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(log);
  localStorage.setItem('logs', JSON.stringify(logs));
}
