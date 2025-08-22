export default function auditLogger(action, user) {
  const timestamp = new Date().toISOString();
  console.log(`[AUDIT] ${timestamp} | User: ${user ? user.id : 'unknown'} | Action: ${action}`);
  // Extend to write to file or database as needed
};
