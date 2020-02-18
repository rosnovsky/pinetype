<script>
  import ApolloClient, {gql, HttpLink} from "apollo-boost";
  import { setClient, getClient, query } from "svelte-apollo";
  import Note from "./Note.svelte"
  import { createAuth } from './auth';
  import { GETNOTES } from "./getnotes.js";

  // Go to Auth0 to get the values and set everything up.
  // Make sure all callback urls are set correctly.
  const config = {
    domain: 'auth.rosnovsky.us',
    client_id: 'PeGiv5sGXsHT7WxmQ394C6rQMp96HrLq',
    redirectUri: 'http://localhost:3000',
    responseType: "token id_token",
    scope: "openid profile email",
  };

  const {
    isLoading,
    isAuthenticated,
    login,
    logout,
    authToken,
    authError,
    userInfo
  } = createAuth(config);

  $: state = {
    isLoading: $isLoading,
    isAuthenticated: $isAuthenticated,
    authError: $authError,
    userInfo: $userInfo ? $userInfo.name : null,
    authToken: $authToken.slice(0, 20)
  };

  const client = new ApolloClient({
    uri: "http://localhost:3000/api/gql",
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
    fetchOptions: {
      mode: 'cors',
      credentials: true,
      playground: true,
      headers: {
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Origin  ": "*",
        "Content-Type": "application/json",
        "authorization": `Bearer ${authToken}`
      }
    },
  });

  setClient(client);

  const fetchNotes = query(client, { query: GETNOTES });

</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
    <h1>Hello!</h1>
    {#if $isAuthenticated}
    <h3>Hi {$userInfo.nickname}!</h3>
      {#await $fetchNotes}
        <p>{$userInfo.nickname}, please wait for notes to load</p>
      {:then note}
        <Note noteData={note} />
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
      <button on:click={() => logout()}>Logout</button>
    {:else}
      <button on:click={() => login()}>Login</button>
    {/if}
</main>
