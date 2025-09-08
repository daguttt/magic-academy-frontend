/**
 * TODO
 * - [x] Set up server instance
 * - [x] Set up server routes
 * - [ ] Set up client instance: https://www.better-auth.com/docs/installation#create-client-instance
 */

import { auth } from '~/server/auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const { POST, GET } = toNextJsHandler(auth);
