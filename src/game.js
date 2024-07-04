"use strict";
let main_canvas;
let main_context;
let piece_canvas;
let piece_context;
let grid_context;
let piece_preview_context;

const GameState = {
    SETUP: 'setup',
    PLAYING: 'playing',
    PAUSED: 'paused',
    RESUMING: 'resuming',
    GAMEOVER: 'gameover'
};

//let p = {1:40, 2:100, 3:300, 4:1200};
const Score_Base = new Map();
Score_Base.set(1,40);
Score_Base.set(2,100);
Score_Base.set(3,300);
Score_Base.set(4,1200);


let moveDownInterval = 2000;

let trigger = 0;
const trigger_val = 10;

if (!localStorage.getItem('setup')) {
    // Perform initial setup
    localStorage.setItem('hi-score', 0);
    localStorage.setItem('setup', 'true'); // Set a flag indicating setup is complete
    console.log('Initial setup completed.');
}

document.getElementById('hi-score').innerText = get_score_DB()
// api key
// qHX4408S9EaQX1HAzwoDqfwXXf5hfwYllMFNNwytVdShTKivv5pUc1wyoPHkjSYQ



// a standard block size is 20 by 20
let position_x = 80;
let position_y = 400;

// width 260 (13 in array)
// height 480 (24 in array)

// we want the system to be ready. This fires init to start the game process.

window.onload = init;

function init(){
    // perform an api call to put the value of 
    // high score


    // Get a reference to the canvas
    piece_canvas = document.getElementById('piece-canvas');
    piece_context = piece_canvas.getContext('2d');

    main_canvas = document.getElementById('main-canvas');
    main_context = main_canvas.getContext('2d');

    grid_context = document.getElementById('grid-canvas');
    grid_context = grid_context.getContext('2d');

    piece_preview_context = document.getElementById('piece-preview');
    piece_preview_context = piece_preview_context.getContext('2d');

    draw_bg(main_context);

    draw_grid(grid_context);

    let se = new Square();

    //set_score_DB(5)
    console.log(get_score_DB())

    // let max_x = get_max_x(se.get_width(0),10,20);
    // console.log(`maximum x val for an I piece is ${max_x}`);
    // let te = new T();
    // // draw(location,orientation,x,y,unit)
    //se.draw(piece_context,0,position_x,380,20);
    //  //se.clear(piece_context,0,position_x,380,20);
    // te.draw(piece_context,0,100,380,20);
    

    //se.clear(piece_context,0,position_x,380,20);
    //se.clear(piece_context,0,position_x,position_y,20)
    
    let piece_uni = new PieceUniverse(260, 480, 20, 120, 0);

    console.log('cuurent piece is ', piece_uni.get_current_piece().name);

    console.log(Score_Base.has(2));

    //piece_uni.check_bottom(piece_uni.get_current_piece(),piece_uni.get_current_orient(),piece_uni.get_current_x(),piece_uni.get_current_y())

    // for(let x = 0; x < 260; x+=20){
    //     piece_uni.place_piece(new I(),0,x,400);
    //     piece_uni.draw_piece(piece_context,new I(),0,x,400,false);

    //     piece_uni.place_piece(new I(),0,x,240);
    //     piece_uni.draw_piece(piece_context,new I(),0,x,240,false);
    // }

    // for(let x = 80; x < 180; x+=20){
    //     piece_uni.place_piece(new I(),0,x,320);
    //     piece_uni.draw_piece(piece_context,new I(),0,x,320,false);
    // }

    //setInterval(piece_uni.clear_lines(piece_uni.get_board(),piece_context,piece_uni.unit), 5000)

    //clear_lines
    //line clearing fxn does not work
    //piece_uni.clear_lines(piece_uni.get_board(),piece_context,piece_uni.unit)

    // startCountdown(5)

    //piece_uni.place_piece(se,0,60,80);

    //console.log(JSON.stringify(piece_uni.get_board()));
    
    // draw_T(piece_context,position_x,position_y);

    // draw_I(piece_context,180,position_y);
}

// document.addEventListener('keydown', event => {
//     if (event.key === 'ArrowLeft') {
//        console.log('left was pressed');
//     } else if (event.key === 'ArrowRight') {
//         console.log('right was pressed');
//     } else if (event.key === 'ArrowDown') {
//         console.log('down was pressed');
//     } else if (event.key === 'ArrowUp') {
//         console.log('up was pressed');
//     }
// });

// Top level fxns

function get_score_DB(){
    return localStorage.getItem('hi-score');
}

function set_score_DB(score){

    localStorage.setItem('hi-score', score);
    
}



function draw_bg(location){

    // the wall color
    let color = "#abaaa9";

    location.fillStyle = color;
    location.fillRect(0,0,20,480);

    location.fillRect(0,480,300,20);

    location.fillRect(280,0,20,480);

    location.strokeStyle = "#666565";
    location.lineWidth = 2;

    //the bricks
    // for(let y = 0; y<480; y+=20){
    //     location.strokeRect(0,y,20,20);
    //     location.strokeRect(280,y,20,20);
    // }

    // for(let x = 0; x<300; x+=20){
    //     location.strokeRect(x,480,20,20);
    // }

    // the background color
    color = "black";
    location.fillStyle = color;
    location.fillRect(20,0,260,480);

}

function draw_grid(location){
    location.strokeStyle = "grey";
    location.lineWidth = 1;
    for(let y = 0; y<480; y+=20){
        for(let x=0; x <260; x+= 20){
            location.strokeRect(x,y,20,20);
        }
       
    }
}

function draw_shape(location,map,x,y,unit,brick){

    let j = 0
    for(const y_coord of map){
        let i = 0
        for(const x_coord of y_coord){
            if (x_coord === 1){
                location.fillRect(x+ i, y + j, unit,unit);
                if(brick){
                    location.strokeRect(x + i, y + j, unit,unit);
                }
                // figure out the bricks later
               
            }
            i += unit;
        }
        j += unit;
    }
}

function clear_shape(location,map,x,y,unit){

    let j = 0
    for(const y_coord of map){
        let i = 0
        for(const x_coord of y_coord){
            if (x_coord === 1){
                location.clearRect(x + i, y + j, unit,unit);
            }
            i += unit;
        }
        j += unit
    }
}


function partial_fill_game_board(x, y, map, board, value){
    // value must be 0 or color. Do not allow any other

    // also, x and y must already have their units divided

    // if(value !== 0 && value !== 1){
    //     throw new Error("Cannaot fill with this value");
    // }
    
    // TODO, Check for out of bounds error at some point.

    //console.log('this is x, ', x , 'this is y ', y)

    console.log(y)
    let j = 0;
    for(const y_coord of map){
        let i = 0;
        for(const x_coord of y_coord){
            if (x_coord === 1){
                board[y + j][x + i] = value;
            }
            i += 1;
        }
        j += 1;
    }


}

function get_width_all(orientation,x_y){
    console.log('orientation:', orientation, 'x_y:', x_y); 
    return x_y[orientation][0];
}

function get_height_all(orientation,x_y){
    return x_y[orientation][1];
}

