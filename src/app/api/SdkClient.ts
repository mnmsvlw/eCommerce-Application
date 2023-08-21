import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ClientBuilder, PasswordAuthMiddlewareOptions, TokenStore, Client } from '@commercetools/sdk-client-v2';
import myTokenCache from './CustomTokenCache';
import {
  anonymousAuthMiddlewareOptions,
  clientCredentialsAuthMiddlewareOptions,
  httpMiddlewareOptions,
  projectKey,
  scopes,
} from './sdkOptions';
import { ApiError } from '../../types/sdkTypes';

class SdkClient {
  apiRoot: ByProjectKeyRequestBuilder;

  isAuthorizedUser: boolean;

  userEmail: string;

  constructor() {
    const name = localStorage.getItem('name');

    if (name) {
      this.isAuthorizedUser = true;
      this.userEmail = name;
    } else {
      this.isAuthorizedUser = false;
      this.userEmail = 'Profile';
    }

    this.apiRoot = this.setClientCredentialsFlow();
  }

  init() {
    this.checkPreviousToken();
  }

  getClientCredentialsOptions = () => {
    const tokenStore = JSON.parse(localStorage.getItem('tokenStore') as string) as TokenStore;

    if (tokenStore) {
      myTokenCache.store = tokenStore;
    }

    return {
      ...clientCredentialsAuthMiddlewareOptions,
      tokenCache: myTokenCache,
    };
  };

  setClientCredentialsFlow = () => {
    const ctpClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(this.getClientCredentialsOptions())
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
  };

  setAnonymousSessionFlow = () => {
    this.isAuthorizedUser = false;

    const ctpClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    this.updateRoot(ctpClient);
  };

  getPasswordOptions = (username: string, password: string) => {
    myTokenCache.reset();
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: process.env.AUTH_MIDDLEWARE_HOST as string,
      projectKey,
      credentials: {
        clientId: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string,
        user: {
          username,
          password,
        },
      },
      tokenCache: myTokenCache,
      scopes,
    };

    return passwordAuthMiddlewareOptions;
  };

  setPasswordFlow = (username: string, password: string) => {
    this.isAuthorizedUser = true;

    const ctpClient = new ClientBuilder()
      .withProjectKey(projectKey)
      .withPasswordFlow(this.getPasswordOptions(username, password))
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    this.updateRoot(ctpClient);
  };

  updateRoot = (client: Client) => {
    this.apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
  };

  checkPreviousToken = async () => {
    if (myTokenCache.store.refreshToken) {
      try {
        const userInfo = await this.apiRoot.me().get().execute();
        const { firstName } = userInfo.body;
        const { lastName } = userInfo.body;

        if (firstName && lastName) {
          this.userEmail = `${firstName} ${lastName}`;
        } else {
          this.userEmail = 'Profile';
        }

        this.isAuthorizedUser = true;
      } catch (e) {
        const error = e as ApiError;

        if (error.statusCode === 403) {
          console.log('Anonymous session initialized');
        }
      }
    }
  };

  reset = () => {
    this.isAuthorizedUser = false;
    this.userEmail = 'Profile';
    localStorage.removeItem('tokenStore');
    localStorage.removeItem('name');
    this.apiRoot = this.setClientCredentialsFlow();
  };
}

const sdkClient = new SdkClient();

export default sdkClient;
