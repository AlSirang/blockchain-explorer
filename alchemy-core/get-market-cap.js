export const getMarketCap = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/ethereum"
    );
    const marketCap = await response.json();
    return marketCap.market_data.market_cap.usd;
  } catch (err) {
    return 0;
  }
};
