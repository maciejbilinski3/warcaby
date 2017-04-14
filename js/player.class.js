class Player{
    constructor(color, name){
        if(color === Color.RED || color === Color.WHITE){
            if(typeof(name) === "string"){
                this.name = name;
                this.points = 0;
                this.pieces = [];

                try{
                    var x, y;
                    switch(color){
                        case Color.RED:
                            y = 5;
                            x = 0;
                        break;
                        case Color.WHITE:
                            y = 0;
                            x = 1;
                        break;
                    }
                    for(var i=0; i<12; i++){
                        this.pieces.push(new Piece(color, new BoardLocation(x, y)));
                        x += 2;
                        if(x > 7){
                            y += 1;
                            x = (y % 2 === 0 ? 1 : 0);
                        }
                    }
                }catch(e){
                    if((e instanceof NO_LOCATION_EXCEPTION) || (e instanceof NO_BOARD_NUMBER_EXCEPTION) || (e instanceof NO_NATURAL_NUMBER_EXCEPTION)){
                        console.log(e.getMessage() + " \n\tat 22 line in file player.class.js");
                    }else{
                        throw e;
                    }
                }
            }else{
                throw new NO_STRING_EXCEPTION;
            }
        }else{
            throw new BAD_COLOR_EXCEPTION;
        }
    }

    getName(){
        return this.name;
    }

    getPoints(){
        return this.points;
    }

    insertPieces(board){
        var self = this;
        this.pieces.forEach(function(item){
            item.insertDOM(board.getBoard().getElementsByClassName("row")[item.location.y].getElementsByClassName("field")[item.location.x]);
        });
    }

    getPieceAtLocation(location){
        if(location instanceof BoardLocation){
            var i = -1;
            this.pieces.some(function(item, index){
                if(item.getLocation().isSame(location)){
                    i = index;
                    return false;
                }
            });
            if(i !== -1)
                return this.pieces[i];
            else
                return false;
        }else{
            throw new NO_BOARD_LOCATION_EXCEPTION;
        }
    }

    hasKing(){
        var hasKing = false;
        this.pieces.some(function(item){
            if(item.isKing()){
                hasKing = true;
                return false;
            }
        });

        return hasKing;
    }
};
