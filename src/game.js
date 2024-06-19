"use strict";
let main_canvas;
let main_context;
let piece_canvas;
let piece_context;
let grid_context;

// a standard block size is 20 by 20
let position_x = 80;
let position_y = 400;

// width 260 (13 in array)
// height 480 (24 in array)

// we want the system to be ready. This fires init to start the game process.

window.onload = init;

function init(){
    // Get a reference to the canvas
    piece_canvas = document.getElementById('piece-canvas');
    piece_context = piece_canvas.getContext('2d');

    main_canvas = document.getElementById('main-canvas');
    main_context = main_canvas.getContext('2d');

    grid_context = document.getElementById('grid-canvas');
    grid_context = grid_context.getContext('2d');


    draw_bg(main_context);

    draw_grid(grid_context);

    let se = new Square();

    // let max_x = get_max_x(se.get_width(0),10,20);
    // console.log(`maximum x val for an I piece is ${max_x}`);
    // let te = new T();
    // // draw(location,orientation,x,y,unit)
    //se.draw(piece_context,0,position_x,380,20);
    //  //se.clear(piece_context,0,position_x,380,20);
    // te.draw(piece_context,0,100,380,20);
    

    //se.clear(piece_context,0,position_x,380,20);
    //se.clear(piece_context,0,position_x,position_y,20)
    
    let piece_uni = new PieceUniverse(260, 480, 20, 240, 20);

    piece_uni.place_piece(se,0,60,80);

    console.log(JSON.stringify(piece_uni.get_board()));
    
    // draw_T(piece_context,position_x,position_y);

    // draw_I(piece_context,180,position_y);
}

// Top level fxns
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

