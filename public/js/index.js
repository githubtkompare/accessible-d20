(function () {
    let randomNumber = null;
    let rollCount = 0;
    let min = '1';
    let max = null;
    let color = '';
    function play_audio(file_names) {
        let sound = new Howl({
            src: [file_names[0]],
            volume: 0.5,
            onend: function() {
                file_names.shift();
                if (file_names.length > 0) {
                    play_audio(file_names);
                }
            }
        });
        sound.play();
    }

    function random(min, max) {
        const range = max - min + 1
        const bytes_needed = Math.ceil(Math.log2(range) / 8)
        const cutoff = Math.floor((256 ** bytes_needed) / range) * range
        const bytes = new Uint8Array(bytes_needed)
        let value
        do {
            crypto.getRandomValues(bytes)
            value = bytes.reduce((acc, x, n) => acc + x * 256 ** n, 0)
        } while (value >= cutoff)
        return min + value % range
    }

    $("#d20").on( "click", function () {
        rollCount++;
        max = '20';
        randomNumber = random(1,20).toString();
        if(randomNumber === min) {
            color = 'table-warning';
        } else if(randomNumber === max) {
            color = 'table-success'
        } else {
            color = '';
        }
        $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>d20</td><td>'+randomNumber+'</td>');
        play_audio(['sound/letters/d.mp3','sound/numbers/20.mp3','sound/other/pause025.mp3','sound/numbers/'+randomNumber+'.mp3']);
    });
    $("#d12").on( "click", function () {
        rollCount++;
        max = '12';
        randomNumber = random(1,12).toString();
        if(randomNumber === min) {
            color = 'table-warning';
        } else if(randomNumber === max) {
            color = 'table-success'
        } else {
            color = '';
        }
        $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>d12</td><td>'+randomNumber+'</td>');
        play_audio(['sound/letters/d.mp3','sound/numbers/12.mp3','sound/other/pause025.mp3','sound/numbers/'+randomNumber+'.mp3']);
    });
    $("#d10").on( "click", function () {
        rollCount++;
        max = '10';
        randomNumber = random(1,10).toString();
        if(randomNumber === min) {
            color = 'table-warning';
        } else if(randomNumber === max) {
            color = 'table-success'
        } else {
            color = '';
        }
        $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>d10</td><td>'+randomNumber+'</td>');
        play_audio(['sound/letters/d.mp3','sound/numbers/10.mp3','sound/other/pause025.mp3','sound/numbers/'+randomNumber+'.mp3']);
    });
    $("#d8").on( "click", function () {
        rollCount++;
        max = '8';
        randomNumber = random(1,8).toString();
        if(randomNumber === min) {
            color = 'table-warning';
        } else if(randomNumber === max) {
            color = 'table-success'
        } else {
            color = '';
        }
        $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>d8</td><td>'+randomNumber+'</td>');
        play_audio(['sound/letters/d.mp3','sound/numbers/8.mp3','sound/other/pause025.mp3','sound/numbers/'+randomNumber+'.mp3']);
    });
    $("#d6").on( "click", function () {
        rollCount++;
        max = '6';
        randomNumber = random(1,6).toString();
        if(randomNumber === min) {
            color = 'table-warning';
        } else if(randomNumber === max) {
            color = 'table-success'
        } else {
            color = '';
        }
        $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>d6</td><td>'+randomNumber+'</td>');
        play_audio(['sound/letters/d.mp3','sound/numbers/6.mp3','sound/other/pause025.mp3','sound/numbers/'+randomNumber+'.mp3']);
    });
    $("#d4").on( "click", function () {
        rollCount++;
        max = '4';
        randomNumber = random(1,4).toString();
        if(randomNumber === min) {
            color = 'table-warning';
        } else if(randomNumber === max) {
            color = 'table-success'
        } else {
            color = '';
        }
        $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>d4</td><td>'+randomNumber+'</td>');
        play_audio(['sound/letters/d.mp3','sound/numbers/4.mp3','sound/other/pause025.mp3','sound/numbers/'+randomNumber+'.mp3']);
    });
    /**
     * START UP FUNCTION
     */
    window.onload = function() {
        $('body').click();
    }
})();