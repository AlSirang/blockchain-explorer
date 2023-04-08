export const getShortenAddress = (address) => {
  if (!address) return null;

  return address.slice(0, 5) + "...." + address.slice(address.length - 5);
};

export const getShortenAddressEnd = (address) => {
  if (!address) return null;

  return address.slice(0, 10) + "....";
};
