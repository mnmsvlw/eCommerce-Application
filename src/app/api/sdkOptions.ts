import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import myTokenCache from './CustomTokenCache';

const projectKey = process.env.PROJECT_KEY as string;
const scopes = [process.env.SCOPES as string];

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.HTTP_MIDDLEWARE_HOST as string,
};

const clientCredentialsAuthMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.AUTH_MIDDLEWARE_HOST as string,
  projectKey,
  credentials: {
    clientId: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
  },
  scopes,
};

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: process.env.AUTH_MIDDLEWARE_HOST as string,
  projectKey,
  credentials: {
    clientId: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
  },
  tokenCache: myTokenCache,
  scopes,
};

export {
  projectKey,
  scopes,
  httpMiddlewareOptions,
  clientCredentialsAuthMiddlewareOptions,
  anonymousAuthMiddlewareOptions,
};
