var lyrics = $.ajax({
    method: 'get',
    dataType: 'text',
    url: './salop(e).txt',
    success: function (data) {
        lyrics = data.split('\n');
        singing = [];
        for (i = 0; i < lyrics.length; i++) {
            timestamp = /([0-9]+)\:([0-9]+)\.([0-9]+)/g;
            text = /\](.+)$/g;
            time = timestamp.exec(lyrics[i]);
            minute = parseInt(time[1]) * 60;
            seconds = parseInt(time[2]);
            time = minute + seconds;
            content = text.exec(lyrics[i])[1];
            singing[time] = content;
        }
        return lyrics;
    }
});

window.onload = function() {
    player = document.querySelector('audio');
    setInterval(function() {
        now = Math.floor(player.currentTime);
        if (singing[now] != null) {
            document.querySelector('.lyrics').innerHTML = singing[now];
        }
    }, 500)
}
