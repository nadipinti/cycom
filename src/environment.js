import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://cyecom-qa.hasura.app/v1/graphql',
});

const garphqlAnonymousAuthorization =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIn19.QpAQ-0L9mdytb6NWdn2ij-GdTjNq6UgZlmlquMQ-ozeuREr4zH_Z1luyWapZWgcqUPn_A11m_AtHhHbH5SIAWwqPMDUbpfCd_jVlqsY2Op67MLYwZuFwx8-KCGqHZQ8lZIxKDaDbhlaerrvkttCWot2WounqT2MHRca5V6KcU1kQQ-CGFBlHo38hcIvFxeONvrcJFF7sDWPBw0TKPq14k9oQ88B_nvlv6ZAW7p6GEz_MGSH1Xcs3ZpvuhMzaU_Gp6pZ9E2IJbNtX4Rb2_vQ_ZEmwfl6KFvdi8ZOpK51u2zENvNbF8yLBo1jjo9sne5uwEad7sTBUt2OaQUjX6lGOFQ'


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : `Bearer ${garphqlAnonymousAuthorization}`,
      }
    }
  });

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false
    })
});