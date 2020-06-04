export default () => ({
  auth: {
    pepper: process.env.AUTH_PEPPER || 'kotsSecretPepper',
  }
})
