(function () {
    let dice = [100,20,12,10,8,6,4,3,2];
    let diceCount = {};
    let diceCountMax = 20;
    let rollCount = 0;
    let color = '';
    let sound = null;

    function createHowl() {
        sound = new Howl({
            src: ['sound/accessible-d20.mp3'],
            sprite: {
                pause: [0, 500],
                addA: [610, 565],
                removeA: [1263, 639],
                d: [2117, 347],
                1: [2547, 416],
                2: [3096, 354],
                3: [3586, 347],
                4: [4072, 391],
                5: [4599, 423],
                6: [5104, 554],
                7: [5773, 494],
                8: [6414, 320],
                9: [6916, 460],
                10: [7489, 363],
                11: [7940, 536],
                12: [8638, 428],
                13: [9289, 568],
                14: [9956, 595],
                15: [10690, 563],
                16: [11386, 662],
                17: [12173, 703],
                18: [12964, 595],
                19: [13665, 634],
                20: [14442, 432],
                30: [15051, 421],
                40: [15608, 462],
                50: [16209, 423],
                60: [16742, 561],
                70: [17398, 618],
                80: [18163, 386],
                90: [18679, 519],
                100: [19291, 621],
                200: [20106, 673],
                300: [20957, 673],
                400: [21781, 732],
                500: [22785, 785],
                600: [23673, 745],
                700: [24554, 755],
                800: [25429, 670],
                900: [26280, 680],
                1000: [27076, 866]
            }
        });
    }
    /**
     * Play an array of audio sprites in array order
     * @param spriteNames array
     */
    function play_audio(spriteNames) {
        sound.play(spriteNames[0]);

        sound.on("end", () => {
            spriteNames.shift();
            if (spriteNames.length > 0) {
                sound.play(spriteNames[0]);
            }
        });
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
            return [diceCount.toString(),'d',die.toString(),'pause',rollString];
        } else if (rollResult < 100) {
            let tens = rollString.charAt(0);
            let ones = rollString.charAt(1);
            let returnArray = [diceCount.toString(),'d',die.toString(),'pause',tens+'0'];
            if (ones !== '0') {
                returnArray.push(ones)
            }
            return returnArray;
        } else if (rollResult < 1000) {
            let hundreds = rollString.charAt(0);
            let tens = rollString.charAt(1);
            let ones = rollString.charAt(2);
            let returnArray = [diceCount.toString(),'d',die.toString(),'pause',hundreds+'00'];
            if(tens !== '1') {
                if (tens !== '0') {
                    returnArray.push(tens+'0');
                }
                if (ones !== '0') {
                    returnArray.push(ones);
                }
                return returnArray;
            } else {
                returnArray.push(tens.concat('',ones));
                return returnArray;
            }
        } else {
            return [diceCount.toString(),'d',die.toString(),'pause',rollString];
        }
    }
    /**
     * Run this on Window Load
     */
    window.addEventListener("load", () => {
        dice.forEach(function (die) {
            diceCount[die] = 1;
            $('#buttons').append(
                '<div class="btn-group" role="group" aria-label="d'+die+' button group" aria-description="The d'+die+' button group">'
                +'<button id="'+die+'" class="btn btn-dark" type="button" value="'+diceCount[die]+'">Roll '+diceCount[die]+'d'+die+'</button>'
                +'<button id="'+die+'-add" class="btn btn-outline-dark" type="button">Add a d'+die+'</button>'
                +'<button id="'+die+'-remove" class="btn btn-outline-dark" type="button">Remove a d'+die+'</button>'
                +'</div>'
            );
            $('#'+die).on('click', function () {
                if(sound === null) { createHowl(); }
                rollCount++;
                let rollResult = 0;
                for (let i = 0; i < diceCount[die]; i++) {
                     rollResult += roll(die);
                }
                if(rollResult === 1) {
                    color = 'table-warning';
                } else if(diceCount[die] === 1 && rollResult === die) {
                    color = 'table-success'
                } else {
                    color = '';
                }
                $('#tbody').prepend('<tr class="'+color+'"><th scope="row">'+rollCount+'</th><td>'+diceCount[die]+'d'+die+'</td><td>'+rollResult.toString()+'</td>');
                if ( ! $('#mute').is(':checked')) {
                    play_audio(getAudioArray(die, diceCount[die], rollResult));
                }
            });
            $('#'+die+'-add').on('click', function () {
                if(sound === null) { createHowl(); }
                if((die !== 100 && diceCount[die] < diceCountMax) || (die === 100 && diceCount[die] < 10) ) {
                    diceCount[die]++;
                    $('#'+die).attr('value', diceCount[die]).text('Roll '+diceCount[die]+'d'+die);
                }
                if ( ! $('#mute').is(':checked')) {
                    play_audio([diceCount[die].toString(),'d',die.toString()]);
                }
            });
            $('#'+die+'-remove').on('click', function () {
                if(sound === null) { createHowl(); }
                if(diceCount[die] > 1) {
                    diceCount[die]--;
                    $('#'+die).attr('value', diceCount[die]).text('Roll '+diceCount[die]+'d'+die);
                }
                if ( ! $('#mute').is(':checked')) {
                    play_audio([diceCount[die].toString(),'d',die.toString()]);
                }
            });
        });
    });
})();