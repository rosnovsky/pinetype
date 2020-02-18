import {gql} from "apollo-boost";

export const GETNOTES = gql`
    {
    user(id: "lVmvM57DJCWwEX5ZITtQ") {
      notes {
        id
        userId
        NoteMetadata {
          date
          title
          weather{
            high
            low
            sky
            wind
          }
          sentiment
          location{
            name
            coordinates
          }
          typingPattern{
              paragraphId
              speed
            }
        }
        text
      }
    }
  }
  `;
