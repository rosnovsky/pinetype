<script>
  import ApolloClient, {gql} from "apollo-boost";
  import { setClient, getClient, query } from "svelte-apollo";
  import Note from "./Note.svelte"
  import { GETNOTES } from "./getnotes.js";

  const client = new ApolloClient({
    uri: "https://us-central1-pinetype.cloudfunctions.net/api",
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
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
  {#await $fetchNotes}
    <p>...waiting for note to load</p>
  {:then note}
    <Note noteData={note} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
