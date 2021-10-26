module.exports = ({ env }) => ({
  host: env('HOST', 'htttps://buzondenavidad.com'),
  port: env.int('PORT', 1338),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a79b314a95b2bbdd42f088e9db485e19'),
    },
  },
});
