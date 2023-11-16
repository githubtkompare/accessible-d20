(function () {
    let dice = [100,20,12,10,8,6,4,3,2];
    let diceCount = {};
    let diceCountMax = 20;
    let rollCount = 0;
    let color = '';
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
     * Run this on Window Load
     */
    window.addEventListener("load", () => {
        dice.forEach(function (die) {
            diceCount[die] = 1;
            $('#buttons').append(
                '<div class="btn-group" role="group" aria-label="The d'+die+' buttons">'
                +'<button id="'+die+'" class="btn btn-dark" type="button" value="'+diceCount[die]+'">Roll '+diceCount[die]+'d'+die+'</button>'
                +'<button id="'+die+'-add" class="btn btn-outline-dark" type="button">Add a d'+die+'</button>'
                +'<button id="'+die+'-remove" class="btn btn-outline-dark" type="button">Remove a d'+die+'</button>'
                +'</div>'
            );
            $('#'+die).on('click', function () {
                rollCount++;
                let thisRoll = null, rollResult = 0, rollResultArray = [];
                for (let i = 0; i < diceCount[die]; i++) {
                    thisRoll = roll(die);
                    rollResult += thisRoll;
                    rollResultArray.push(thisRoll);
                }
                if(rollResult === 1) {
                    color = 'table-warning';
                } else if(diceCount[die] === 1 && rollResult === die) {
                    color = 'table-success'
                } else {
                    color = '';
                }
                let voice = diceCount[die]+'d'+die+'. You rolled a, ';
                let tableCells = '<tr class="'+color+'"><th scope="row" tabindex="0"><span class="visually-hidden">Dice roll number </span>'+rollCount+'</th><td tabindex="0"><span class="visually-hidden">Dice </span>'+diceCount[die]+'d'+die+'</td>';
                tableCells += '<td tabindex="0"><span class="visually-hidden">You rolled a </span>';
                for (let i = 0; i < rollResultArray.length; i++) {
                    tableCells += rollResultArray[i].toString()+', ';
                    voice += rollResultArray[i].toString()+', ';
                }
                tableCells = tableCells.substring(0,tableCells.length-2);
                voice = voice.substring(0,voice.length-2);
                tableCells += '</td><td tabindex="0"><span class="visually-hidden">for a total of </span>'+rollResult+'</td></tr>';
                voice += '. For a total of '+rollResult;
                $('#tbody').prepend(tableCells);
                $('#voice').append('<p>'+voice+'</p>');
            });
            $('#'+die+'-add').on('click', function () {
                if((die !== 100 && diceCount[die] < diceCountMax) || (die === 100 && diceCount[die] < 10) ) {
                    diceCount[die]++;
                    $('#'+die).attr('value', diceCount[die]).text('Roll '+diceCount[die]+'d'+die);
                }
            });
            $('#'+die+'-remove').on('click', function () {
                if(diceCount[die] > 1) {
                    diceCount[die]--;
                    $('#'+die).attr('value', diceCount[die]).text('Roll '+diceCount[die]+'d'+die);
                }
            });
        });
    });
})();