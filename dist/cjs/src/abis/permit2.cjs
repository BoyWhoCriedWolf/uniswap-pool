'use strict';

var PERMIT2_ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint160",
				name: "amount",
				type: "uint160"
			},
			{
				internalType: "uint48",
				name: "expiration",
				type: "uint48"
			},
			{
				internalType: "uint48",
				name: "nonce",
				type: "uint48"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

module.exports = PERMIT2_ABI;
