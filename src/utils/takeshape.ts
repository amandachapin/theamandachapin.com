import { createStaticClient } from '@/utils/apollo/client';
import { takeshapeAnonymousApiKey, takeshapeApiUrl } from '@/config';

export function createAnonymousTakeshapeApolloClient() {
  return createStaticClient({
    uri: takeshapeApiUrl,
    accessToken: takeshapeAnonymousApiKey,
    accessTokenHeader: 'Authorization',
    accessTokenPrefix: 'Bearer'
  });
}
