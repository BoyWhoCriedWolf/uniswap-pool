'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/**
 * Checks whether a given node is currently animating.
 *
 * @param node - The node to check for ongoing animations.
 * @returns - true if the node is animating; false otherwise.
 */
function isAnimating(node) {
  var _node$getAnimations$l, _node$getAnimations;
  return ((_node$getAnimations$l = node === null || node === void 0 || (_node$getAnimations = node.getAnimations) === null || _node$getAnimations === void 0 ? void 0 : _node$getAnimations.call(node).length) !== null && _node$getAnimations$l !== void 0 ? _node$getAnimations$l : 0) > 0;
}

/**
 * This hook runs an unmounting animation on a specified node.
 *
 * The hook will also run the animation on any additional elements specified in
 * the `animatedElements` parameter. If no additional elements are specified,
 * the animation will only run on the provided node.
 *
 * After any of the animated elements have completed their animation, `node` is removed from its parent.
 *
 * @param node - The node to animate and remove.
 * @param getAnimatingClass - A function that returns the CSS class to add to the animating elements.
 * @param animatedElements - Additional elements to animate.
 * @param skip - Whether to skip the animation and remove the node immediately.
 */
function useUnmountingAnimation(node, getAnimatingClass, animatedElements) {
  var skip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  React.useEffect(function () {
    var _animatedElements$map;
    var current = node.current;

    // Gather all elements to animate, defaulting to the current node if none are specified.
    var animated = (_animatedElements$map = animatedElements === null || animatedElements === void 0 ? void 0 : animatedElements.map(function (element) {
      return element.current;
    })) !== null && _animatedElements$map !== void 0 ? _animatedElements$map : [current];
    var parent = current === null || current === void 0 ? void 0 : current.parentElement;
    var removeChild = parent === null || parent === void 0 ? void 0 : parent.removeChild;

    // If we can't remove the child or skipping is requested, stop here.
    if (!(parent && removeChild) || skip) return;

    // Override the parent's removeChild function to add our animation logic
    parent.removeChild = function (child) {
      // If the current child is the one being removed and it's supposed to animate
      if (child === current && animated) {
        // Add animation class to all elements
        animated.forEach(function (element) {
          return element === null || element === void 0 ? void 0 : element.classList.add(getAnimatingClass());
        });

        // Check if any of the animated elements is animating
        var animating = animated.find(function (element) {
          return isAnimating(element !== null && element !== void 0 ? element : undefined);
        });
        if (animating) {
          // If an element is animating, we wait for the animation to end before removing the child
          animating === null || animating === void 0 || animating.addEventListener("animationend", function (x) {
            // This check is needed because the animationend event will fire for all animations on the
            // element or its children.
            if (x.target === animating) {
              removeChild.call(parent, child);
            }
          });
        } else {
          // If no element is animating, we remove the child immediately
          removeChild.call(parent, child);
        }
        // We've handled the removal, so we return the child
        return child;
      } else {
        // If the child isn't the one we're supposed to animate, remove it normally
        return removeChild.call(parent, child);
      }
    };

    // Reset the removeChild function to its original value when the component is unmounted
    return function () {
      parent.removeChild = removeChild;
    };
  }, [animatedElements, getAnimatingClass, node, skip]);
}

exports.useUnmountingAnimation = useUnmountingAnimation;
