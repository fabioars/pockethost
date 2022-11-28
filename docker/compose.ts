const out = {
  version: '3',
  networks: {
    'app-network': {
      driver: 'bridge',
    },
  },
  services: {
    base: {
      environment: [
        {
          NODE_ENV: '${NODE_ENV:-development}',
        },
        {
          DEBUG: '${DEBUG:-true}',
        },
        {
          PUBLIC_APP_PROTOCOL: 'https',
        },
        {
          PUBLIC_APP_DOMAIN: '${PUBLIC_APP_DOMAIN:-pockethost.test}',
        },
        {
          PUBLIC_PB_PROTOCOL: 'https',
        },
        {
          PUBLIC_PB_DOMAIN: '${PUBLIC_PB_DOMAIN:-pockethost.test}',
        },
        {
          PUBLIC_PB_SUBDOMAIN: 'pockethost-central',
        },
        {
          DAEMON_PB_BIN_DIR: '/pockethost/pocketbase',
        },
        {
          DAEMON_PB_DATA_DIR: '/data',
        },
        {
          DAEMON_PB_USERNAME:
            '${DAEMON_PB_USERNAME:?DAEMON_PB_USERNAME required}',
        },
        {
          DAEMON_PB_PASSWORD:
            '${DAEMON_PB_PASSWORD:?DAEMON_PB_PASSWORD required}',
        },
        {
          DAEMON_PB_PORT: 8090,
        },
        {
          DAEMON_IDLE_TTL: 5000,
        },
        {
          DAEMON_PB_BACKUP_SLEEP: 100,
        },
        {
          DAEMON_PB_BACKUP_PAGE_COUNT: 5,
        },
        {
          GOPATH: '/go-mod',
        },
        {
          GOCACHE: '/go-cache',
        },
        {
          YARN_CACHE: '/yarn-cache',
        },
        {
          SHELL: '/bin/bash',
        },
      ],
      image: 'benallfree/pockethost',
      platform: 'linux/amd64',
      networks: ['app-network'],
      volumes:
        "..:/mount/src '${PH_DATA:?PH_DATA Required}:/mount/data' '${PH_CACHE:?PH_CACHE required}/yarn:/mount/yarn-cache' '${PH_CACHE:?PH_CACHE required}/go-mod:/go-mod' '${PH_CACHE:?PH_CACHE required}/go-cache:/go-cache' '${PH_CACHE:?PH_CACHE required}/node_modules:/src/node_modules' '${PH_PB_BIN:?PH_PB_BIN Required}:/pocketbase' '${PH_NGINX:?PH_NGINX required}/templates:/etc/nginx/templates' '${PH_NGINX}/logs:/mount/nginx/logs' '${PH_NGINX}/ssl:/mount/nginx/ssl'",
    },
    'www-dev': {
      profiles: ['dev'],
      restart: 'unless-stopped',
      working_dir: '/src/packages/pockethost.io',
      command: 'yarn dev --host=www',
      ports: ['9000:5173'],
      depends_on: {
        'daemon-dev': {
          condition: 'service_started',
        },
      },
    },
    'www-prod': {
      profiles: ['prod'],
      restart: 'unless-stopped',
      working_dir: '/pockethost/www',
      command: 'node index.js --host=www',
      ports: ['9000:5173'],
      depends_on: {
        daemon: {
          condition: 'service_started',
        },
      },
    },
    'daemon-dev': {
      profiles: ['dev'],
      container_name: 'daemon',
      working_dir: '/src/packages/daemon',
      command: 'yarn dev',
      restart: 'unless-stopped',
      ports: ['9001:3000'],
    },
    'daemon-prod': {
      profiles: ['prod'],
      container_name: 'daemon',
      working_dir: '/pockethost/daemon/packages/daemon',
      command: 'yarn start',
      restart: 'unless-stopped',
      environment: ['SHELL=/bin/bash'],
      ports: ['9001:3000'],
    },
    nginx: {
      profiles: ['prod', 'dev'],
      restart: 'unless-stopped',
      depends_on: ['www', 'daemon'],
      ports: ['80:80', '443:443'],
    },
  },
}
