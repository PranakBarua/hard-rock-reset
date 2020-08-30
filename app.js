//All song Section
const allSongList=songs=>{
    songs=songs.data.slice(0,10);
    console.log(songs);
    const simpleResult=document.getElementById("search-song-list");
    simpleResult.innerHTML='';
    const outer=document.getElementById("outer-search");
    outer.className="search-result col-md-8 mx-auto py-4"
    outer.innerHTML='';
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const p=document.createElement('p');
        p.innerHTML=`<p class="author lead"><strong>${song.title}</strong> Album By <span>${song.album.title}</span> <button id="right-align" onclick="getSongsLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button></p>`;    
        simpleResult.appendChild(p);


        const div=document.createElement('div');
        div.className="single-result row align-items-center my-3 p-3";
        div.innerHTML=`<div class="col-md-9"><h3 class="lyrics-name">${song.title}</h3><p class="author lead"> Album by <span>${song.album.title}</span></p><p class="author lead">Artist by <span>${song.artist.name}</span></p></div><div class="col-md-3 text-md-right text-center"><button onclick="getSongsLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button></div>`
        outer.appendChild(div);
        


    }
}
//Lyrics Section
const setLyrics=(lyrics,title)=>{
    console.log(lyrics);
    if(lyrics.error=="No lyrics found"){
        errorSetup(lyrics,"lyrics-section1","song-title1");
        errorSetup(lyrics,"lyrics-section2","song-title2");
    }
    else{
        lyricsSetup(lyrics,title,"lyrics-section1","song-title1");
        lyricsSetup(lyrics,title,"lyrics-section2","song-title2");
    }
   

}

const errorSetup=(lyrics,lyricsSectionPart,songTitlePart)=>{
    const lyricsSection=document.getElementById(lyricsSectionPart);
    lyricsSection.innerHTML='';
    const songTitle=document.getElementById(songTitlePart);
    songTitle.innerText="No lyrics found";
}

const lyricsSetup=(lyrics,title,lyricsSectionPart,songTitlePart)=>{
    const lyricsSection=document.getElementById(lyricsSectionPart);
    const songTitle=document.getElementById(songTitlePart);
    songTitle.innerText=title;
    lyricsSection.innerHTML='';
    const fullLyrics=document.createElement('pre');
    fullLyrics.setAttribute("style","color:white")
    fullLyrics.innerText=lyrics.lyrics;
    lyricsSection.appendChild(fullLyrics);
}
//api-call-lyrics
function getSongsLyrics(artist,title){
    console.log(artist,title);
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res=>res.json())
    .then(data=>setLyrics(data,title))
}



//api-call-song
const getSearchItem=song=>{
    fetch(`https://api.lyrics.ovh/suggest/${song}`)
    .then(res=>res.json())
    .then(data=>allSongList(data))
}
//search song
const searchBtn = document.getElementById("search-song-button");
searchBtn.addEventListener("click",function(){
    const songName=document.getElementById("search-song-input").value;
    getSearchItem(songName);
})

