"use strict";

const game_board = document.getElementById('game_board');
const msg = document.getElementById('msg');

const showData = (e) => {
    let data = e.target.id;
    console.log(data)
    return data;
}


const playfield = (() =>  {
    const board = ["", "", "", "", "", "", "", "", ""];
})();

const Player = (sign) => {


}

const x_sign = (() => {
    const xFunction = (e) => {
        if (e.target.innerHTML == "") {
                e.target.innerHTML = "X";
                msg.innerHTML = "Player O turn";
        }
    };
  
    for (let i = 1; i < 10; i++) {
        let eDiv = document.getElementById(i);
        
        eDiv.addEventListener('click', xFunction, {once: true}); 
        // eDiv.addEventListener('click', oFunction(), { once: true});
    };
})();
/*
    const oSign() = const oFunction = (e) => {
    if (e.target.innerHTML == "") {
        e.target.innerHTML = "O";
        msg.innerHTML = "Player Y turn";
    }
};
    */



const number_sign = (() => {
    for (let i = 1; i < 10; i++) {
        let eDiv = document.getElementById(i);
        eDiv.addEventListener('click', (e) => {
            if (e.target.innerHTML > "0" || e.target.innerHTML < "10")
            {
                return;
            }
            else
            {
                e.target.innerHTML = i;
            }
            
        })
    }
})();



/* 
// This works inside the playfield function
+ const player_move = () => {
+     player_square = document.getElementById(showData);
+     player_square.innerHTML = "X";
}; 
one.addEventListener('click', player_move);

*/
 

const fill_array = () => {
    let square_array = [];
    for(let i = 0; i < 9; i++) {

    }
}

 
const one = document.getElementById('1');
const brett = document.createElement('div');




/*
one.addEventListener('click', (e) => {
    document.getElementById(e.target.id).innerHTML = "X";})
 +const one = document.getElementById('1')

const one = document.getElementById('1')
const one = document.getElementById('1')
const one = document.getElementById('1')
const one = document.getElementById('1')
square.addEventListener('click', player_move);
 */









