(function () {
    let dice = [100,20,12,10,8,6,4,3,2];
    let diceCount = 1;
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

    /**
     * Create the array of audio files to be played after a roll of hte dice
     * @param die
     * @param diceCount
     * @param rollResult
     * @returns {string[]}
     */
    function getAudioArray(die,diceCount,rollResult) {
        let rollString = rollResult.toString();
        if(rollResult < 21) {
            return ['sound/numbers/'+diceCount+'.mp3','sound/letters/d.mp3','sound/numbers/'+die+'.mp3','sound/other/pause025.mp3','sound/numbers/'+rollString+'.mp3'];
        } else if (rollResult < 100) {
            let tens = rollString.charAt(0)+'0';
            let ones = rollString.charAt(1);
            console.log(tens+' : '+ones+'\n');
            let returnArray = ['sound/numbers/'+diceCount+'.mp3','sound/letters/d.mp3','sound/numbers/'+die+'.mp3','sound/other/pause025.mp3','sound/numbers/'+tens+'.mp3'];
            if (ones !== '0') {
                returnArray.push('sound/numbers/'+ones+'.mp3')
            }
            return returnArray;
        } else if (rollResult === 100) {
            return ['sound/numbers/'+diceCount+'.mp3','sound/letters/d.mp3','sound/numbers/'+die+'.mp3','sound/other/pause025.mp3','sound/numbers/'+rollString+'.mp3'];
        }
    }

    /**
     * Run this on Window Load
     */
    window.addEventListener("load", (event) => {
        dice.forEach(function (die) {
            $('#buttons').append('<button id="'+die+'" class="btn btn-primary" type="button" value="'+diceCount+'">Roll '+diceCount+'d'+die+'</button>');
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
                $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>'+diceCount+'d'+die+'</td><td>'+rollResult.toString()+'</td>');
                play_audio(getAudioArray(die,diceCount,rollResult));

            });
        });
    });


})();