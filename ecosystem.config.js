module.exports = {
  apps: [
    {
      name: 'micro_service',
      namespace: 'micro_service',
      script: './server.js',
      args: 'micro_service',
      combine_logs: true,
      cwd: '/etc/eranda/micro_service/',
      instances: 1,
      // wait_ready: true,
      listen_timeout: 180000,
      kill_timeout: 120000
    }
  ]
}