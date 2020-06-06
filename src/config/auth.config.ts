export default () => ({
  auth: {
    pwd: {
      pepper: process.env.AUTH_PWD_PEPPER || 'kotsSecretPepper',
      resetTokenLifeTime: process.env.AUTH_PWD_RESET_TOKEN_LIFE_TIME || 86400000
    },
    jwt: {
      accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY || 'kotsJwtSecretKey',
      refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY || 'kotsRefreshJwtSecretKey',
      accessKeyLifetime: process.env.JWT_ACCESS_KEY_LIFE_TIME || 28800,
      refreshSecretKeyLifetime: process.env.JWT_REFRESH_SECRET_KEY_LIFE_TIME || 2592000,
    }
  }
})
