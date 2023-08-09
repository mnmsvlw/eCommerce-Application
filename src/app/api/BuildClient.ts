import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = 'ecommerce-application-jsfe2023q1';
const scopes = [
  'manage_my_orders:ecommerce-application-jsfe2023q1 manage_my_quote_requests:ecommerce-application-jsfe2023q1 manage_my_quotes:ecommerce-application-jsfe2023q1 manage_my_business_units:ecommerce-application-jsfe2023q1 view_published_products:ecommerce-application-jsfe2023q1 manage_my_shopping_lists:ecommerce-application-jsfe2023q1 create_anonymous_token:ecommerce-application-jsfe2023q1 manage_my_profile:ecommerce-application-jsfe2023q1 view_categories:ecommerce-application-jsfe2023q1 manage_my_payments:ecommerce-application-jsfe2023q1',
];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com/',
  projectKey,
  credentials: {
    clientId: 'a4FczAx7NFmmmCPXTTK76v45',
    clientSecret: 'vVwqTPublkZvFJbojd3QgCFIHBj2L4Az',
  },
  scopes,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com/',
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
export default ctpClient;
