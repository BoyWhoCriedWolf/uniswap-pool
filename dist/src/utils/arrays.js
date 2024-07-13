/**
 * Divides an array into slices of a given size
 * @param items
 * @param size
 * @returns
 */
function arrayToSlices(items, size) {
  if (items.length % size !== 0) throw new Error("Input array length must be a multiple of desired output size");
  return Array.from({
    length: Math.floor(items.length / size)
  }, function (_v, i) {
    return items.slice(i * size, i * size + size);
  });
}

export { arrayToSlices };
