export const shortAddress = (address) => // eslint-disable-line
  `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;
