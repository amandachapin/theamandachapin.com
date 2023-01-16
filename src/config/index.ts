import { assertEnv } from '@/utils/env';

export const takeshapeApiUrl = assertEnv(
  process.env.NEXT_PUBLIC_BRANCH_TAKESHAPE_API_URL || process.env.NEXT_PUBLIC_TAKESHAPE_API_URL
);
export const takeshapeAnonymousApiKey = assertEnv(process.env.NEXT_PUBLIC_TAKESHAPE_ANONYMOUS_API_KEY);

/* Dev flags and vars */
export const vercelEnv = process.env.VERCEL_ENV ?? 'development';
export const isProduction = vercelEnv === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const isStorybook = Boolean(process.env.STORYBOOK);
export const isSsr = typeof window === 'undefined';
export const logLevel = process.env.NEXT_PUBLIC_LOG_LEVEL ?? 'info';
export const commitSha = process.env.VERCEL_GITHUB_COMMIT_SHA ?? '';
