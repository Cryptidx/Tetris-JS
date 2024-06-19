describe('game', function(){
    //let game;

    it('should not run when the unit is < 10', function(){
        expect(function(){
            new PieceUniverse(260,480,9,60,0);
        }).toThrowError("Unit is too small");
        
    })

    it('canvas playing space should be able to hold at least one tetromino', function(){
        expect(function(){
            new PieceUniverse(30,480,10,60,0);
        }).toThrowError("Canvas is too small");
    })

    // collission detection
    describe('when the game has a piece in the canvas', function(){
        let game;
        let piece;
        let possible_piece;
        beforeEach(function(){
            game = new PieceUniverse(260,480,20,60,0);
            piece = new I();
            game.place_piece(piece,0,100,100);
        })

        it('a straight piece immediately to its left should see this piece on its right', function(){
            possible_piece = new Square();
            expect(game.check_right(possible_piece,0,60,100)).toBeTruthy();
        })

        it('a curvy piece immediately to its left should see this piece on its right', function(){
            possible_piece = new S();
            expect(game.check_right(possible_piece,0,60,80)).toBeTruthy();
        })

        it('a straight piece immediately to its right should see this piece on its left', function(){
            possible_piece = new Square();
            expect(game.check_left(possible_piece,0,120,100)).toBeTruthy();
        })

        it('a curvy piece immediately to its right should see this piece on its left', function(){
            possible_piece = new Z();
            expect(game.check_left(possible_piece,0,100,80)).toBeTruthy();
        })

        it('a straight piece immediately to its top should see this piece on its bottom', function(){
            possible_piece = new I();
            expect(game.check_bottom(possible_piece,1,100,80)).toBeTruthy();
        })

        it('a curvy piece immediately to its top should see this piece on its bottom', function(){
            possible_piece = new Z();
            expect(game.check_bottom(possible_piece,0,100,80)).toBeTruthy();
        })

        it('a "rotated" straight game piece that may overlap with current piece should detect collision', function(){
            possible_piece = new I();

            //let result = game.check_area(possible_piece,1,80,100);
            //console.log('result of checking area straight:', result);

            expect(game.check_area(possible_piece,1,80,100)).toBeTruthy();
            expect(game.check_rotate(possible_piece,1,80,100)).toBeTruthy();
        })

        it('a "rotated" curvy game piece that may overlap with current piece should detect collision', function(){
            possible_piece = new S();

            //let result = game.check_area(possible_piece,0,60,100);
            //console.log('result of checking area curvy:', result);

            expect(game.check_area(possible_piece,0,60,100)).toBeTruthy();
            expect(game.check_rotate(possible_piece,0,60,100)).toBeTruthy();
        })

    })

    describe('when a tetromino is in edge locations', function(){
        let possible_piece;
        let max_width;
        let max_height;
        let canvas_height;
        let canvas_width;
        let canvas_unit;

        beforeEach(function(){
            game = new PieceUniverse(260,480,20,60,0);
            canvas_height = game.get_height();
            canvas_width = game.get_width();
            canvas_unit = game.unit;
            
        })

        it('a tetromino must not go outside the canvas leftmost', function(){
            possible_piece = new Square();
            expect(game.check_left(possible_piece,0,0,80)).toBeTruthy();
            
        })

        it('a tetromino with a width of 1 should recognize the most far-right it can go', function(){
            possible_piece = new I();
            max_width = possible_piece.get_max_x(0,canvas_width,canvas_unit);
            expect(game.check_right(possible_piece,0,max_width,0)).toBeTruthy();
        })

        it('a tetromino with a width of 2 should recognize the most far-right it can go', function(){
            possible_piece = new Square();
            //console.log('canvas_height: ', canvas_height,' canvas_width: ', canvas_width, ' canvas_unit: ', canvas_unit )
            max_width = possible_piece.get_max_x(0,canvas_width,canvas_unit);
            //console.log('expected_max_width:', max_width)
            expect(game.check_right(possible_piece,0,max_width,0)).toBeTruthy();
        })

        it('a tetromino with a width of 3 should recognize the most far-right it can go', function(){
            possible_piece = new T();
            max_width = possible_piece.get_max_x(0,canvas_width,canvas_unit);
            expect(game.check_right(possible_piece,0,max_width,0)).toBeTruthy();
        })

        it('a tetromino with a width of 4 should recognize the most far-right it can go', function(){
            possible_piece = new I();
            max_width = possible_piece.get_max_x(1,canvas_width,canvas_unit);
            expect(game.check_right(possible_piece,1,max_width,0)).toBeTruthy();
        })

        it('a tetromino with a height of 1 should recognize the most far-bottom it can go', function(){
            possible_piece = new I();
            max_height = possible_piece.get_max_y(1,canvas_height,canvas_unit);

            let result = game.check_bottom(possible_piece,1,0,max_height);
            //console.log('result of checking bottom:', result);
            expect(result).toBeTruthy();
        })

        it('a tetromino with a height of 2 should recognize the most far-bottom it can go', function(){
            possible_piece = new Square();
            max_height = possible_piece.get_max_y(0,canvas_height,canvas_unit);
            expect(game.check_bottom(possible_piece,0,0,max_height)).toBeTruthy();
        })

        it('a tetromino with a height of 3 should recognize the most far-bottom it can go', function(){
            possible_piece = new T();
            max_height = possible_piece.get_max_y(0,canvas_height,canvas_unit);
            expect(game.check_bottom(possible_piece,0,0,max_height)).toBeTruthy();
        })

        it('a tetromino with a height of 4 should recognize the most far-bottom it can go', function(){
            possible_piece = new I();
            max_height = possible_piece.get_max_y(0,canvas_height,canvas_unit);
            expect(game.check_bottom(possible_piece,0,0,max_height)).toBeTruthy();
        })
    })
    
    // line clearing
    describe('when there are full lines', function(){

        it('the system must successfully clear them', function(){
            // perform the line clearing 
            // then loop through the game board to see that they were 
            // actually cleared

        })

        it('the number of rows in the old game state must be the same as cleared one', function(){

        })

    })

    describe('')
})