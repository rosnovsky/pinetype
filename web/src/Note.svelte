<script>
    export let noteData;

    let note = noteData.data.user.notes[0];
    const date = new Date(note.NoteMetadata.date["_seconds"]*1000)

    let lang;

    if (navigator.languages && navigator.languages.length) {
        // latest versions of Chrome and Firefox set this correctly
        lang = navigator.languages[0]
    } else if (navigator.userLanguage) {
        // IE only
        lang = navigator.userLanguage
    } else {
        // latest versions of Chrome, Firefox, and Safari set this correctly
        lang = navigator.language
    }
</script>

<h3>Note #{note.id}</h3>
<h5>{note.NoteMetadata.title} created on {date.toLocaleDateString(lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h5>
<p>{note.text}</p>
<small>Location: <a href="https://www.google.com/maps/@{note.NoteMetadata.location[0].coordinates._latitude},{note.NoteMetadata.location[0].coordinates._longitude},14z">{note.NoteMetadata.location[0].name}</a></small>
<p>
<small>Weather: {note.NoteMetadata.weather.low}˚C to {note.NoteMetadata.weather.high}˚C, {note.NoteMetadata.weather.sky}</small>
</p>
