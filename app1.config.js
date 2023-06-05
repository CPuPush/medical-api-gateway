module.exports = {
  name: "app1",
  script: "NODE_ENV=production node ./bin/www",
  instances: 1,
  autorestart: true,
  watch: false,
  max_memory_restart: "1G",
};
