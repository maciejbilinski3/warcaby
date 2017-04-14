class Exception{
    constructor(message){
        this.message = message;
    }

    getMessage(){
        return this.message;
    }
};

class NO_NATURAL_NUMBER_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not natural number <0; ∞>!");
    }
};

class NO_NODE_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not of type Node!");
    }
};

class NO_BOARD_NUMBER_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not natural board number <0; 7>!");
    }
};

class BAD_COLOR_EXCEPTION extends Exception{
    constructor(){
        super("Bad color! You have to use enum \"Color\"!");
    }
};

class NO_LOCATION_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not of type Location!");
    }
};

class NO_BOARD_LOCATION_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not of type BoardLocation!");
    }
};

class NO_STRING_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not a text!");
    }
};

class NO_MOVE_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not of type Move!");
    }
};

class NO_PIECE_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not of type Piece!");
    }
};

class NO_POSSIBLE_MOVES extends Exception{
    constructor(){
        super("You have not any possible moves! (\"moves\" array is empty)");
    }
};

class BAD_MOVE_TYPE extends Exception{
    constructor(){
        super("Your move can't be pushed! It has not same type like other moves!");
    }
};

class NO_TAKE_MOVE_EXCEPTION extends Exception{
    constructor(){
        super("Your variable is not of type TakeMove!");
    }
};

class BAD_NEXT_EXCEPTION extends Exception{
    constructor(){
        super("\"next\" argument should be false or Array of type Location!")
    }
};
