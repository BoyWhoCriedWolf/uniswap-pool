'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var EXPLORER_HOSTNAMES = {
  "bscscan.com": true,
  "etherscan.io": true,
  "goerli.etherscan.io": true,
  "sepolia.etherscan.io": true,
  "optimistic.etherscan.io": true,
  "goerli-optimism.etherscan.io": true,
  "arbiscan.io": true,
  "snowtrace.io": true
};

/**
 * Returns the anonymized version of the given href, i.e. one that does not leak user information
 * @param href the link to anonymize, i.e. remove any personal data from
 * @return string anonymized version of the given href
 */
function anonymizeLink(href) {
  try {
    var url = new URL(href);
    if (EXPLORER_HOSTNAMES[url.hostname]) {
      var pathPieces = url.pathname.split("/");
      var anonymizedPath = pathPieces.map(function (pc) {
        return /0x[a-fA-F0-9]+/.test(pc) ? "***" : pc;
      }).join("/");
      return "".concat(url.protocol, "//").concat(url.hostname).concat(anonymizedPath);
    }
    return href;
  } catch (error) {
    return href;
  }
}

exports.anonymizeLink = anonymizeLink;
