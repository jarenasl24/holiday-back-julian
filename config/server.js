module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('SERVER_URL', 'https://buzondenavidad.com:1338'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a79b314a95b2bbdd42f088e9db485e19'),
    },
  },
});
