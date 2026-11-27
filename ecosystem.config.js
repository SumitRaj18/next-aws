module.exports = {
  apps: [{
    name: 'next-aws',
    script: 'npm',
    args: 'start',
    env: { NODE_ENV: 'production', PORT: 3000 }
  }]
};