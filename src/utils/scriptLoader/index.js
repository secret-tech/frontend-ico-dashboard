/* eslint-disable */
// yep, it's not good

const loadScript = (url) => {
  if (Array.isArray(url)) {
    let self = this;
    let prom = [];
    url.forEach(function (item) {
      prom.push(self.script(item));
    });
    return Promise.all(prom);
  }

  return new Promise(function (resolve, reject) {
    let r = false;
    let t = document.getElementsByTagName('script')[0];
    let s = document.createElement('script');

    s.type = 'text/javascript';
    s.src = url;
    s.async = true;
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true;
        resolve(this);
      }
    };
    s.onerror = s.onabort = reject;
    t.parentNode.insertBefore(s, t);
  });
};

export default loadScript;

/* eslint-enable */
