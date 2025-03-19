export default () => ({
  port: process.env.PORT,
  salt: process.env.SALT,
  db_url: process.env.DB_URL,
  expire_jwt: process.env.EXPIRE_JWT,
  app_admin_secret: process.env.APP_ADMIN_SECRET,
  super_admin_secret: process.env.SUPER_ADMIN_SECRET,
  db_name: process.env.DB_NAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  docker_db_url: process.env.DOCKER_DB_URL,
});
