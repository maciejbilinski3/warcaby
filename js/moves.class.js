class Move{
    constructor(location){
        if(location instanceof BoardLocation){
            this.location = location.getCopy();
        }else{
            throw new NO_BOARD_LOCATION_EXCEPTION;
        }
    }

    getCopy(){
        return new Move(this.location.getCopy());
    }

    getLocation(){
        return (this.location.getCopy());
    }
};

class TakeMove extends Move{
    constructor(location, takenPiecesLocations, next, maxNextTake){
        super(location);
        this.takenPiecesLocations = [];

        if(takenPiecesLocations.length > 0){

            var self = this;
            takenPiecesLocations.forEach(function(item, index){

                if(item instanceof BoardLocation){

                    self.takenPiecesLocations.push(item.getCopy());

                }else{
                    throw new NO_BOARD_LOCATION_EXCEPTION;
                }
            });
        }

        if(typeof(next) === "boolean"){

            if(next === false){

                this.next = false;

                this.maxNextTake = 0;

            }else{
                throw new BAD_NEXT_EXCEPTION;
            }
        }else if(next instanceof Array){
            this.next = [];
            if((typeof(maxNextTake) === "number") && (Number.isInteger(maxNextTake)) && (maxNextTake >= 0)){
                this.maxNextTake = maxNextTake;
            }else
                throw new NO_NATURAL_NUMBER_EXCEPTION;

            var self = this;
            next.forEach(function(item){
                if(item instanceof TakeMove){
                    self.next.push(item.getCopy());
                }else{
                    throw new NO_BOARD_LOCATION_EXCEPTION;
                }
            });
        }else{
            throw new BAD_NEXT_EXCEPTION;
        }

    }

    getMaxNextTake(){
        return this.maxNextTake;
    }

    getTakenPiecesLocations(){
        return this.takenPiecesLocations;
    }

    getCopy(){

        var location, takenPiecesLocations=[], next, maxNextTake;
        location = this.location.getCopy();
        if(this.takenPiecesLocations.length > 0){
            this.takenPiecesLocations.forEach(function(item){
                takenPiecesLocations.push(item.getCopy());
            });
        }

        if(typeof(this.next) === "boolean"){
            next = false;
            maxNextTake = 0;
        }else{
            next = [];
            maxNextTake = this.maxNextTake;
            this.next.forEach(function(item){
                next.push(item.getCopy());
            });
        }
        return new TakeMove(location, takenPiecesLocations, next, maxNextTake);
    }
};

class PossibleMove{
    constructor(moves, piece){
        if(moves.length > 0){
            if(moves[0] instanceof TakeMove){
                this.type = MoveType.TAKE;
            }else if(moves[0] instanceof Move){
                this.type = MoveType.NORMAL;
            }else{
                throw new NO_MOVE_EXCEPTION;
            }

            this.moves = moves;

            if(piece instanceof Piece)
                this.piece = piece;
            else
                throw new NO_PIECE_EXCEPTION;
        }else
            throw new NO_POSSIBLE_MOVES;
    }

    pushNewMove(move){
        if((this.type === MoveType.TAKE && move instanceof TakeMove) || (this.type === MoveType.NORMAL && move instanceof Move)){
            this.moves.push(move);
        }else{
            throw new BAD_MOVE_TYPE;
        }
    }

    getPieceLocation(){
        return this.piece.getLocation();
    }

    getMoveType(){
        return this.type;
    }

    getAllMoves(){
        return this.moves;
    }
};

class Moves{
    constructor(){
        this.normal = [];
        this.take = [];
    }

    addNormalMove(move){
        if(move instanceof Move){
            this.normal.push(move);
        }else{
            throw new NO_MOVE_EXCEPTION;
        }
    }

    addTakeMove(takeMove){
        if(takeMove instanceof TakeMove){
            this.take.push(takeMove);
        }else{
            throw new NO_TAKE_MOVE_EXCEPTION;
        }
    }

    getCopy(){
        var normal=[], take=[];

        this.normal.forEach(function(item){
            normal.push(item.getCopy());
        });

        this.take.forEach(function(item){
            take.push(item.getCopy());
        });
    }

    hasAnyMoves(){
        return ((this.take.length + this.normal.length) > 0);
    }

    hasTakeMoves(){
        return (this.take.length > 0);
    }

    getAllTakeMoves(){
        var take = [];
        this.take.forEach(function(item, index){

            take.push(item.getCopy());
        });

        return take;
    }
};