function getRandomElement(arr) {
    // get a random element from an array.
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function find_first_1(arr){
    // in an array, find the index of the first occurence of a 1
    
    // for(let i = 0; i<arr.length; i++){
    //     if(arr[i][0] == 1){
    //         return i;
    //     }
    // }

    for(let i = 0; i<arr.length; i++){
        if(arr[i] == 1){
            return i;
        }
    }

    // no 1's exist or this array is empty
    return -1;
}

function find_last_1(arr){
    // in an array, find the index of the last occurence of a 1
    // this is assuming an array of arrays 
    // i.e [ [0,0] , [1,x] ]
    // we are only concerned with the 1st index

    // for(let i=arr.length-1; i>=0; i--){
    //     if(arr[i][0] == 1){
    //         return i;
    //     }
    // }

    for(let i=arr.length-1; i>=0; i--){
        if(arr[i] == 1){
            return i;
        }
    }

    // no 1's exist or this array is empty
    return -1;

}


// new functions to be tested
function row_is_full(arr){
    // this function is expecting an array of style
    // [ 0, color, ...]

    // console.log(arr)

    for( let i = 0; i<arr.length; i++){
        if(arr[i] == 0){
            // it isn't full, there is a space
            return false
        }
    }

    return true
}

function row_has_something(arr){
    for( let i = 0; i<arr.length; i++){
        if(arr[i] != 0){
            // it isn't full, there is a space
            return true
        }
    }

    return false
}

function paste_GS_to_screen(board, location, unit){
    // to paste an updated game state to the board
    // this assumes a [     [ 0, color ], 
    //                      [ 0, color ]
//                                  ]
    // first we should clear rect 

   
    let y = 0;
    for(const y_coord of board){
        let x = 0;
        for(const x_coord of y_coord){
            if(x_coord != 0){
                // draw on the board
                // should be a valid color
                location.fillStyle = x_coord;
                location.fillRect(x, y, unit,unit);
            }
            x += unit;
        }
        y += unit;
    }

}

function find_full_rows(board){
    // return the indices where full rows were found 

    // console.log('this is the game baord',JSON.stringify(board))
    // console.log('lenght of boars',board.length);
    // console.log('second row of board',board[1])

    let full_rows = [];
    for(let i = board.length-1; i >= 0; i--){
        if( row_is_full(board[i]) ){
            full_rows.push(i);
        }
    }

    return full_rows;
}

function update_GS(board, full_rows){
    // cleared rows are the rows we want to get rid of
    // they are in the form of indices.
    // they are arranged in ascending order

    // get a counter, as you splice, you add to the counter
    // minus that counter value from the next index so that the shifting
    // doesn't affect things

    if(full_rows.length == 0){
        // there is no need for any long process.
        return false;
    }

    // else we go through the updating
    
    console.log('old board, ',JSON.stringify(board) );
    const old_length = board.length;
    console.log('this is the old length', old_length)

    let row_width = board[0].length;
    console.log('each row is', row_width )
    let num_empty_rows = 0;



   

    // loop backwards in full rows
    for(let i =  0 ; i<full_rows.length ; i++){
        // if the row is full, clear it through splicing
        // because we are assuming that a splice brings all the rows before
        // it down. (we need to chec that tho)
        
        let r = board.splice(full_rows[i] ,1);
        console.log('here',r)
        // increment a counter (for the empty rows we will add on top)
        console.log('board after removing row, ',full_rows[i] , ': ', JSON.stringify(board));
        console.log('length is, ', board.length)
        num_empty_rows ++;  
    }

    // creating the new empty row
    let empty_row = [];
    for(let i = 0; i < row_width; i++){
        empty_row.push(0);
    }

    // once done, perform another for loop to add empty rows to the top.
    // as many as the counter 
    for (let i = 0; i < num_empty_rows; i++) {
        board.unshift(empty_row.slice());
    }

    // check that the old length == new lenght 
    if(old_length != board.length){
        try {
            throw new Error();
        } catch (error) {
            console.error("You messed up the ordering of your game state. fix it");
        }
    }

    console.log('this is the new length and baord', board.length,JSON.stringify(board) )

    // we performed a process.
    return true; 

}

// function line_clearing(board,location,unit){
//     // we do this if move down returns 1
//     // becuase that means we are stuck


//     // first check the board for full rows indices
//     // save them in a variabel
//     full_rows = find_full_rows(board);

//     // perform the 'animation' on these full row indices

//     // there will likely be a pause/ timing to do this

//     //do the update game state function. 
//     paste = update_GS(board,full_rows);

//     // if it returns 1 (changes were made) then do the paste to screen function
//     if(paste){
//         paste_GS_to_screen(board,location,unit);
//     }
// }



//

// todo: add in a high score 
// reset score for subsequent games 
// to do make a dynamic canvas sizing (like the real playing space is a little smaller than it should b)


// when a new piece is put down
// we "put piece". we do not check for validitty till a  button is pressed
// when a button is pressed (for an old piece), we collission check then if collision doesn't
// exist. we "move piece"

// function countdown(elem,timerId,timeLeft){
//     // let count = 3;

//     // document.getElementById('count-down').textContent = count ;
//     // count--;

//     // console.log('counting down')
//     // if (count >= 0) {
//     //     setTimeout(countdown,2000)
//     // } else {
//     //     document.getElementById('count-down').style.display = 'none';
//     // }

//     if (timeLeft == -1) {
//         clearTimeout(timerId);
//         doSomething();
//       } else {
//         elem.innerHTML = timeLeft;
//         timeLeft--;
//       }
// }

// function startCountdown(seconds,element,state) {

//     let counter = seconds;
      
//     const interval = setInterval(() => {
//         counter--;
//       console.log(counter);

//       element.innerText = counter;
//       element.style.fontFamily = 'Pixelify Sans';
      

      
        
//       if (counter <= 0 ) {
//         clearInterval(interval);
//         element.style.display = 'none'
//         state = false;
//         console.log('Ding!');
//       }
//     }, 1500);
//   }

class PieceUniverse{
    // /**
    // * @param {GamePiece} current_piece - name of piece (as a class).
    // * @param {number} current_orientation - orientation/rotation number.
    // * @param {number} starting_x - x coord (changes).
    // * @param {number} starting_y - y coord (changes).
    // * @param {number} width - width of canvas
    // * @param {number} height - height of canvas
    // * @param {Array} Game_Board - state of game board, places filled with items
    // * @param {unit} unit - how many pixels is one unit
    // */

    /**
        * @param {Array} starting_x_and_y - x  and y coord (fixed).
        * @param {Array} width_and_height - width and height of canvas
        * @param {number} unit - how many pixels is one unit
    */

    // current x coord of the current piece.
    #current_x_and_y;

    // State of game, places filled with true or false if a pixel occupies there
    #Game_Board;

    //name of piece (as a class).
    #current_piece;

     // current orientation/rotation number of the current piece.
    #current_orientation;

    // what the next piece should be. An array [piece,orientation]
    #next_piece_with_orientation;

    #possible_pieces;

    #possible_rotations;

    // how many lines have been cleared
    #lines;

    // what is the current score
    #score;

    #level;

    #stuck;

    #gamestate;

    #paused;

    #sound;
    #music;


    constructor(width, height, unit, starting_x, starting_y){

        // enforce some selectors in the game 
        // that ensure the game specifications is not a square (not necessary)
        // that enforce that all numbers are whole numbers
        // that enforce that width and height is reasonable to the extent of the 
        // webpage
        // the specification is divisible by the unit 
        // and that starting x and y makes sense.
        // let us enforce here that height is 4 * unit and same with width at the very least
        // 

        let check = 4 * unit;
        if(width < check || height < check){
            throw new Error ("Canvas is too small");
        }

        if(unit < 10){
            throw new Error("Unit is too small");
        }

        this.width_and_height = [];
        this.width_and_height[0] = width;
        this.width_and_height[1] = height;

        this.starting_x_and_y = [];
        this.starting_x_and_y[0] = starting_x;
        this.starting_x_and_y[1] = starting_y;

        this.unit = unit;

        this.animationFrameId = 0;
        
        

        this.#current_x_and_y = [];
        this.#next_piece_with_orientation = [];

        this.#possible_pieces = [I,Square,T,L,R,Z,S];
        this.#possible_rotations = [0,1,2,3];

        this.#sound = false;
        this.#music = false;

        this.backgroundMusic = document.getElementById('background-music');
        this.moveSound = document.getElementById('move-sound');
        this.lineClearSound = document.getElementById('line-clear-sound');
        this.gameOverSound = document.getElementById('game-over-sound')
        this.setupBackgroundMusic();

        this.initialize()

        
        // console.log('current x: ', this.get_current_x())

        // this.#current_x_and_y[0] = starting_x;
        // this.#current_x_and_y[1] = starting_y;
        // // have a function to pick a random orientation
        // // and a random piece
        // this.#current_orientation = 0;
        // this.#current_piece = new I();
        // // this.#current_piece = new Z();

        // // this is an array Of 2 only
        
        // // then use a function to 
        // // fill the piece array
        // this.#fill_game_board(width,height,unit);

        

        // // this.draw_piece(piece_context,this.#current_piece,this.#current_orientation,starting_x,starting_y,false);
        // this.draw_piece(piece_context,this.#current_piece,this.#current_orientation,starting_x,starting_y,false);

        // this.#stuck = false;

        // // so we can do set up
        // this.#paused = true;

        

        // this.#lines = 0
        // this.#score = 0;

        // this.set_random_next_piece();
        // this.update_piece_preview(new this.#next_piece_with_orientation[0], this.#next_piece_with_orientation[1]);
        // this.#gamestate = GameState.PLAYING;



        this.stuckEvent = new Event('pieceStuck');
        document.addEventListener('pieceStuck', this.handlePieceStuck.bind(this));

        this.LevelEvent = new Event('levelUp');
        document.addEventListener('levelUp', this.update_level.bind(this));


        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.getElementById('pause').addEventListener('click', this.togglePause.bind(this));
        document.getElementById('play').addEventListener('click', this.start_game_main.bind(this));
        document.getElementById('Retry').addEventListener('click', this.retry_game.bind(this));
        document.getElementById('reset-score').addEventListener('click', this.reset_score.bind(this));
        document.getElementById('Quit').addEventListener('click', this.quit_game.bind(this));
        document.getElementById('sound-control').addEventListener('mousedown', this.toggleSound.bind(this));
        document.getElementById('music-control').addEventListener('mousedown', this.toggleMusic.bind(this));

        this.game_loop = this.game_loop.bind(this);

       
        
       
        // add another binder for quit
        // and for music and sound
    }

    initialize(){
        // to reinitialise after constructor 
    
        this.#level = 1;

        let starting_x = this.starting_x_and_y[0]
        let starting_y = this.starting_x_and_y[1]
        
        this.#current_x_and_y[0] = starting_x;
        this.#current_x_and_y[1] = starting_y;

        this.#current_orientation = 0;
        this.#current_piece = new I();

        this.#stuck = false;

        moveDownInterval = 2000;

        // so we can do set up
        this.#paused = true;

        this.#lines = 0;
        this.#score = 0;

        // get a new clean gameboard
        this.#fill_game_board(this.get_width(),this.get_height(),this.unit);

        this.draw_piece(piece_context,this.#current_piece,this.#current_orientation,starting_x,starting_y,false);

        this.set_random_next_piece();
        //this.update_piece_preview(new this.#next_piece_with_orientation[0], this.#next_piece_with_orientation[1]);


        //this.#gamestate = GameState.PLAYING;
        this.#gamestate = GameState.SETUP;


    }

    setupBackgroundMusic() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.1; // Adjust volume as needed
    }
    
    playMoveSound() {
        if (this.#sound) {
            this.moveSound.currentTime = 0;
            this.moveSound.play();
        }
    }

    playLineClearSound() {
        if (this.#sound) {
            this.lineClearSound.currentTime = 0;
            this.lineClearSound.play();
        }
    }

    playGameOverSound(){
        this.lineClearSound.currentTime = 0;
        this.gameOverSound.play();
    }

    // testing functions ( to help with testin )
    // TODO delete them

    place_start_page(){
        this.#paused = true 
        document.getElementById('start-page').style.display = 'flex'
    }

    // i want play to get rid of start page, show a load page then start game

    start_game_main(){
        // from the first startv page with play on it

        // to prevent movement 
        this.#paused = true;

        // to get rid of start page 
        // this is listened to by the play btutom
        document.getElementById('start-page').style.display='none';

        // go to the loading page
         // would have gotten rid of the start page 

        this.begin_countdown_loading()
       
        // begin countdown to start the game
        //this.begin_countdown();


        // then start the game
        //requestAnimationFrame(this.game_loop);

    }

    // begin_countdown_loading(){
    //     let load_text = 'LOADING';
    //     let element = document.getElementById('load-page');
    //     element.style.display = 'flex'
    //     element.innerText = load_text;
    //     element.style.fontFamily = 'Pixelify Sans'

    //     //this.start_game()

    //     this.#paused = true;
    //     this.startCountdown_loading(load_text,element);
    //     //console.log(this.#gamestate)

    //     //requestAnimationFrame(this.game_loop);

        

    //     //this.#gamestate = GameState.PLAYING;
        
    // }

    async begin_countdown_loading(){
        let load_text = 'LOADING';
        let element = document.getElementById('load-page');
        element.style.display = 'flex'
        element.innerText = load_text;
        element.style.fontFamily = 'Pixelify Sans'

        //this.start_game()

        this.#paused = true;
        this.startCountdown_loading(load_text,element);
        //console.log(this.#gamestate)

        //this.#gamestate = GameState.PLAYING;
        
        requestAnimationFrame(this.game_loop);

        

        //this.#gamestate = GameState.PLAYING;
        
    }

    async startCountdown_loading(text,element) {

        let counter = 0
        let main_t = text;
        // let counter = text;
        
        return new Promise((resolve)=> {
            const interval = setInterval(() => {
                counter++;
                console.log(counter);
                main_t += '.'
        
              element.innerText = main_t;
              element.style.fontFamily = 'Pixelify Sans';
              
                
              if (counter > 3 ) {
                clearInterval(interval);
                element.style.display = 'none'
                this.#paused = false;
                this.#gamestate = GameState.PLAYING;
                this.update_piece_preview(new this.#next_piece_with_orientation[0], this.#next_piece_with_orientation[1]);
                console.log('Ding!');
                console.log(this.#gamestate)
                resolve()
                //this.game_loop()
              }
            }, 1500);
        })
        
    }

    reset_score(){
        // todo, make this change persist over refreshes 
        let hi_score = document.getElementById('hi-score');
        hi_score.innerText = 0;

        // then perform a database api call to persist the change
        set_score_DB(0)
    }

    toggleMusic(){
        
        // let this only play when not in gameover state 

        if(this.#gamestate != GameState.GAMEOVER){
            this.#music = !this.#music;
            this.backgroundMusic.muted = !this.#music;

            if(this.#music){
                this.backgroundMusic.currentTime = 0;
                this.backgroundMusic.play()
            }
            console.log('it is ', this.#music, 'that music is on' );
        }
        

        // if (button.classList.contains('fa-solid fa-toggle-off')) {
        //     button.classList.remove('fa-solidfa-toggle-off');
        //     button.classList.add('fa-solidfa-toggle-on');
        //     console.log('music on');
        // } else {
        //     button.classList.remove('fa-solidfa-toggle-on');
        //     button.classList.add('fa-solidfa-toggle-off');
        //     console.log('music off');
        // }
        // if (button.innerHTML.trim() === '&#xf204;') {
        //     button.innerHTML = '&#xf205;'; // Replace with another Unicode character
        // } else {
        //     button.innerHTML = '&#xf204;'; // Replace with the original Unicode character
        // }
    }

    

    toggleSound(){

        if(this.#gamestate != GameState.GAMEOVER){
            this.#sound = !this.#sound;
            this.moveSound.muted = !this.#sound;
            this.lineClearSound.muted =  !this.#sound; 
            console.log('it is ', this.#sound, 'that sound is on' )
        }
        

        // let button; 

        // // $(".fa-solid").click(function () { 
        // //     $(".fa-solid").toggleClass("fa-solid fa-toggle-on"); 
        // // }); 

        // if (this.#sound) {
        //     // sound on
        //     button = document.getElementById('sound-control2');

        //     button.style.display = 'inline';
        //     // button = document.getElementById('sound-control1');
        //     // button.style.display = 'none';


        //     //button.innerHTML = '&#xf204;';
        //      // Replace with another Unicode character
        // } else {
        //     //button.innerHTML = '&#xf205;'; // Replace with the original Unicode character
        //     button = document.getElementById('sound-control1');

        //     button.style.display = 'inline';
        //     button = document.getElementById('sound-control2');
        //     button.style.display = 'none';
        // }

        

        // if (button.classList.contains("fa-solidfa-toggle-off")) {
        //     button.classList.remove("fa-solidfa-toggle-off");
        //     button.classList.add("fa-solidfa-toggle-on");
        //     console.log('sound on');
        // } else {
        //     button.classList.remove("fa-solidfa-toggle-on");
        //     button.classList.add("fa-solidfa-toggle-off");
        //     console.log('sound off');
        // }
    }

    togglePause() {

        if (this.#gamestate == GameState.PLAYING || this.#gamestate == GameState.PAUSED){
            this.#paused = !this.#paused;
        //console.log(this.paused ? 'Game paused' : 'Game resumed');
        document.getElementById('pause').innerText = this.#paused ? 'Resume' : 'Pause';

        let pause_screen = document.getElementById('pause-screen');

        console.log(this.#gamestate)
        if (this.#gamestate === GameState.PLAYING) {
            this.pauseGame();
            pause_screen.style.display = 'flex';

        } else if (this.#gamestate === GameState.PAUSED) {
            this.resumeGame();
            pause_screen.style.display = 'none';
        }
        }
        
    }

    pauseGame(){
        this.#gamestate = GameState.PAUSED;
        console.log('game paused')
    }

    resumeGame(){
        this.#gamestate = GameState.RESUMING;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        console.log('resuming game')
        this.begin_countdown()
    }

    startCountdown(seconds,element) {

        let counter = seconds;
          
        const interval = setInterval(() => {
            counter--;
          console.log(counter);
    
          element.innerText = counter;
          element.style.fontFamily = 'Pixelify Sans';
          
            
          if (counter <= 0 ) {
            clearInterval(interval);
            element.style.display = 'none'
            this.#paused = false;
            this.#gamestate = GameState.PLAYING;
            this.update_piece_preview(new this.#next_piece_with_orientation[0], this.#next_piece_with_orientation[1]);
            console.log('Ding!');
            console.log(this.#gamestate)
            //this.game_loop()
          }
        }, 1500);
    }

    begin_countdown(){
        let seconds = 3;
        let element = document.getElementById('count-down');
        element.style.display = 'flex'
        element.innerText = seconds;
        element.style.fontFamily = 'Pixelify Sans'

        //this.start_game()

        this.#paused = true;
        this.startCountdown(seconds,element);
        //console.log(this.#gamestate)

        //this.#gamestate = GameState.PLAYING;

        requestAnimationFrame(this.game_loop);

        

        //this.#gamestate = GameState.PLAYING;
        
    }

    

    handleKeyPress(event) {

        if (event.key === 'p' || event.key === 'P') {
            this.togglePause();
            return;
        }

        if(this.#paused == false){
            if (event.key === 'ArrowLeft') {
                //console.log('left was pressed');
                this.move_left(piece_context,this.#current_piece,this.#current_orientation,this.get_current_x(),
                this.get_current_y())
                this.playMoveSound()
                
             } else if (event.key === 'ArrowRight') {
                 //console.log('right was pressed');
                this.move_right(piece_context,this.#current_piece,this.#current_orientation,this.get_current_x(),
                this.get_current_y())
                this.playMoveSound()
                
             } else if (event.key === 'ArrowDown') {
                //console.log('down was pressed');
                this.move_down(piece_context,this.#current_piece,this.#current_orientation,this.get_current_x(),
                this.get_current_y())
                // done within the fxn
                this.playMoveSound()
                
             } else if (event.key === 'ArrowUp') {
                // console.log('up was pressed');
                this.rotate_piece(piece_context,this.#current_piece,this.#current_orientation,this.get_current_x(),
                this.get_current_y())
                this.playMoveSound()
                
             }
        }

       
    }

    set_stuck(value){
        // value is t or f
        this.#stuck = value;
    }

    get_stuck(){
        return this.#stuck;
    }

    get_board(){
        // will get rid of this
        return this.#Game_Board;
    }

    set_board(board){
        // for testing purposes only
        this.#Game_Board = board;
    }

    get_current_orient(){
        return this.#current_orientation;
    }

    get_next_piece_info(){
        return this.#next_piece_with_orientation;
    }

    get_current_piece(){
        return this.#current_piece;
    }

    get_current_x(){
        return this.#current_x_and_y[0];
    }

    get_current_y(){
        return this.#current_x_and_y[1];
    }
    /////////


    reset_x_and_y(){
        // reset x and y coordinates to original set ones
        // for each new game
        this.#current_x_and_y[0] = this.starting_x_and_y[0];
        this.#current_x_and_y[1] = this.starting_x_and_y[1];
    }

    get_width(){
        return this.width_and_height[0];
    }

    get_height(){
        return this.width_and_height[1];
    }

    update_lines(new_lines){
        // not tested

        if(new_lines < trigger_val ){
            trigger+=1;
        }

        else{
            trigger = trigger_val;
        }

        // increment by 1
        this.#lines += new_lines;

        console.log(this.#lines)
        

        // make change on screen
        document.getElementById("lines").innerText = this.#lines;
    }

    update_score(new_score){
        // not tested


        // increment by 1
        this.#score += new_score;

        // make change on screen
        // quite literaly changing the score in the html
        document.getElementById("score").innerText = this.#score;
    }

    update_level(){
        console.log('level updated')

        if(this.#level == 10){
            return 
            // don't go above 10
        }

        this.#level += 1;
        moveDownInterval -= 200; 
        document.getElementById("Level").innerText = this.#level;
    }

    #fill_game_board(width, height, unit){
        // this directly fills the game baord

        // need to make asertions!
        // TODO: ensure the unit works with the dimensions specified

        let new_width = width/unit;
        let new_height = height/unit;

        let board = [];
        let x_coord = [];

        for(let i = 0; i < new_width; i++){
            x_coord.push(0);
        }

        for(let i = 0; i < new_height; i++){
            // very important that i use a slice. ALIASSINNNG
            board.push(x_coord.slice());
        }

        this.#Game_Board = board;
    }


    update_game_board(piece, orientation, old_x, old_y, new_x, new_y){

        // we might not need this
        
        // update the game board based on piece

        // first clear the position where it currently is, then move
        // before hand this movement must be already approved

        let x = old_x/this.unit;
        let y = old_y/this.unit;
        let map = piece.get_map()[orientation];
        let color = piece.get_color();


        // fill the old position with falsies
        partial_fill_game_board(x,y,map,this.#Game_Board,0);


        x = new_x/this.unit;
        y = new_y/this.unit;
        
        // the other thing should be its color attribute
        partial_fill_game_board(x,y,map,this.#Game_Board,color);
    }

    set_random_next_piece(){
        this.#next_piece_with_orientation[0] = getRandomElement(this.#possible_pieces);
        this.#next_piece_with_orientation[1] = getRandomElement(this.#possible_rotations);
    }

    // random_current_piece(){
    //     // should be used to change next piece 
        

    //     // let gamepiece = getRandomElement(this.#possible_pieces);
    //     // this.#current_piece = new gamepiece();

    //     this.#next_piece_with_orientation[0] = getRandomElement(this.#possible_pieces);
    // }

    // random_current_orientation(){
    //     // should be used to change next piece 

    //     // this.#current_orientation = getRandomElement(this.#possible_rotations);

    //     this.#next_piece_with_orientation[1] = getRandomElement(this.#possible_rotations);
    // }

    update_orientation(){
        // used after a new orientation tested for collission has 
        // b een apporved
        this.#current_orientation = (this.#current_orientation + 1) % 4;
    }

    update_coords(x,y){
        // used after a new coord tested for collission has 
        // b een apporved
        this.#current_x_and_y[0] = x;
        this.#current_x_and_y[1] = y;
    }

    update_current_to_next(){
        // at the end of every placement of piece 
        // when we have put an item down and need to update what the next
        // current piece would be

        let gamepiece =  this.#next_piece_with_orientation[0];
        let orientation = this.#next_piece_with_orientation[1];

        this.#current_piece = new gamepiece();
        this.#current_orientation = orientation;
    }

    // TODO: need a collision check function that works with the game board
    // and updates it 

    // WE GET WIDTH AND HEIGHT FROM CURRENT PIECE

    // we use current x and y to draw the pice.
   
    check_left(piece, orientation, main_x, main_y){
        // we have both of these because i might be checking rotation
        // which is not the current piece

        // returns true if there is something at the left boundary

        //console.log('piece in question: ', piece.name);
 
        //console.log('current board: ', JSON.stringify(this.#Game_Board));

        //console.log('current x: ', main_x)
        
        if ( (main_x/this.unit) - 1 < 0){
            // we are at edge
            return true
        }

        let gamepiece_map = piece.get_map()[orientation];


        let start_x = main_x/this.unit;
        let start_y = main_y/this.unit;
        

        //console.log('this is start x: ', start_x, 'and this is start_y: ', start_y);

        for(let i=0; i < gamepiece_map.length; i++){
            let x = find_first_1(gamepiece_map[i]) 

            //console.log('i = ', i)
            //console.log('first 1 in tetromino map for i = ', i, ' is = ', x)


            if (x == -1){
                ///console.log("here")
                try {
                    throw new Error()
                } catch (error) {
                    console.error("There is a problem");
                }
            }

            x = x + start_x;
            
            // might be unecessary
            if (x - 1 >= (this.get_width() / this.unit)|| x - 1 < 0){
                // then where we want to move to is out of range
                // this means, we are at an edge location
                console.log(x-1, " is out of bounds");
                return true
            }


            let board = this.#Game_Board;
            //console.log('y is',i+start_y, 'and x is' , x-1);
            if(board[i+start_y][x-1] != 0){
                // then that place is occupied
                //console.log(JSON.stringify(board[i+start_y][x-1]))
                return true;
            }
            
        }

        // not sure when one would return false but something should b returned
        return false;


        // for check left, we literally check the 
        // left boundary, 1 step to the left of the pice

        // we make sure to check for out of bound errors 

        // we make sure to handle out of bound errors when going one to the left

        
        
    }

    check_right(piece, orientation, main_x, main_y){
        // for check right, we literally check the 
        // right boundary, 1 step to the right of the pice

        // we make sure to check for out of bound errors within piece
        // contextg

        // we make sure to handle out of bound errors when going one to the right
        // (so no out of bounds in the piece array!)

        let check =  piece.get_max_x(orientation,this.get_width(),this.unit);
        //console.log('old x: ', main_x, 'max position x can be: ', check)

        //console.log('actual max_width', check)
        if (main_x >= check){
            //console.log('here2')
            return true
        }

        let gamepiece_map = piece.get_map()[orientation];

        

        let start_x = main_x/this.unit;
        //console.log('startx: ', start_x);
        let start_y = main_y/this.unit;
        //console.log('startx: ', start_x);

        for(let i=0; i < gamepiece_map.length; i++){
            //console.log('array in question:', JSON.stringify(gamepiece_map));
            let x = find_last_1(gamepiece_map[i]) ;

            //console.log('last 1:', x)

            if (x == -1){
                try {
                    throw new Error()
                } catch (error) {
                    console.error("There is a problem");
                }
            }

            x = x + start_x;
            
            // need to check we are within bound

            // because of the abpve max x check


            // that other condition < 0 doesn't make sense 
            if (x + 1 >= (this.get_width() / this.unit) || x + 1 < 0){
                // then where we want to move to is out of range
                // this means, we are at an edge location
                //console.log('grid width: ',this.get_width() / this.unit )
                console.log(x+1, " is out of bounds");

                return true
            }

            let board = this.#Game_Board;
            if(board[i+start_y][x+1] != 0){
                // then that place is occupied
                // console.log(JSON.stringify(board))
                // console.log(JSON.stringify(board[i+start_y][x+1]))
                // console.log('here4')
                return true;
            }

        }

        return false;

    }

    // check_bottom(piece, orientation, x, y){
    //     // for check bottom, we literally check the 
    //     // bottom boundary, 1 step to the bottom of the pice

    //     // we make sure to check for out of bound errors within piece
    //     // contextg

    //     // we make sure to handle out of bound errors when going one to the bottom
    //     // (so no out of bounds in the piece array!)

    //     // if 0, just check
    //     // if 1, move a step down

    //     // console.log('this is old y: ', y)

    //     // let z = piece.get_max_y(orientation,this.get_height(),this.unit);

    //     // console.log('this is the maximum y we can go: ' ,z)

    //     if (y + this.unit > piece.get_max_y(orientation,this.get_height(),this.unit)){
    //         return true
    //     }


    //     let gamepiece_map = piece.get_map()[orientation];

    //     let start_x = x/this.unit;
    //     let start_y = y/this.unit;

    //     let end_y = gamepiece_map.length - 1
    //     let last_row = gamepiece_map[end_y];

    //     let board = this.#Game_Board;

    //     //this.place_piece(new I(),0,120,40)

    //     // console.log('this is start_y:', start_y, start_y *this.unit)
    //     // console.log('this is start_x:', start_x, start_x *this.unit)
        
    //     // console.log('this is the board', board)

    //     // console.log('this is the piece map for ', piece.name,': ' ,gamepiece_map)

      

    //     for(let i = 0; i < last_row.length; i++){
    //         //console.log('this is the last row of ', piece.name, '"s piece map: ', last_row);
    //         //console.log('thing:', board[start_y+end_y][start_x + i])

            
    //         if(last_row[i] == 0){
    //             //console.log('HERE')
    //             console.log(board[start_y+end_y][start_x + i])
    //             if(board[start_y+end_y][start_x + i] != 0){
    //                 //console.log('HERE')
    //                 return true;
    //             }
    //         }

    //         else if(last_row[i] == 1){
    //             if (start_y+end_y+ 1 >= this.get_height()/this.unit){
    //                 // last row[i] == 1  
    //                 //console.log('here1')
    //                 console.log(start_y+end_y+1, " is out of bounds");
    //                 return true 
    //             }  
    
    //             if(board[start_y+end_y+ 1][start_x + i] != 0){
    //                 //console.log('here2')
    //                 return true;
    //             }
    //         }

           
    //     }

    //     return false;
    // }



    check_bottom(piece, orientation, x, y){
        // for check bottom, we literally check the 
        // bottom boundary, 1 step to the bottom of the pice

        // we make sure to check for out of bound errors within piece
        // contextg

        // we make sure to handle out of bound errors when going one to the bottom
        // (so no out of bounds in the piece array!)

        // if 0, just check
        // if 1, move a step down

        // console.log('this is old y: ', y)

        // let z = piece.get_max_y(orientation,this.get_height(),this.unit);

        // console.log('this is the maximum y we can go: ' ,z)

        if (y + this.unit > piece.get_max_y(orientation,this.get_height(),this.unit)){
            return true
        }


        let gamepiece_map = piece.get_map()[orientation];

        const start_x = x / this.unit;
        const start_y = y / this.unit;
    
        const board = this.#Game_Board;
    
        for (let row = 0; row < gamepiece_map.length; row++) {
            for (let col = 0; col < gamepiece_map[row].length; col++) {
                if (gamepiece_map[row][col] === 1) {
                    const board_x = start_x + col;
                    const board_y = start_y + row + 1; // Check one step down
    
                    // Check if moving down would go out of bounds
                    if (board_y >= this.get_height() / this.unit || board[board_y][board_x] !== 0) {
                        return true; // Collision detected
                    }
                }
            }
        }
    
        return false; // No collision
    

        // let start_x = x/this.unit;
        // let start_y = y/this.unit;

        // let end_y = gamepiece_map.length - 1
        // //let last_row = gamepiece_map[end_y];

        // let board = this.#Game_Board;

        // //this.place_piece(new I(),0,120,40)

        // // console.log('this is start_y:', start_y, start_y *this.unit)
        // // console.log('this is start_x:', start_x, start_x *this.unit)
        
        // // console.log('this is the board', board)

        // // console.log('this is the piece map for ', piece.name,': ' ,gamepiece_map)

        // for (let j = 0; j <gamepiece_map.length; j++){
        //     // we are checking all the rows 

        //     // just a birner name
        //     let last_row = gamepiece_map[j]

        //     for(let i = 0; i < last_row.length; i++){
        //         //console.log('this is the last row of ', piece.name, '"s piece map: ', last_row);
        //         //console.log('thing:', board[start_y+end_y][start_x + i])
    
                
        //         if(last_row[i] == 0){
        //             //console.log('HERE')
        //             console.log(board[start_y+end_y][start_x + i])
        //             if(board[start_y+end_y][start_x + i] != 0){
        //                 //console.log('HERE')
        //                 return true;
        //             }
        //         }
    
        //         else if(last_row[i] == 1){
        //             if (start_y+end_y+ 1 >= this.get_height()/this.unit){
        //                 // last row[i] == 1  
        //                 //console.log('here1')
        //                 console.log(start_y+end_y+1, " is out of bounds");
        //                 return true 
        //             }  
        
        //             if(board[start_y+end_y+ 1][start_x + i] != 0){
        //                 //console.log('here2')
        //                 return true;
        //             }
        //         }
    
               
        //     }
        // }

        

        // return false;
    }

    check_area(piece,orientation,x,y){
        // we check the area tht the piece contains. useful for rotation checks

        let gamepiece_map = piece.get_map()[orientation];
        let start_x = x/this.unit;
        let start_y = y/this.unit;
        let board = this.#Game_Board;

        let j = 0;
        for(const y_coord of gamepiece_map){
            let i = 0
            for(const x_coord of y_coord){
                if (x_coord === 1){
                    // we ned to assert that these are valid places to check in da board
                    //console.log('j =', j, ' i =', i)
                    //console.log('this is the board:', JSON.stringify(board));
                    if(board[start_y + j][start_x + i] != 0){
                        return true;
                    }
                }
                i += 1;
            }
            j += 1;
        }

        return false;

    }


    check_rotate(piece, orientation,x,y){

        // we do all  checks and do an early return once 
        // we reach a problem.

        //console.log("current coords: ", x, y)

        // first, edge cases
        // console.log(typeof piece)
        // console.log(this.get_width(), this.unit)
        // console.log('orientation at check rotate',orientation)
        // let z  = ;
        // console.log('max:',z)
        // console.log('butterflu')

        // console.log('this is x and z:', x, z)

        if(x == 0){
            // if we are at the left edge we still want to be able to rotate
            return this.check_left(piece, orientation,x + this.unit,y);
        }

        
        else if(x == piece.get_max_x(orientation,this.get_width(),this.unit) ){
            //console.log('here')

            return this.check_right(piece, orientation,x - this.unit,y)
        }
        //

        else if(this.check_left(piece, orientation,x,y)){
            // otherwise we check as normal
            return true;
        }

        // should b x -this.unit
        else if(this.check_right(piece, orientation,x,y)){
            //console.log('here')
            return true;
        }

        // we also do a check of within the piece in case the rotation 
        // has moved the piece to overlap or out of bounds.
        else if(this.check_area(piece, orientation,x,y)){
            return true;
        }

        return false; 
    }

    // move_piece(piece,from, to, old_orientation,new_orientation){
    //     // will have a from coordinate and a to coordinate so we can 
    //     // use the update thing 

    //     // make sure that the coordinate is within range and the 
    //     // arrays are of len 2 only

    //     if(from.length != 2 || to.length != 2){
    //         try {
    //             throw new Error();
    //         } catch (error) {
    //             console.error("Invalid coordinate field")
    //         }
    //     }
        
    //     this.update_game_board(piece,new_orientation,from[0],from[1], to[0], to[1])
    //     // this.update_game_board(from[0], from[1], to[0], to[1]);

    //     // experimental, might need some sort of delay or wait time
    //     // todo: test this

    //     // this.#current_piece.clear(piece_context,old_orientation,from[0],from[1],this.unit);
    //     // this.#current_piece.draw(piece_context,new_orientation,to[0],to[1],this.unit);
    // }
    

    place_piece(piece,orientation, x, y){
        // places piece that is stuck in gamestate
        // we only really want stuck pieces in game state
        // pieces that are not stuck should be cleared and redrawn
        // could be current piece or some random piece used for testing
        let new_x = x/this.unit;
        
        let new_y = y/this.unit;

        console.log('we will place piece at x =', new_x, 'and y=',new_y)
        
        let map = piece.get_map()[orientation];
        let color = piece.get_color();

        partial_fill_game_board(new_x,new_y,map,this.get_board(),color);
    }



    clear_preview(location,unit){
        // a tetromino should only take 16 sq unit
        // however because draw rect is crazy
        // we need to "over clear"
        let area = unit * 5;
        location.clearRect(0,0,area,area);
    }

   // draw_piece(piece_context,this.#current_piece,this.#current_orientation,starting_x,starting_y);

    draw_piece(location,piece,orientation,x,y,brick){
        // only used in the beginning (after a piece is stuck from 
        // move down)

        //console.log(piece.name)
        //console.log(orientation,x,y)
        //this.draw_piece(piece_preview_context,piece,orientation,0,0);
        
        piece.draw(location,orientation,x,y,this.unit,brick);
    }

    move_down(location,piece,orientation,x,y){

        //this.playMoveSound()

        // look at the subsequent movement
        let cant_move = this.check_bottom(piece, orientation, x, y);
        // if we can move

        //console.log("it is ", cant_move, ' that we cant move');

        if(!cant_move){
            // clear where we are
            piece.clear(location,orientation,x,y,this.unit);

            //draw the new one 
            piece.draw(location,orientation,x,y+this.unit,this.unit,false);

            // update teh coords
            this.update_coords(x,y+this.unit);

            //console.log('this is current y', this.get_current_y())
            return 0;
        }

        

        //if we can't then we are stuck
        // the piece remains in its original location (doesnt get redrawn)
        // then we add that piece to the gamestate (we are permanent)

        this.place_piece(piece,orientation, x, y);
        // because we are stuck
        // we trigger checks for line clearing
        // or game over
        // we also triggr the arrival of a new piece
        this.set_stuck(true);
        return 1;
        
    }

    move_left(location,piece,orientation,x,y){
        // look at the subsequent movement

        // it is true thqt there is an obstruction
        let cant_move = this.check_left(piece, orientation, x, y);
        // if we can move

        //console.log("it is ", cant_move, ' that we cant move');

        if(!cant_move){
            // clear where we are
            piece.clear(location,orientation,x,y,this.unit);

            //draw the new one 
            piece.draw(location,orientation,x-this.unit,y,this.unit,false);

            // update teh coords
            this.update_coords(x-this.unit,y);

        }

        //console.log('current_x: ', this.get_current_x())

        // else we can't move any further, do not perform 
        // redrawing action
        //return 0;
    }

    move_right(location,piece,orientation,x,y){
        // look at the subsequent movement
        //console.log(typeof piece)

        // it is true thqt there is an obstruction
        let cant_move = this.check_right(piece, orientation, x, y);
        // if we can move

        //console.log("it is ", cant_move, ' that we cant move');

        if(!cant_move){
            // clear where we are
            piece.clear(location,orientation,x,y,this.unit);

            //draw the new one 
            piece.draw(location,orientation,x+this.unit,y,this.unit,false);

            //console.log('old x:', x)
            // update teh coords
            this.update_coords(x+this.unit,y);

            
        }

        //('current x:', this.get_current_x())

        // else we can't move any further, do not perform 
        // redrawing action
    
    }

    rotate_piece(location,piece,orientation,x,y){
        // given the current orientation, look at the next one and see 
        // if it is possible 

        // look at the subsequent movement
        let cant_move = this.check_rotate(piece, (orientation+1)%4, x, y);
         // if we can move
        
        //console.log("it is ", cant_move, ' that we cant move');

        if(!cant_move){
             // clear where we are
             piece.clear(location,orientation,x,y,this.unit);
 
             //draw the new one 
             piece.draw(location,(orientation+1)%4,x,y,this.unit,false);
            
             //console.log('old x:', x)
             // update the orientation. Coords should remain same
             this.update_orientation();

             //console.log('new x:', this.get_current_x())

        }
 
         // else we can't move any further, do not perform 
         // redrawing action
    }

    clear_lines(board,location,unit){
        // we do this if move down returns 1
        // becuase that means we are stuck
    
    
        // first check the board for full rows indices
        // save them in a variabel
        let full_rows = find_full_rows(board);
    
        // perform the 'animation' on these full row indices
    
        // there will likely be a pause/ timing to do this

        console.log('these are the indices of the full rows, ', full_rows)
        
        //console.log('look at old oard,', board)
        //do the update game state function. 
        let paste = update_GS(board,full_rows);
    
        // if it returns 1 (changes were made) then do the paste to screen function
        if(paste){
            // maybe wait a bit?
            // to imitate the line clearing
            //TODO
            location.clearRect(0,0,this.get_width(), this.get_height())
            paste_GS_to_screen(board,location,unit)
            // paste_GS_to_screen(board,location,unit);
            // then we change the sco = re on screen

            let new_lines = parseInt(full_rows.length);
            this.update_lines(new_lines);

            let new_score = 0;

            if(Score_Base.has(new_lines)){
                new_score = (this.#level + 1) * Score_Base.get(new_lines)
            }

            else{
                console.log('brat')
                new_score = (this.#level + 1) * 40
            }

            // let new_score = (this.#level + 1) *
            this.update_score(new_score);

            this.playLineClearSound()
        }

        
    }
    
    check_game_over(board){
        // returns true if the top row is full
        // and false if it isnt
        return row_has_something(board[0]);
    }

    update_piece_preview(piece,orientation){
        // first cleat the screen
        this.clear_preview(piece_preview_context,this.unit);

        // then draw
        //this.draw_piece()
        // console.log(piece.name)
        // console.log(typeof piece)
        this.draw_piece(piece_preview_context,piece,orientation,0,0,true);
    }


    // start_game(){
    //      // toggle pause sop movements are not made
    //     this.#paused = true;
    //     //this.togglePause()

    //     //  begin count down
    //     this.begin_countdown()


    //     // once count down is finished. toggle pause back to false
    //     // to false

    //     while(true){
    //         //this.#paused = false;
    //         // set stuck to false
    //         this.set_stuck(false);

    //         // generate what the next piece should be
    //         this.set_random_next_piece();

    //         // place next piece on the side bar
    //         this.update_piece_preview(new this.#next_piece_with_orientation[0],this.#next_piece_with_orientation[1]);
    //         //this.update_piece_preview(new Z(),1);

    //         while(true){
    //             // no we are registering the key presses
    //             // we do an inner loop to prevent infinite loop
    //             if(this.#stuck){
    //                 break
    //             }
    //         }

    //         if(this.check_game_over(this.#Game_Board)){
    //             // breaking from the outer loop to switch screen
    //             break
    //         }

    //         // game is not over, but a piece is stuck so we have to 
    //         // prepare for new piece and perform line clearing 

    //         // perform line clesaring if need be
    //         this.clear_lines(this.#Game_Board,piece_context,this.unit);

    //         // change current piece to be the next piece generated from begininngi
    //         this.update_current_to_next();

    //         // then it needs to wait for key press if not
    //         // infinite loop
    //         // putting this break for now
    //        // break
    //         // draw the current piece (shouldn't be in init)
    //         //this.draw_piece(piece_context,this.#current_piece,this.#current_orientation,this.starting_x,this.starting_y);
            

    //         // then next we have key press hopefully before now 
    //         // key presses shouldnt register

    //         // check for stuck (which may change to true after a key press)
    //         // if stuck is true
    //         // if(this.#stuck){
    //         //     // so this was set by down key

    //         //     // first check for game over. if game over is true. break from
    //         //     // the loop
    //         //     if(this.check_game_over(this.#Game_Board)){
    //         //         break
    //         //     }

    //         //     // perform line clesaring if need be
    //         //     this.clear_lines(this.#Game_Board,piece_context,this.unit);

    //         //     // change current piece to be the next piece generated from begininngi
    //         //     this.update_current_to_next();
    
    //         // }

    //         // show the game over option

    //         // within the handler
    //         // for retry
    //         // let it play start game again if clicked 
    //         // for quit, let it change the tetris page to a 
    //         // ready to play screen
    //         // check that the score remains from before
    //         // also add an option to reset scroe and lines
    //     }


     

        
        
       

    //     // loop over once more


    // }

    reset_game(){

        
        this.initialize();
        this.clear_preview(piece_preview_context,this.unit);

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        
        // if(this.#music){
        //     this.backgroundMusic.play();
        // }
        //this.backgroundMusic.currentTime = 0;


        this.backgroundMusic.muted = !this.#music;
        this.moveSound.muted = !this.#sound;
        this.lineClearSound.muted = !this.#sound;
        document.getElementById('lines').innerText = 0;
        document.getElementById('score').innerText = 0;
        document.getElementById('Level').innerText = 1;
        piece_context.clearRect(0,0,this.get_width(),this.get_height());

        console.log('reset!')
        
     
        
    }



    retry_game(){
        // first resest all that needs to be rest 
        // to avoid the music from playing 

        // if (this.animationFrameId) {
        //     cancelAnimationFrame(this.animationFrameId);
        // }

        if(this.#gamestate == GameState.GAMEOVER){
            this.backgroundMusic.currentTime = 0;
        }

        this.update_high_score(this.#score)

        
        this.#gamestate = GameState.SETUP;

        this.reset_game();


        // then start game which will get rid of game over state
        // and put control back to music becuase it changes it to playing
        this.start_game();

        // this.#paused = true;
        //setInterval(()=>{console.log('blah')}, 4000)
        
        // when we retyr, 
        // we want the game over page to be gone 
        // before we countdown
        // document.getElementById('game-over').style.display='none';

        // // needs to clear old game state (like the screen)
        // // clear the scores (except high score)
        // // reset the array game state

        // // when retry and quit is pressed we need to update high score
        // // so add another listener 
        // console.log('here')
        // this.begin_countdown();


        
    }

    quit_game(){
        // reset all that needs to be reset

        if(this.#gamestate == GameState.GAMEOVER){
            this.backgroundMusic.currentTime = 0;
        }

        this.#gamestate = GameState.SETUP;

        this.update_high_score(this.#score)

        this.reset_game()

        
        

        // go start page
        
        // want to get rid of game over page 
        document.getElementById('game-over').style.display = 'none';

        /// and go to start page
        document.getElementById('start-page').style.display = 'flex';

        //this.#gamestate = GameState.PLAYING;
    }

    start_game() {
        //this.clear_game()
        this.#paused = true;
        //setInterval(()=>{console.log('blah')}, 4000)
        
        // when we retyr, 
        // we want the game over page to be gone 
        // before we countdown
        document.getElementById('game-over').style.display='none';

        // needs to clear old game state (like the screen)
        // clear the scores (except high score)
        // reset the array game state

        // when retry and quit is pressed we need to update high score
        // so add another listener 
        console.log('here')
        this.begin_countdown();
        // begin count down does these states 
        // this.#gamestate = GameState.PLAYING;
        //requestAnimationFrame(this.game_loop);

        
        

    }

    //setTimeout(this.game_loop, 1500);

    // game_loop(){
    //     if (!this.#paused) {
    //         // Your game logic here

    //         if(this.#stuck){

    //         }
    //         // Set stuck to false
    //         this.set_stuck(false);

    //         // Generate what the next piece should be
    //         this.set_random_next_piece();

    //         // Place next piece on the sidebar
    //         this.update_piece_preview(new this.#next_piece_with_orientation[0], this.#next_piece_with_orientation[1]);

    //         // Handle the current piece logic
    //         if (this.#stuck) {
    //             if (this.check_game_over(this.#Game_Board)) {
    //                 // Show game over screen
    //                 return;
    //             } else {
    //                 this.clear_lines(this.#Game_Board, piece_context, this.unit);
    //                 this.update_current_to_next();
    //             }
    //         }
    //     }

    //     //requestAnimationFrame(this.game_loop);
    //     setTimeout(this.game_loop, 500);
    // }

    // game_loop() {
    //     if (!this.#paused) {
    //         if (this.#stuck) {
    //             if (this.check_game_over(this.#Game_Board)) {
    //                 // Show game over screen
    //                 return;
    //             } else {
    //                 this.clear_lines(this.get_board(), piece_context, this.unit);
    //                 this.update_current_to_next();
    //                 this.set_random_next_piece();
    //                 this.update_piece_preview(new this.#next_piece_with_orientation[0], this.#next_piece_with_orientation[1]);
    //                 this.draw_piece(piece_context,this.#current_piece,this.#current_orientation,
    //                     this.starting_x_and_y[0], this.starting_x_and_y[1], false)
    //                 this.set_stuck(false);
    //             }
    //         }

    //         // Move the current piece down every game loop iteration
    //         this.move_down(piece_context, this.#current_piece, this.#current_orientation, this.get_current_x(), this.get_current_y());
    //     }

    //     setTimeout(this.game_loop, 1500);
    //     //requestAnimationFrame(this.game_loop);
    // }

    update_high_score(score){
        // retry and quit listen to this.

        // for now use lines
        // we want to use score in the future

        //let current_hi = parseInt(document.getElementById('hi-score').innerText) ;

        if(score > get_score_DB()){

            console.log('here1')
            document.getElementById('hi-score').innerText = score
            // then perform a database update
            set_score_DB(score);
        }
    }

    game_loop() {
        //this.backgroundMusic.play();

        let lastMoveDownTime = performance.now();

        // find a way to increase this over time 
        //const moveDownInterval = moveDownInterval; // 2 seconds

        // while (true)
        const loop = async () =>  {
            if (!this.#paused) {
                if (this.#stuck) {
                    //('current piece:', this.#current_piece.name)
                    //console.log('it is ', this.#stuck, 'that we are stuck')

                    document.dispatchEvent(this.stuckEvent);

                    //console.log('current piece:', this.#current_piece.name)
                    //console.log('1. it is ', this.#stuck, 'that we are stuck')
                    
                }

                // if(this.#lines % 2 == 0 && this.#lines > 0

                
                if(trigger == trigger_val){
                    console.log('lines ', this.#lines);
                    document.dispatchEvent(this.LevelEvent);
                    trigger = 0;
                }

                

                // Move the current piece down every 2 sec

                
                //setInterval(this.move_down(piece_context, this.#current_piece, this.#current_orientation, this.get_current_x(), this.get_current_y()), 10000);
                //
                const currentTime = performance.now();
                if (currentTime - lastMoveDownTime >= moveDownInterval) {
                    this.move_down(piece_context, this.#current_piece, this.#current_orientation, this.get_current_x(), this.get_current_y());
                    lastMoveDownTime = currentTime;
                }
            }

            //await new Promise(requestAnimationFrame);
            this.animationFrameId = requestAnimationFrame(loop);
        }

       

        this.animationFrameId = requestAnimationFrame(loop);
    }

    handlePieceStuck() {
        if (this.check_game_over(this.#Game_Board)) {
            // Show game over screen
            this.#paused = true;
            let game_over = document.getElementById('game-over');
            game_over.style.display = 'flex';
            this.#gamestate = GameState.GAMEOVER;

            this.backgroundMusic.muted = true;
            this.moveSound.muted = true;
            this.lineClearSound.muted = true;

            this.playGameOverSound()
            console.log('game_over!')
            return;
        } else {
                this.clear_lines(this.get_board(), piece_context, this.unit);
                this.update_current_to_next();
                this.set_random_next_piece();
                this.update_piece_preview(new this.#next_piece_with_orientation[0], this.#next_piece_with_orientation[1]);
                this.reset_x_and_y()
                this.draw_piece(piece_context,this.#current_piece,this.#current_orientation,
                        this.starting_x_and_y[0], this.starting_x_and_y[1], false)

                //console.log('starting x: ',this.starting_x_and_y[0] , 'starting y: ', this.starting_x_and_y[1])
                
                this.set_stuck(false);
                //console.log('it is ', this.#stuck, 'that we are stuck')
        }
    }



}


// Interface
class GamePiece{
    /**
     * @param {string} name - name of piece.
     * Orientation and Coorinate of Piece are global, kept track of by master class
     * Width and height varies per piece. Each piece must describe width and height
     * Each piece must have a piece map
     * TODO MAYBE: Each piece should be able to clear itself.
     * Each piece must implement the methods below
     */

    constructor(name){
        this.name = name;
    }

    draw(){
        throw new Error("Not Implemented Error");
    }

    get_color(){
        throw new Error("Not Implemented Error");
    }

    clear(){
        throw new Error("Not Implemented Error");
    }

    get_max_x(){
        throw new Error("Not Implemented Error");
    }
    
    get_max_y(){
        throw new Error("Not Implemented Error");
    }

    get_width(){
        throw new Error("Not Implemented Error");
    }

    get_height(){
        throw new Error("Not Implemented Error");
    }

}

class I extends GamePiece{
    #dimensions;
    #piece_map;
    #color;
    constructor(){
        super("I");
        // this.#piece_map = [   
        //     [   [1],[1],[1],[1] ],
        //     [   [1,1,1,1]   ],
        //     [   [1],[1],[1],[1]  ],
        //     [   [1,1,1,1]   ]   
        // ];

        this.#piece_map = [   
            [   [1],[1],[1],[1] ],
            [   [1,1,1,1]  ],
            [   [1],[1],[1],[1]  ],
            [   [1,1,1,1]  ]   
        ];
        
        this.#dimensions = [ [1,4], [4,1], [1,4], [4,1] ];
        
        
        //this.#color = "#4290f5";
        this.#color = "#00ffff";
    }


    get_map(){
        return this.#piece_map;
    }

    get_color(){
        return this.#color;
    }

    #get_dimensions(){
        return this.#dimensions;
    }


    get_max_x(orientation,canvas_width,unit){
        //console.log('orientation at get_max x:', orientation)
        let width = this.get_width(orientation) * unit;
        let maximum_x = canvas_width - width;

        try {
            if (maximum_x < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_x;

    }
    
    get_max_y(orientation, canvas_height, unit){
        let height = this.get_height(orientation) * unit;

        let maximum_y = canvas_height - height;

        try {
            if (maximum_y < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_y;

    }

    get_width(orientation){
        //console.log('orientation at get width: ', orientation);
        return get_width_all(orientation,this.#get_dimensions())
    }

    get_height(orientation){
        return get_height_all(orientation,this.#get_dimensions())
    }

    draw(location,orientation,x,y,unit,brick){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        // supposed to be bricks but we are scrapping these
        location.strokeStyle = "#2765b8";
        location.lineWidth = 1;
        
        draw_shape(location,map,x,y,unit,brick);
    }

    clear(location,orientation,x,y,unit){
        let map = this.get_map()[orientation];
        clear_shape(location,map,x,y,unit);
    }

}

class T extends GamePiece{
    #dimensions;
    #piece_map;
    #color;
    constructor(){
        super("T");
        // this.#piece_map = [   
        //     [   [1,1,1],[0,1]  ],
        //     [   [0,1],[1,1],[0,1]  ],
        //     [   [0,1],[1,1,1]  ],
        //     [   [1],[1,1],[1] ] 
        // ] ;

        this.#piece_map = [   
            [   [1,1,1],[0,1,0] ],
            [   [0,1],[1,1],[0,1]  ],
            [   [0,1,0],[1,1,1]  ],
            [   [1,0],[1,1],[1,0] ] 
        ] ;

        
        this.#dimensions = [ [3,2], [2,3], [3,2], [2,3] ] ;

        //this.#color = "#f5983b";
        this.#color = "#800080";
    }

    get_map(){
        return this.#piece_map;
    }

    get_color(){
        return this.#color;
    }

    #get_dimensions(){
        return this.#dimensions;
    }


    get_max_x(orientation,canvas_width,unit){
        
        let width = this.get_width(orientation) * unit;
        let maximum_x = canvas_width - width;

        try {
            if (maximum_x < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_x;

    }
    
    get_max_y(orientation, canvas_height, unit){
        let height = this.get_height(orientation) * unit;

        let maximum_y = canvas_height - height;

        try {
            if (maximum_y < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_y;

    }

    get_width(orientation){
        if (orientation < 0 || orientation >= this.#dimensions.length) {
            throw new Error("Invalid orientation");
        }
        return get_width_all(orientation,this.#get_dimensions())
    }

    get_height(orientation){
        return get_height_all(orientation,this.#get_dimensions())
    }

    draw(location,orientation,x,y,unit,brick){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        location.strokeStyle = "#4f134f";
        location.lineWidth = 1;
        
        draw_shape(location,map,x,y,unit,brick);
    }

    clear(location,orientation,x,y,unit){
        let map = this.get_map()[orientation];
        clear_shape(location,map,x,y,unit);
    }

}

class Square extends GamePiece{
    #dimensions;
    #piece_map;
    #color; 
    constructor(){
        super("Square");
        this.#piece_map =   [   
            [   [1,1],[1,1]  ],
            [   [1,1],[1,1]  ],
            [   [1,1],[1,1]  ],
            [   [1,1],[1,1]  ] 
        ] ;

        //this.#dimensions = [ ] ;
        this.#dimensions = [ [2,2], [2,2], [2,2], [2,2] ] ;

        
        // this.#color = "#f0df4a";
        this.#color = "#ffff00";
    }

    get_map(){
        return this.#piece_map;
    }

    get_color(){
        return this.#color;
    }

    #get_dimensions(){
        return this.#dimensions;
    }


    get_max_x(orientation,canvas_width,unit){
        let width = this.get_width(orientation) * unit;
        let maximum_x = canvas_width - width;

        try {
            if (maximum_x < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_x;

    }
    
    get_max_y(orientation, canvas_height, unit){
        let height = this.get_height(orientation) * unit;

        let maximum_y = canvas_height - height;

        try {
            if (maximum_y < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_y;

    }


    get_width(orientation){
        return get_width_all(orientation,this.#get_dimensions())
    }

    get_height(orientation){
        return get_height_all(orientation,this.#get_dimensions())
    }

    draw(location,orientation,x,y,unit,brick){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        location.strokeStyle = "#bfb028";
        location.lineWidth = 1;
        
        draw_shape(location,map,x,y,unit,brick);
    }

    clear(location,orientation,x,y,unit){
        let map = this.get_map()[orientation];
        clear_shape(location,map,x,y,unit);
    }

}

class L extends GamePiece{
    #dimensions;
    #piece_map;
    #color;

    constructor(){
        super("L");
        // this.#piece_map =    [   
        //     [   [1],[1], [1,1] ],
        //     [   [1,1,1],[1]  ],
        //     [   [1,1],[0,1] , [0,1] ],
        //     [   [0,0,1],[1,1,1] ] 
        // ];

        this.#piece_map =    [   
            [   [1,0],[1,0], [1,1] ],
            [   [1,1,1],[1,0,0]  ],
            [   [1,1],[0,1], [0,1] ],
            [   [0,0,1],[1,1,1] ] 
        ];


        this.#dimensions = [ [2,3], [3,2], [2,3], [3,2] ];

        

        // this.#color = "#82db3d";
        this.#color = "#ff7f00";
    }

    get_map(){
        return this.#piece_map;
    }

    get_color(){
        return this.#color;
    }


    #get_dimensions(){
        return this.#dimensions;
    }


    get_max_x(orientation,canvas_width,unit){
        let width = this.get_width(orientation) * unit;
        let maximum_x = canvas_width - width;

        try {
            if (maximum_x < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_x;

    }
    
    get_max_y(orientation, canvas_height, unit){
        let height = this.get_height(orientation) * unit;

        let maximum_y = canvas_height - height;

        try {
            if (maximum_y < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_y;

    }

    get_width(orientation){
        return get_width_all(orientation,this.#get_dimensions())
    }

    get_height(orientation){
        return get_height_all(orientation,this.#get_dimensions())
    }

    draw(location,orientation,x,y,unit,brick){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        location.strokeStyle = "#945312";
        location.lineWidth = 1;
        
        draw_shape(location,map,x,y,unit,brick);
    }

    clear(location,orientation,x,y,unit){
        let map = this.get_map()[orientation];
        clear_shape(location,map,x,y,unit);
    }

}

class R extends GamePiece{
    #dimensions;
    #piece_map;
    #color;
    constructor(){
        super("R");
        // this.#piece_map = [   
        //     [   [1,1],[1], [1] ],
        //     [   [1,1,1],[0,0,1]  ],
        //     [   [0,1],[0,1],[1,1]  ],
        //     [   [1],[1,1,1] ] 
        // ]

        this.#piece_map = [   
            [   [1,1],[1,0], [1,0] ],
            [   [1,1,1],[0,0,1]  ],
            [   [0,1],[0,1],[1,1]  ],
            [   [1,0,0],[1,1,1] ] 
        ]


        this.#dimensions = [ [2,3], [3,2], [2,3], [3,2] ]
        
        //this.#color = "#8a3fcc";
        this.#color = "#3131de";
    }

    get_map(){
        return this.#piece_map;
    }

    get_color(){
        return this.#color;
    }

    #get_dimensions(){
        return this.#dimensions;
    }


    get_max_x(orientation,canvas_width,unit){
        let width = this.get_width(orientation) * unit;
        let maximum_x = canvas_width - width;

        try {
            if (maximum_x < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_x;

    }
    
    get_max_y(orientation, canvas_height, unit){
        let height = this.get_height(orientation) * unit;

        let maximum_y = canvas_height - height;

        try {
            if (maximum_y < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_y;

    }

    get_width(orientation){
        return get_width_all(orientation,this.#get_dimensions())
    }

    get_height(orientation){
        return get_height_all(orientation,this.#get_dimensions())
    }

    draw(location,orientation,x,y,unit,brick){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        location.strokeStyle = "#06067a";
        location.lineWidth = 1;
        
        draw_shape(location,map,x,y,unit,brick);
    }

    clear(location,orientation,x,y,unit){
        let map = this.get_map()[orientation];
        clear_shape(location,map,x,y,unit);
    }   

}

class Z extends GamePiece{
    #dimensions;
    #piece_map;
    #color;
    constructor(){
        super("Z");
        // this.#piece_map =    [   
        //     [   [1,1],[0,1,1] ],
        //     [   [1],[1,1],[0,1]  ],
        //     [   [1,1],[0,1,1]   ],
        //     [   [1],[1,1],[0,1]  ]
        // ]

        this.#piece_map =    [   
            [   [1,1,0],[0,1,1] ],
            [   [1,0],[1,1],[0,1]  ],
            [   [1,1,0],[0,1,1]   ],
            [   [1,0],[1,1],[0,1]  ]
        ]

        this.#dimensions = [ [3,2], [2,3], [3,2], [2,3] ];

        //this.#color = "#fcd656";
        this.#color = '#ff0000'
    }


    get_map(){
        return this.#piece_map;
    }

    get_color(){
        return this.#color;
    }

    #get_dimensions(){
        return this.#dimensions;
    }


    get_max_x(orientation,canvas_width,unit){
        let width = this.get_width(orientation) * unit;
        let maximum_x = canvas_width - width;

        try {
            if (maximum_x < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_x;

    }
    
    get_max_y(orientation, canvas_height, unit){
        let height = this.get_height(orientation) * unit;

        let maximum_y = canvas_height - height;

        try {
            if (maximum_y < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_y;

    }

    get_width(orientation){
        return get_width_all(orientation,this.#get_dimensions())
    }

    get_height(orientation){
        return get_height_all(orientation,this.#get_dimensions())
    }

    draw(location,orientation,x,y,unit,brick){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        location.strokeStyle = "#7d1919";
        location.lineWidth = 1;
        
        draw_shape(location,map,x,y,unit,brick);
    }

    clear(location,orientation,x,y,unit){
        let map = this.get_map()[orientation];
        clear_shape(location,map,x,y,unit);
    }
 
 
}

class S extends GamePiece{

    #dimensions;
    #piece_map;
    #color;
    constructor(){

        super("S");
        // this.#piece_map = [   
        //     [   [0,1,1],[1,1] ],
        //     [   [1],[1,1],[0,1]  ],
        //     [   [0,1,1],[1,1] ],
        //     [   [1],[1,1],[0,1]  ]
        // ];

        this.#piece_map = [   
            [   [0,1,1],[1,1,0] ],
            [   [1,0],[1,1],[0,1]  ],
            [   [0,1,1],[1,1,0] ],
            [   [1,0],[1,1],[0,1]  ]
        ];

        // width and height for all orientations!
        this.#dimensions = [ [3,2], [2,3], [3,2], [2,3] ];

       
        //this.#color = "#41fae7";
        this.#color = "#00ff00";
    }

    get_map(){
        return this.#piece_map;
    }

    get_color(){
        return this.#color;
    }

    #get_dimensions(){
        return this.#dimensions;
    }


    get_max_x(orientation,canvas_width,unit){
        let width = this.get_width(orientation) * unit;
        let maximum_x = canvas_width - width;

        try {
            if (maximum_x < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_x;

    }
    
    get_max_y(orientation, canvas_height, unit){
        let height = this.get_height(orientation) * unit;

        let maximum_y = canvas_height - height;

        try {
            if (maximum_y < 0){
                throw new Error();
            }
            
        } catch (error) {
            console.error("Canvas too small! Resize canvas");
        }
        
        return maximum_y;

    }

    get_width(orientation){
        return get_width_all(orientation,this.#get_dimensions())
    }

    get_height(orientation){
        return get_height_all(orientation,this.#get_dimensions())
    }

    draw(location,orientation,x,y,unit,brick){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        location.strokeStyle = "#2a9187";
        location.lineWidth = 1;
        
        draw_shape(location,map,x,y,unit,brick);
    }

    clear(location,orientation,x,y,unit){
        let map = this.get_map()[orientation];
        clear_shape(location,map,x,y,unit);
    }


}