'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Returns the time elapsed between page load and now in milliseconds.
 * @param markName the identifier for the performance mark to be created and measured.
 */
function calculateElapsedTimeWithPerformanceMarkMs(markName, fallbackStartTime) {
  var elapsedTime = performance.mark(markName);
  if (elapsedTime) {
    return elapsedTime.startTime;
  }
  if (fallbackStartTime) {
    // On some browsers like iOS WebViews, performance.mark is not supported.
    return Date.now() - fallbackStartTime;
  }
  return undefined;
}

exports.calculateElapsedTimeWithPerformanceMarkMs = calculateElapsedTimeWithPerformanceMarkMs;
