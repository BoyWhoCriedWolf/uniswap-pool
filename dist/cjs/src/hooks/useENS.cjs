'use strict';

var React = require('react');
var addresses = require('../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var useENSAddress = require('./useENSAddress.cjs');
var useENSName = require('./useENSName.cjs');

/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
function useENS(nameOrAddress) {
  var validated = addresses.isAddress(nameOrAddress);
  var reverseLookup = useENSName(validated ? validated : undefined);
  var lookup = useENSAddress(nameOrAddress);
  return React.useMemo(function () {
    return {
      loading: reverseLookup.loading || lookup.loading,
      address: validated ? validated : lookup.address,
      name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null
    };
  }, [lookup.address, lookup.loading, nameOrAddress, reverseLookup.ENSName, reverseLookup.loading, validated]);
}

module.exports = useENS;
