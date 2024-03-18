module.exports = {
  apps: [
    {
      name: "click.app-client",
      exec_mode: "cluster",
      instances: "1",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env_prod: {
        NODE_ENV: "production",
        PORT: 3010,
      },
    },
  ],
};
