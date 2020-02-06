<script>
  let promise = fetchNote();

  async function fetchNote() {
    const response = await fetch(
      `https://us-central1-pinetype.cloudfunctions.net/getNoteById?noteId=zo9sSsJPnjW2qqMmDeYK`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer" // no-referrer, *client
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      }
    );

    const text = await response.text();
    console.log(response);
    return JSON.parse(text).note;
  }

  function handleClick() {
    promise = fetchNote();
  }
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
  <button on:click={handleClick}>Try fetshing a note</button>
  {#await promise}
    <p>...waiting</p>
  {:then note}
    <p>The number is {note}</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  Some CORS shenanigans right there 👆
</main>
