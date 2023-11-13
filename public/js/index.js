(function () {
    let dice = [20,12,10,8,6,4];
    let rollCount = 0;
    let color = '';

    /**
     * Play an array of audio files in array order
     * @param file_names array
     */
    function play_audio(file_names) {
        let sound = new Howl({
            src: [file_names[0]],
            onend: function() {
                file_names.shift();
                if (file_names.length > 0) {
                    play_audio(file_names);
                }
            }
        });
        sound.play();
    }

    /**
     * Get a random number between one and the die parameter value
     * @param die
     * @returns {number}
     */
    function roll(die) {
        const range = die - 1 + 1
        const bytes_needed = Math.ceil(Math.log2(range) / 8)
        const cutoff = Math.floor((256 ** bytes_needed) / range) * range
        const bytes = new Uint8Array(bytes_needed)
        let value
        do {
            crypto.getRandomValues(bytes)
            value = bytes.reduce((acc, x, n) => acc + x * 256 ** n, 0)
        } while (value >= cutoff)
        return 1 + value % range
    }

    window.addEventListener("load", (event) => {
        dice.forEach(function (die) {
            $('#buttons').append('<button id="'+die+'" class="btn btn-primary" type="button">Roll a d'+die+'</button>');
            $('#'+die).on('click', function () {
                rollCount++;
                let rollResult = roll(die);
                if(rollResult === 1) {
                    color = 'table-warning';
                } else if(rollResult === die) {
                    color = 'table-success'
                } else {
                    color = '';
                }
                $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>d'+die+'</td><td>'+rollResult.toString()+'</td>');
                play_audio(['sound/letters/d.mp3','sound/numbers/'+die.toString()+'.mp3','sound/other/pause025.mp3','sound/numbers/'+rollResult.toString()+'.mp3']);

            });
        });
    });


})();