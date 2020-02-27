# Pinetype

Pinetype is an educational project to help all involved learn how to build an app from scratch, with no guidance or tutorials to follow.

[Announcement](https://rosnovsky.us/blog/2020/02/02/do-you-want-to-build-a-service/)

## Rough project outline

### Description
A note taking app with mental health focus. Let the mind flow, 500 words a day, automatic sentiment analysis with graphs, charts, stats, badges, tags, trends and such; gratitude section (with some rewards built in)

### Tech

- React with transition to Svelte
- Serverless (Google Cloud, AWS or zeit.com)
- Notes encryption (https://nodejs.org/api/crypto.html)
- Mongo or Firebase
- GraphQL as an interface
- Tensorflow for sentiment analysis
- Descrypt.com for voice notes transcriptions (there must be a better tool)
- Background music generator (AI generated lo-fi ideally)
- Catalyst app (iOS/MacOS)

### Features
- Signup/Login (Auth0? Firebase?)
    - Email
    - Social
- Account section
    - Password
    - Name
    - Email
    - Social connections
    - Date of birth
    - Avatar
    - Location (for weather and stuff of the day - permission or by ip)
    - Download all data about the account
    - Delete account
- Dashboard
    - Notes list
      - View
      - Delete
      - Metadata
      -  Favorite (will base some of the sentiment data on this note moving forward)
    -Notes stats
    - Weather (Darksky API)
    - Stuff of the day (news/photos API)
    - Sentiment trend
    - Tags
    - Prompt (prompt or quotes API)
- New note
    - Markdown/WYSIWYG
    - Background music
    - Running counter
    - Autosave on/off (if you want to write, but not to save the note, yet keep the metadata)
    - Encouragements, helpful questions, prompts 
    - Live sentiment analysis
    - Save (once saved, note cannot be updated, only deleted)
    - Delete (note only or note AND metadata)

This project is open for everyone to join.

Please mind the [Code of Conduct](/CODE_OF_CONDUCT.md). This project is intended to be a welcoming, inclusive and friendly space. Hate speech or harassment of any kind will not be tolerated.