function draw_shape(location,map,x,y,unit){

    let j = 0
    for(const y_coord of map){
        let i = 0
        for(const x_coord of y_coord){
            if (x_coord === 1){
                location.fillRect(x+ i, y + j, unit,unit);

                // figure out the bricks later
                //location.strokeRect(x + i, y + j, unit,unit);
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
    //console.log('orientation:', orientation, 'x_y:', x_y); 
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

    for( let i = 0; i<arr.length; i++){
        if(arr[i] == 0){
            // it isn't full, there is a space
            return false
        }
    }

    return true
}

function paste_GS_to_screen(board, location, unit){
    // to paste an updated game state to the board
    // this assumes a [     [ 0, color ], 
    //                      [ 0, color ]
//                                  ]

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

    let full_rows = [];
    for(let i = 0; i < board.length ; i--){
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
    let old_length = board.length;

    let row_width = board[0].length;
    let num_empty_rows = 0;

    // loop backwards in full rows
    for(let i = full_rows.length - 1; i>=0 ; i--){
        // if the row is full, clear it through splicing
        // because we are assuming that a splice brings all the rows before
        // it down. (we need to chec that tho)

        board.splice(full_rows[i] + num_empty_rows,1);
        // increment a counter (for the empty rows we will add on top)
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

        this.#current_x_and_y = [];
        this.#current_x_and_y[0] = starting_x;
        this.#current_x_and_y[1] = starting_y;

        // have a function to pick a random orientation
        // and a random piece
        this.#current_orientation = 0;
        this.#current_piece = new I();


        // this is an array Of 2 only
        this.#next_piece_with_orientation = [];

        // then use a function to 
        // fill the piece array
        this.#fill_game_board(width,height,unit);

        this.#possible_pieces = [I,Square,T,L,R,Z,S];
        this.#possible_rotations = [0,1,2,3];
    }

    // testing functions ( to help with testin )
    // TODO delete them

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

    get_current_coord(){
        return this.#current_x_and_y;
    }

    /////////


    reset_x_and_y(){
        // reset x and y coordinates to original set ones
        // for each new game
        this.#current_x_and_y = this.starting_x_and_y;
    }

    get_width(){
        return this.width_and_height[0];
    }

    get_height(){
        return this.width_and_height[1];
    }

    update_lines(new_lines){
        // not tested

        // increment by 1
        this.#lines += new_lines;

        // make change on screen
        document.getElementById("lines").textContent = this.#lines;
    }

    update_score(new_score){
        // not tested


        // increment by 1
        this.#score += new_score;

        // make change on screen
        // quite literaly changing the score in the html
        document.getElementById("score").textContent = this.#score;
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

    random_current_piece(){
        // should be used to change next piece 
        

        // let gamepiece = getRandomElement(this.#possible_pieces);
        // this.#current_piece = new gamepiece();

        this.#next_piece_with_orientation[0] = getRandomElement(this.#possible_pieces);
    }

    random_current_orientation(){
        // should be used to change next piece 

        // this.#current_orientation = getRandomElement(this.#possible_rotations);

        this.#next_piece_with_orientation[1] = getRandomElement(this.#possible_rotations);
    }

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

        if (main_x <= 0){
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
                try {
                    throw new Error()
                } catch (error) {
                    console.error("There is a problem");
                }
            }

            x = x + start_x;

            if (x - 1 >= this.get_width() / this.unit || x - 1 < 0){
                // then where we want to move to is out of range
                // this means, we are at an edge location
                console.log(x-1, " is out of bounds");
                return true
            }


            let board = this.#Game_Board;
            if(board[i+start_y][x-1][0] == 1){
                // then that place is occupied
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
        //console.log('actual max_width', check)
        if (main_x >= check){
            return true
        }

        let gamepiece_map = piece.get_map()[orientation];

        let start_x = main_x/this.unit;
        let start_y = main_y/this.unit;

        for(let i=0; i < gamepiece_map.length; i++){
            //console.log('array in question:', JSON.stringify(gamepiece_map));
            let x = find_last_1(gamepiece_map[i]) ;

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


            if (x + 1 >= this.get_width() / this.unit || x + 1 < 0){
                // then where we want to move to is out of range
                // this means, we are at an edge location
                console.log(x+1, " is out of bounds");
                return true
            }

            let board = this.#Game_Board;
            if(board[i+start_y][x+1] != 0){
                // then that place is occupied
                return true;
            }

        }

        return false;

    }

    check_bottom(piece, orientation, x, y){
        // for check bottom, we literally check the 
        // bottom boundary, 1 step to the bottom of the pice

        // we make sure to check for out of bound errors within piece
        // contextg

        // we make sure to handle out of bound errors when going one to the bottom
        // (so no out of bounds in the piece array!)

        // if 0, just check
        // if 1, move a step down

        if (y >= piece.get_max_y(orientation,this.get_height(),this.unit)){
            return true
        }


        let gamepiece_map = piece.get_map()[orientation];

        let start_x = x/this.unit;
        let start_y = y/this.unit;

        let end_y = gamepiece_map.length - 1
        let last_row = gamepiece_map[end_y];

        let board = this.#Game_Board;

        for(let i = 0; i < last_row.length; i++){
            console.log('this is the last row of ', piece.name, '"s piece map: ', last_row);
            if(last_row[i] == 0){
                if(board[start_y+end_y][start_x + i] != 0){
                    return true;
                }
            }

            if (start_y+end_y+ 1 >= this.get_height()/this.unit){
                // last row[i] == 1  
                console.log(start_y+end_y+1, " is out of bounds");
                return true 
            }  

            if(board[start_y+end_y+ 1][start_x + i] != 0){
                return true;
            }
        }

        return false;
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

        if(this.check_left(piece, orientation,x,y)){
            return true;
        }

        else if(this.check_right(piece, orientation,x,y)){
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
        let map = piece.get_map()[orientation];
        let color = piece.get_color();

        partial_fill_game_board(new_x,new_y,map,this.#Game_Board,color);
    }

    draw_piece(location,piece,orientation,x,y){
        // only used in the beginning (after a piece is stuck from 
        // move down)

        piece.draw(location,orientation,x,y);
    }

    move_down(location,piece,orientation,x,y){
        // look at the subsequent movement
        let can_move = this.check_bottom(piece, orientation, x, y);
        // if we can move
        if(can_move){
            // clear where we are
            piece.clear(location,orientation,x,y,this.unit);

            //draw the new one 
            piece.draw(location,orientation,x,y+this.unit,this.unit);

            // update teh coords
            this.update_coords(x,y+this.unit);

            return 0;
        }

        //if we can't then we are stuck
        // the piece remains in its original location (doesnt get redrawn)
        // then we add that piece to the gamestate (we are permanent)

        place_piece(piece,orientation, x, y);
        // because we are stuck
        // we trigger checks for line clearing
        // or game over
        // we also triggr the arrival of a new piece
        return 1;
    }

    move_left(location,piece,orientation,x,y){
        // look at the subsequent movement

        let can_move = this.check_left(piece, orientation, x, y);
        // if we can move

        if(can_move){
            // clear where we are
            piece.clear(location,orientation,x,y,this.unit);

            //draw the new one 
            piece.draw(location,orientation,x-this.unit,y,this.unit);

            // update teh coords
            this.update_coords(x-this.unit,y);
        }

        // else we can't move any further, do not perform 
        // redrawing action
        //return 0;
    }

    move_right(location,piece,orientation,x,y){
        // look at the subsequent movement
        let can_move = this.check_right(piece, orientation, x, y);
        // if we can move

        if(can_move){
            // clear where we are
            piece.clear(location,orientation,x,y,this.unit);

            //draw the new one 
            piece.draw(location,orientation,x+this.unit,y,this.unit);

            // update teh coords
            this.update_coords(x+this.unit,y);
        }

        // else we can't move any further, do not perform 
        // redrawing action
    
    }

    rotate_piece(location,piece,orientation,x,y){
        // given the current orientation, look at the next one and see 
        // if it is possible 

        // look at the subsequent movement
        let can_move = this.check_rotate(piece, (orientation+1)%4, x, y);
         // if we can move
 
        if(can_move){
             // clear where we are
             piece.clear(location,orientation,x,y,this.unit);
 
             //draw the new one 
             piece.draw(location,(orientation+1)%4,x,y,this.unit);
 
             // update the orientation. Coords should remain same
             this.update_orientation();
        }
 
         // else we can't move any further, do not perform 
         // redrawing action
    }

    clear_lines(board,location,unit){
        // we do this if move down returns 1
        // becuase that means we are stuck
    
    
        // first check the board for full rows indices
        // save them in a variabel
        full_rows = find_full_rows(board);
    
        // perform the 'animation' on these full row indices
    
        // there will likely be a pause/ timing to do this
    
        //do the update game state function. 
        paste = update_GS(board,full_rows);
    
        // if it returns 1 (changes were made) then do the paste to screen function
        if(paste){
            // to imitate the line clearing
            paste_GS_to_screen(board,location,unit);
            // then we change the score on screen
            this.update_lines(full_rows.length);
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
        this.#piece_map = [   
            [   [1],[1],[1],[1] ],
            [   [1,1,1,1]   ],
            [   [1],[1],[1],[1]  ],
            [   [1,1,1,1]   ]   
        ];
        
        this.#dimensions = [ [1,4], [4,1], [1,4], [4,1] ];

        this.#color = "#4290f5";
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

    draw(location,orientation,x,y,unit){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        // supposed to be bricks but we are scrapping these
        // location.strokeStyle = "#2765b8";
        // location.lineWidth = 2;
        
        draw_shape(location,map,x,y,unit);
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
        this.#piece_map = [   
            [   [1,1,1],[0,1]  ],
            [   [0,1],[1,1],[0,1]  ],
            [   [0,1],[1,1,1]  ],
            [   [1],[1,1],[1] ] 
        ] ;

        
        this.#dimensions = [ [3,2], [2,3], [3,2], [2,3] ] ;

        this.#color = "#f5983b";
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

    draw(location,orientation,x,y,unit){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        // location.strokeStyle = "#bf7122";
        // location.lineWidth = 2;
        
        draw_shape(location,map,x,y,unit);
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

        this.#color = "#f0df4a";
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

    draw(location,orientation,x,y,unit){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        // location.strokeStyle = "#bfb028";
        // location.lineWidth = 2;
        
        draw_shape(location,map,x,y,unit);
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
        this.#piece_map =    [   
            [   [1],[1], [1,1] ],
            [   [1,1,1],[1]  ],
            [   [1,1],[0,1] , [0,1] ],
            [   [0,0,1],[1,1,1] ] 
        ];

        this.#dimensions = [ [2,3], [3,2], [2,3], [3,2] ];
        this.#color = "#82db3d";
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

    draw(location,orientation,x,y,unit){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        // location.strokeStyle = "#42850f";
        // location.lineWidth = 2;
        
        draw_shape(location,map,x,y,unit);
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
        this.#piece_map = [   
            [   [1,1],[1], [1] ],
            [   [1,1,1],[0,0,1]  ],
            [   [0,1],[0,1],[1,1]  ],
            [   [1],[1,1,1] ] 
        ]

        this.#dimensions = [ [2,3], [3,2], [2,3], [3,2] ]

        this.color = "#8a3fcc";
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

    draw(location,orientation,x,y,unit){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        // location.strokeStyle = "#55198a";
        // location.lineWidth = 2;
        
        draw_shape(location,map,x,y,unit);
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
        this.#piece_map =    [   
            [   [1,1],[0,1,1] ],
            [   [0,1],[1,1]  ],
            [   [1,1],[0,1,1]   ],
            [   [0,1],[1,1] ] 
        ]

        this.#dimensions = [ [3,2], [2,3], [3,2], [2,3] ];
        this.#color = "#fcd656";
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

    draw(location,orientation,x,y,unit){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        // location.strokeStyle = "#7d1919";
        // location.lineWidth = 2;
        
        draw_shape(location,map,x,y,unit);
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
        this.#piece_map = [   
            [   [0,1,1],[1,1] ],
            [   [1],[1,1],[0,1]  ],
            [   [0,1,1],[1,1] ],
            [   [1],[1,1],[0,1]  ]
        ];

        // width and height for all orientations!
        this.#dimensions = [ [3,2], [2,3], [3,2], [2,3] ];
        this.#color = "#41fae7";
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

    draw(location,orientation,x,y,unit){
        // specifices the orientation, color and color oiutline

        let map = this.get_map()[orientation];
        location.fillStyle = this.#color;

        // location.strokeStyle = "#2a9187";
        // location.lineWidth = 2;
        
        draw_shape(location,map,x,y,unit);
    }

    clear(location,orientation,x,y,unit){
        let map = this.get_map()[orientation];
        clear_shape(location,map,x,y,unit);
    }


}