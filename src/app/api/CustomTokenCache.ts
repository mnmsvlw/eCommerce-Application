import { TokenCache, TokenCacheOptions, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  store: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  get(_tokenCacheOptions?: TokenCacheOptions | undefined): TokenStore {
    return this.store;
  }

  set(cache: TokenStore, _tokenCacheOptions?: TokenCacheOptions | undefined) {
    this.store = cache;
    localStorage.setItem('tokenStore', JSON.stringify(this.store));
  }

  reset() {
    this.store = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
  }
}

const myTokenCache = new MyTokenCache();
export default myTokenCache;
