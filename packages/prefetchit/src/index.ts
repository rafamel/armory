interface Resources {
  done: { [key: string]: boolean };
  pending: { [key: string]: boolean };
}

const resources: Resources = {
  done: {},
  pending: {}
};

function append(href: string): void {
  // Adds to header: <link rel="prefetch" href="asset.ext" />
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

function run(): void {
  const keys = Object.keys(resources.pending);

  for (const key of keys) {
    append(key);
  }

  Object.assign(resources.done, resources.pending);
  resources.pending = {};
}

function add(resource: string): boolean {
  if (Object.hasOwnProperty.call(resources.done, resource)) {
    return false;
  }
  if (Object.hasOwnProperty.call(resources.pending, resource)) {
    return true;
  }

  resources.pending[resource] = true;
  return true;
}

export default {
  add(resource: string): void {
    add(resource);
    run();
  },
  bulk(...resources: string[]): void {
    if (resources.reduce((acc, resource) => add(resource) || acc, false)) {
      run();
    }
  }
};
