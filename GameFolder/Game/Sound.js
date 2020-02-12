var myAudio = document.createElement('audio');
function MusicPlayer()
{
    if (myAudio.canPlayType('audio/ogg; codecs="vorbis"') != "")
    {
        this.shoot = new Audio("GameFolder/Sounds/Shoot.ogg");
    }
    else if (myAudio.canPlayType('audio/mp4; codecs="mp4a.40.5"') !="")
    {
        this.shoot = new Audio("GameFolder/Sounds/Shoot.aac");
    }
}