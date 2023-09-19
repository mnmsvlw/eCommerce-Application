import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import myTokenCache from './CustomTokenCache';

const projectKey = 'ecommerce-application-jsfe2023q1';
const scopes = [
  'manage_my_orders:ecommerce-application-jsfe2023q1 manage_my_quote_requests:ecommerce-application-jsfe2023q1 manage_my_quotes:ecommerce-application-jsfe2023q1 manage_my_business_units:ecommerce-application-jsfe2023q1 view_published_products:ecommerce-application-jsfe2023q1 manage_my_shopping_lists:ecommerce-application-jsfe2023q1 create_anonymous_token:ecommerce-application-jsfe2023q1 manage_my_profile:ecommerce-application-jsfe2023q1 view_categories:ecommerce-application-jsfe2023q1 manage_my_payments:ecommerce-application-jsfe2023q1',
];

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com/',
};

const clientCredentialsAuthMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com/',
  projectKey,
  credentials: {
    clientId: 'a4FczAx7NFmmmCPXTTK76v45',
    clientSecret: 'vVwqTPublkZvFJbojd3QgCFIHBj2L4Az',
  },
  scopes,
};

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com/',
  projectKey,
  credentials: {
    clientId: 'a4FczAx7NFmmmCPXTTK76v45',
    clientSecret: 'vVwqTPublkZvFJbojd3QgCFIHBj2L4Az',
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
