"use strict";

const reset_button = document.getElementById('reset');
reset_button.style.visibility = "hidden";

// function for checking id 
/*
function showId(e) {
    let id = e.target.id;
    console.log(id);
    console.log("Funktion getRound mit dem Wert " + spielObject.getRound())
    
}
*/


// Player Factory
const Spieler = (sign) => {
    return { sign }
};

// Gameboard module
const spielBrett = (() => {

    // Array for data input
    let brett = ["", "", "", "", "", "", "", "", ""];

    // Set the gameboard-data on the display
    const setBrett = (index, sign) => {
        brett[index] = sign;
    };

    // Get the gameboard-data from array
    const getBrett = (index) => {
        return brett[index];
    }
    // check the board via click, button disabled
    const zeigBrett = () => {
        console.log(brett);
    }
   
    // Reset for new game
    const reset = () => {
        for (let i = 0; i < brett.length; i++)
        {
            brett[i] = "";
        }
    }

 return { setBrett, getBrett, zeigBrett, reset };
})();


// Display module
const anzeige = (() => {
    const felder = document.querySelectorAll(".s_feld");
    const brettAnzeige = document.getElementById("brettanzeige");
    const msg = document.getElementById('msg');
    brettAnzeige.addEventListener('click', spielBrett.zeigBrett);

    const makeBrett = () => {
        for(let i = 0; i < felder.length; i++) {
            felder[i].textContent = spielBrett.getBrett(i);
        }
    }
   
    // show ID of div, disabled
    /*
        felder.forEach(feld => {
        feld.addEventListener('click', showId)
    });
    */
    

    // Set eventListener that starts the game
    felder.forEach(feld => {
        feld.addEventListener('click', (e) => {
            if (e.target.textContent == "" && !spielObject.getEnd()) {
                spielObject.spielRunde(parseInt(e.target.id))
            }else{
                return;
            }
            
        });
    });

    return { makeBrett }

})();

// Game module
const spielObject = (() => {
    // Declare variables
    let round = 1;
    const mrX = Spieler("X");
    const mrO = Spieler("O");
    let end = false;
    const spielender = "Spieler "; 
    // PLayer X begins the game
    msg.innerHTML = spielender + "<span style='color: red;'>" + mrX.sign + "</span>" + " ist an der Reihe!";


    const get_Spieler = () => {
        if(round % 2 == 1) {
            msg.innerHTML = spielender + "<span style='color: red;'>" + mrO.sign + "</span>" + " ist an der Reihe!";
            return mrX.sign;
        }else{
            msg.innerHTML = spielender + "<span style='color: red;'>" + mrX.sign + "</span>" + " ist an der Reihe!";
            return mrO.sign;
        }
    };

    // Is this the end?
    const getEnd = () => {
        return end;
    }

    // The winner filters, includes and gets it all 
    const checkForVictory = (feld_index) => {
        const winCombo = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        const antwort = winCombo.filter((c) => c.includes(feld_index))
                                .some((d) => d.every((index) => spielBrett
                                .getBrett(index) == get_Spieler()));

        /* // Console.log and check data
           console.log("Feld_index " + feld_index);
           console.log("Console " + antwort);
           console.log(get_Spieler())
           console.log(winCombo.filter((combo) => combo.includes(feld_index)));
           console.log(spielBrett.getBrett(feld_index));
        */
        
        
        if (antwort) {
            reset_button.style.visibility = "visible";
            end = true;
            let winner = "Spieler " + get_Spieler();
            msg.innerHTML = "<span style='color: red;'>" + winner + " gewinnt!" + "</span>";
        } else {
            round++;
            end = false;
        }
    }

    // Play game function
    const spielRunde = (feld_index) => {
        spielBrett.setBrett(feld_index, get_Spieler());
        anzeige.makeBrett();
        if (round === 9){
             checkForVictory(feld_index);
             end = true;
             reset_button.style.visibility = "visible";
             msg.textContent = "Spiel vorbei! Unentschieden...";
            return 0;
        }else if(!end) {
            spielBrett.setBrett(feld_index, get_Spieler());
            anzeige.makeBrett();
            checkForVictory(feld_index);
        }else if(end){
            return;
        }
        
    }  
    // Function for tracking th rounds, disabled
    /*
        const getRound = () => {
            return round;
        }
    */
    
    // Reset
    const reset_function = () => {
        msg.innerHTML = spielender + "<span style='color: red;'>" + mrX.sign + "</span>" + " ist an der Reihe!";
        spielBrett.reset();
        anzeige.makeBrett();
        round = 1;
        end = false;
        reset_button.style.visibility = "hidden";

    }

    return { spielRunde, reset_function, getEnd };
}
)();

reset_button.addEventListener('click', spielObject.reset_function);



