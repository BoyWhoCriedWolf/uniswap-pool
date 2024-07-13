import { toConnectionType } from './types.js';

const connectionMetaKey = "connection_meta";
function getPersistedConnectionMeta() {
  try {
    const value = localStorage.getItem(connectionMetaKey);
    if (value) {
      const raw = JSON.parse(value);
      const connectionType = toConnectionType(raw.type);
      if (connectionType) {
        return {
          type: connectionType,
          address: raw.address,
          ENSName: raw.ENSName
        };
      }
    }
  } catch (e) {
    console.warn(e);
  }
  return;
}
function deletePersistedConnectionMeta() {
  localStorage.removeItem(connectionMetaKey);
}

export { connectionMetaKey, deletePersistedConnectionMeta, getPersistedConnectionMeta };
