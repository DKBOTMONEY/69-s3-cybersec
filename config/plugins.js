module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '2h',
      },
    },
  },
  email: {
    config: {
      provider: 'sendmail',
      providerOptions: {
        smtpPort: env.int('SMTP_PORT', 1025),
        smtpHost: env('SMTP_HOST', 'mailpit'),
        devPort: env.int('SMTP_PORT', 1025),
        devHost: env('SMTP_HOST', 'mailpit'),
      },
      settings: {
        defaultFrom: env('DEFAULT_FROM', 'security@cybersec.local'),
        defaultReplyTo: env('DEFAULT_REPLY_TO', 'security@cybersec.local'),
      },
    },
  },
});
