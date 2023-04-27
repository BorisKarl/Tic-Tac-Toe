"use strict";

const reset_button = document.getElementById('reset');

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


const spielBrett = (() => {

    let brett = ["", "", "", "", "", "", "", "", ""];

    const setBrett = (index, sign) => {
        brett[index] = sign;
    };

    const getBrett = (index) => {
        return brett[index];
    }
    // check the board via click, button disabled
    const zeigBrett = () => {
        console.log(brett);
    }
   
    const reset = () => {
        for (let i = 0; i < brett.length; i++)
        {
            brett[i] = "";
        }
    }

 return { setBrett, getBrett, zeigBrett, reset };
})();


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


const spielObject = (() => {
    let round = 1;
    const mrX = Spieler("X");
    const mrO = Spieler("O");
    let end = false;

    const get_Spieler = () => {
        if(round % 2 == 1) {
            console.log("Runde " + round)
            return mrX.sign;
        }else{
            console.log("Runde " + round)
            return mrO.sign;
        }
    };

    const getEnd = () => {
        return end;
    }

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

        console.log("Feld_index " + feld_index);
        console.log("Console " + antwort);
        console.log(get_Spieler())
        console.log(winCombo.filter((combo) => combo.includes(feld_index)));
        console.log(spielBrett.getBrett(feld_index));

        if (antwort) {
            end = true;
            let winner = "Spieler " + get_Spieler();
            msg.textContent = winner + " gewinnt!";
        } else {
            round++;
            end = false;
        }
    }

    const spielRunde = (feld_index) => {
        spielBrett.setBrett(feld_index, get_Spieler());
        anzeige.makeBrett();
        console.log("Zu Ende? " + end);
        if (round === 9){
             checkForVictory(feld_index);
             end = true;
             msg.textContent = "Spiel vorbei! Unentschieden";
            return 0;
        }else if(!end) {
            spielBrett.setBrett(feld_index, get_Spieler());
            anzeige.makeBrett();
            checkForVictory(feld_index);
        }else if(end){
            return;
        }
        
    }  

    const getRound = () => {
        return round;
    }

    const reset_function = () => {
        spielBrett.reset();
        anzeige.makeBrett();
        round = 1;
        end = false;
    }

    return { spielRunde, reset_function, getEnd, getRound };
}
)();

reset_button.addEventListener('click', spielObject.reset_function);



