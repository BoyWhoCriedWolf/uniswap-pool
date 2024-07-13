'use strict';

var contenthashToUri = require('../lib/utils/contenthashToUri.cjs');
var parseENSAddress = require('../lib/utils/parseENSAddress.cjs');
var uriToHttp = require('../lib/utils/uriToHttp.cjs');
var React = require('react');
var useENSContentHash = require('./useENSContentHash.cjs');

function useHttpLocations(uri) {
  var ens = React.useMemo(function () {
    return uri ? parseENSAddress(uri) : undefined;
  }, [uri]);
  var resolvedContentHash = useENSContentHash(ens === null || ens === void 0 ? void 0 : ens.ensName);
  return React.useMemo(function () {
    if (ens) {
      return resolvedContentHash.contenthash ? uriToHttp(contenthashToUri["default"](resolvedContentHash.contenthash)) : [];
    } else {
      return uri ? uriToHttp(uri) : [];
    }
  }, [ens, resolvedContentHash.contenthash, uri]);
}

module.exports = useHttpLocations;
