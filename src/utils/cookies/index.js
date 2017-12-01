/* eslint-disable */

export function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined
}

/* eslint-enable */

export const parseGTM = (gtm) => {
  if (!gtm) return null;

  const arr = gtm.split('.');
  return `${arr[2]}.${arr[3]}`;
};
