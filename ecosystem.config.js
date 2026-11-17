// pm2 process definition for the Express frontend (port 3000)
module.exports = {
  apps: [
    {
      name: "express-frontend",
      script: "server.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        BACKEND_URL: "http://localhost:5000",
      },
    },
  ],
};
