var Markets = /*#__PURE__*/function (Markets) {
  Markets["LooksRare"] = "looksrare";
  Markets["X2Y2"] = "x2y2";
  Markets["NFT20"] = "nft20";
  Markets["NFTX"] = "nftx";
  Markets["Opensea"] = "opensea";
  Markets["Rarible"] = "rarible";
  Markets["Sudoswap"] = "sudoswap";
  Markets["Cryptopunks"] = "cryptopunks";
  Markets["Gem"] = "gem";
  Markets["Foundation"] = "foundation";
  Markets["Zora"] = "zora";
  Markets["Blur"] = "blur";
  Markets["Ensvision"] = "ensvision";
  return Markets;
}({});
var isPooledMarket = function isPooledMarket(market) {
  if (!market) return false;
  return market === Markets.NFTX || market === Markets.NFT20 || market === Markets.Sudoswap;
};

export { Markets, isPooledMarket };
