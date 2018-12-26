function append(href) {
  // Adds to header: <link rel="prefetch" href="asset.ext" />
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

const resources = {
  done: {},
  pending: {}
};

function run() {
  Object.keys(resources.pending).forEach((key) => append(key));
  Object.assign(resources.done, resources.pending);
  resources.pending = {};
}

function add(res) {
  if (resources.done.hasOwnProperty(res)) return false;
  if (resources.pending.hasOwnProperty(res)) return true;

  resources.pending[res] = true;
  return true;
}

export default {
  add: (res) => add(res) && run(),
  bulk(...arr) {
    return arr.reduce((acc, res) => add(res) || acc, false) && run();
  }
};
