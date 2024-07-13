function addressesAreEquivalent(a, b) {
  if (!a || !b) return false;
  return a === b || a.toLowerCase() === b.toLowerCase();
}

export { addressesAreEquivalent };
