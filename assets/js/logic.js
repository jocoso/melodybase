function displaySongLyrics(){
    const songName = $('#songname').val().trim(); //Using placeholder IDs
    const artistName = $('#artistname').val().trim();
    
    if(songName === '' || artistName === ''){ //Ends function 
        return;
    }

    const apiKey = 'db1815126935bc7fef98a221fafbf0fe';
    const apiUrl = `https://api.musixmatch.com/ws/1.1/track.search?q_track=${songName}&q_artist=${artistName}&apikey=${apiKey}`; //Identifies the track that the user searched

    const data = getAPIData(apiUrl);
};

$(document).ready(function () {
    $('#searchButton').on('click', displaySongLyrics);
});



// Issue 5 – Displaying song lyrics
// *** User Story ***
// As a user, I want to see the lyrics of the song I picked
// *** Acceptance Criteria ***
// GIVEN: I open the index.html file
// WHEN: The page loads
// AND WHEN: The user input the name of a song,
// THEN: The user will see the lyrics (If it  has any,) displayed in a scrollable modal. 
// HOWEVER: If the lyrics or the song don't exist, the user will see the message: "There are no lyrics available." Displayed in the modal.

// Issue 6 – Displaying Song Info
// *** User Story ***
// As a user, I want to see all the information regarding my favorite songs.
// *** Acceptance Criteria ***
// GIVEN: I open the index.html file
// WHEN: The page loads
// AND WHEN: The user input the name of a song
// THEN: The website will show an image of the album
// AND THEN: the name, artist, and album name
// HOWEVER: If the song does not exist, the page will only display an error text s.a: "Can't find this song buddy. Sorry /:"

