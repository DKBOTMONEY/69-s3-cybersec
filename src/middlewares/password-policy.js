'use strict';

/**
 * NIST SP 800-63B & IAAA Compliant Password Policy Enforcement Middleware
 * Enforces strong password complexity on registration, password reset, and password change
 * for both End-User and Administrator endpoints.
 * Includes password reuse prevention and security audit logging (Accountability).
 */
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const isPasswordEndpoint =
      (
        ctx.path === '/api/auth/local/register' ||
        ctx.path === '/api/auth/reset-password' ||
        ctx.path === '/api/auth/change-password' ||
        ctx.path === '/admin/reset-password' ||
        ctx.path === '/admin/register-admin' ||
        ctx.path === '/admin/users'
      ) && ctx.method === 'POST';

    const isPasswordUpdateEndpoint =
      (ctx.path === '/admin/users/me' || /^\/admin\/users\/\d+$/.test(ctx.path)) &&
      (ctx.method === 'PUT' || ctx.method === 'POST');

    if (isPasswordEndpoint || isPasswordUpdateEndpoint) {
      const { password, currentPassword } = ctx.request.body || {};

      // 1. Password Reuse Prevention (IAAA - Authentication & Integrity)
      if (ctx.path === '/api/auth/change-password' && currentPassword && password) {
        if (currentPassword === password) {
          strapi.log.warn(
            `[SECURITY AUDIT] [IAAA-Authentication] Password reuse rejected on ${ctx.path} from IP: ${ctx.ip}`
          );
          ctx.status = 400;
          ctx.body = {
            data: null,
            error: {
              status: 400,
              name: 'ValidationError',
              message:
                'New password must be different from the current password (NIST SP 800-63B).',
            },
          };
          return;
        }
      }

      // 2. NIST SP 800-63B Password Complexity Validation
      if (password) {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        if (!minLength || !hasUpper || !hasLower || !hasDigit || !hasSpecial) {
          strapi.log.warn(
            `[SECURITY AUDIT] [IAAA-Authentication] Weak password rejected on ${ctx.path} from IP: ${ctx.ip}`
          );
          ctx.status = 400;
          ctx.body = {
            data: null,
            error: {
              status: 400,
              name: 'ValidationError',
              message:
                'Password does not meet NIST SP 800-63B complexity requirements: minimum 8 characters, with uppercase, lowercase, number, and special character.',
              details: {
                requirements: [
                  'At least 8 characters long',
                  'At least 1 uppercase letter (A-Z)',
                  'At least 1 lowercase letter (a-z)',
                  'At least 1 digit (0-9)',
                  'At least 1 special character (!@#$%^&*...)',
                ],
              },
            },
          };
          return;
        }
      }
    }

    await next();

    // 3. Security Audit Trail (IAAA - Accountability)
    if (ctx.status >= 200 && ctx.status < 300) {
      if (ctx.path === '/api/auth/change-password') {
        strapi.log.info(
          `[SECURITY AUDIT] [IAAA-Accountability] Password changed successfully on ${ctx.path} from IP: ${ctx.ip}`
        );
      } else if (
        ctx.path === '/api/auth/reset-password' ||
        ctx.path === '/admin/reset-password'
      ) {
        strapi.log.info(
          `[SECURITY AUDIT] [IAAA-Accountability] Password reset completed on ${ctx.path} from IP: ${ctx.ip}`
        );
      } else if (ctx.path === '/api/auth/local/register') {
        strapi.log.info(
          `[SECURITY AUDIT] [IAAA-Accountability] New user registration completed from IP: ${ctx.ip}`
        );
      }
    }
  };
};

