module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://market-assets.strapi.io'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
      frameguard: {
        action: 'deny',
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
      },
      xssFilter: true,
      noSniff: true,
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:8083', 'http://127.0.0.1:8083', 'http://localhost:3000', 'http://127.0.0.1:3000'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    },
  },
  // 'strapi::poweredBy' removed for security hardening (prevent fingerprinting)
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      patchKoa: true,
      multipart: true,
      includeUnparsed: false,
      jsonLimit: '1mb',
      formLimit: '1mb',
      textLimit: '1mb',
    },
  },
  'global::password-policy',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
