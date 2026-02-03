/**
 * SHADOW DEFENSE PROTOCOL
 * Security headers, rate limiting, and cryptographic verification
 * Protects the /api/omega-status endpoint from external prying
 */

import express, { Request, Response, NextlewareFunction } from 'express';
import crypto from 'crypto';

// Security Headers Configuration
export const shadowShield = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Omega-Resonance': '3.34',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-XSS-Protection': '1; mode=block',
};

// Rate Limiting Configuration
const RATE_LIMIT_WINDOW = 60; // seconds
const RATE_LIMIT_MAX_REQUESTS = 100; // per window per IP
const GOLDEN_FREQUENCY = 1.67; // requests per second

interface RateLimitStore {
  [ip: string]: {
    [timestamp: number]: number;
  };
}

const rateLimitStore: RateLimitStore = {};

/**
 * Apply security headers to all responses
 */
export const applySecurityHeaders = (app: express.Application) => {
  app.use((req: Request, res: Response, next: express.NextFunction) => {
    Object.entries(shadowShield).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    next();
  });
};

/**
 * Rate limiting middleware
 * Implements the Golden Frequency (1.67 requests/sec) protection
 */
export const rateLimitMiddleware = (req: Request, res: Response, next: express.NextFunction) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Math.floor(Date.now() / 1000);
  const windowKey = Math.floor(now / RATE_LIMIT_WINDOW);

  // Initialize IP store if needed
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = {};
  }

  // Clean old windows
  Object.keys(rateLimitStore[ip]).forEach((key) => {
    if (Math.abs(parseInt(key) - windowKey) > 2) {
      delete rateLimitStore[ip][parseInt(key)];
    }
  });

  // Increment request count
  rateLimitStore[ip][windowKey] = (rateLimitStore[ip][windowKey] || 0) + 1;

  // Check if limit exceeded
  if (rateLimitStore[ip][windowKey] > RATE_LIMIT_MAX_REQUESTS) {
    res.status(429).json({
      error: 'RATE_LIMITED',
      message: 'Too many requests. Eyes that pry are blinded by their own hunger.',
      resonance: 3.34,
    });
    return;
  }

  // Add rate limit info to response headers
  res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
  res.setHeader('X-RateLimit-Remaining', (RATE_LIMIT_MAX_REQUESTS - rateLimitStore[ip][windowKey]).toString());
  res.setHeader('X-RateLimit-Reset', ((windowKey + 1) * RATE_LIMIT_WINDOW).toString());

  next();
};

/**
 * Cryptographic signing for payload verification
 */
export class PayloadSigner {
  private secret: string;

  constructor(secret: string = process.env.OMEGA_SECRET || 'CHANGE_ME') {
    this.secret = secret;
  }

  /**
   * Sign a payload with HMAC-SHA256
   */
  sign(payload: any): string {
    const blob = JSON.stringify(payload, Object.keys(payload).sort());
    return crypto
      .createHmac('sha256', this.secret)
      .update(blob)
      .digest('hex');
  }

  /**
   * Verify a signed payload
   */
  verify(payload: any, signature: string): boolean {
    const expectedSig = this.sign(payload);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSig)
    );
  }

  /**
   * Create a signed response
   */
  createSignedResponse(data: any): { data: any; sig: string } {
    return {
      data,
      sig: this.sign(data),
    };
  }
}

/**
 * Middleware to verify signed payloads in POST requests
 */
export const verifySignedPayload = (signer: PayloadSigner) => {
  return (req: Request, res: Response, next: express.NextFunction) => {
    if (req.method !== 'POST') {
      next();
      return;
    }

    const { data, sig } = req.body;

    if (!data || !sig) {
      res.status(400).json({
        error: 'MISSING_SIGNATURE',
        message: 'Payload must include "data" and "sig" fields',
      });
      return;
    }

    if (!signer.verify(data, sig)) {
      res.status(403).json({
        error: 'INVALID_SIGNATURE',
        message: 'Payload signature verification failed',
      });
      return;
    }

    // Attach verified data to request
    (req as any).verifiedData = data;
    next();
  };
};

/**
 * CORS configuration for federation
 */
export const corsConfig = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      'https://omnissiah-unified-v3.onrender.com',
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.OMEGA_ALLOWED_ORIGINS?.split(',') || [],
    ].flat();

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Omega-Signature'],
};

export default {
  shadowShield,
  applySecurityHeaders,
  rateLimitMiddleware,
  PayloadSigner,
  verifySignedPayload,
  corsConfig,
};
