export const shortAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;

/**
 * Short bigNum for render
 * @param num number big number
 * @param limit number chars after
 * @return string
 */

export const bigNum = (num, limit = 6) => {
  const string = String(num);
  const array = string.split('.');

  if (num === '') return num;
  if (num === 0) return num;

  if (string.includes('.')) {
    const afterDot = array[1].substr(0, limit);
    return limit ? `${array[0]}.${afterDot}` : array[0];
  }

  return array[0];
};
