class Piece{
    constructor(color, location){
        if(color === Color.RED || color === Color.WHITE){
            if(location instanceof BoardLocation){
                this.color = color;
                this.location = location.getCopy();
                this.exists = true;
                this.king = false;
            }else{
                throw new NO_BOARD_LOCATION_EXCEPTION;
            }
        }else{
            throw new BAD_COLOR_EXCEPTION;
        }
    }

    getColor(){
        return this.color;
    }

    insertDOM(parent){
        if(this.isExists()){
            var div = document.createElement("div");
            div.className = "piece " + this.color + (this.isKing() ? " king" : "");
            parent.appendChild(div);
        }
    }

    isExists(){
        return this.exists;
    }

    getLocation(){
        return this.location.getCopy();
    }

    setLocation(location){
        if(location instanceof BoardLocation){
            this.location = location.getCopy();
        }else{
            throw new NO_BOARD_LOCATION_EXCEPTION;
        }
    }

    remove(){
        this.exists = false;
        this.location.setNone(true);
        this.king = false;
    }

    becomeKing(){
        this.king = true;
    }

    isKing(){
        return this.king;
    }
};
