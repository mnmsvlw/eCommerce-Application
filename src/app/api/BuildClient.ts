import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

const projectKey = 'ecommerce-application-jsfe2023q1';
const scopes = [
  'manage_my_orders:ecommerce-application-jsfe2023q1 manage_my_quote_requests:ecommerce-application-jsfe2023q1 manage_my_quotes:ecommerce-application-jsfe2023q1 manage_my_business_units:ecommerce-application-jsfe2023q1 view_published_products:ecommerce-application-jsfe2023q1 manage_my_shopping_lists:ecommerce-application-jsfe2023q1 create_anonymous_token:ecommerce-application-jsfe2023q1 manage_my_profile:ecommerce-application-jsfe2023q1 view_categories:ecommerce-application-jsfe2023q1 manage_my_payments:ecommerce-application-jsfe2023q1',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com/',
  projectKey,
  credentials: {
    clientId: 'a4FczAx7NFmmmCPXTTK76v45',
    clientSecret: 'vVwqTPublkZvFJbojd3QgCFIHBj2L4Az',
  },
  scopes,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com/',
};

const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
export default ctpClient;
