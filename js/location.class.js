function Location(x, y){
    if((typeof(x) === "number" && typeof(y) === "number") && (Number.isInteger(x) && Number.isInteger(y)) && (x >= 0 && y >= 0)){
        this.x = x;
        this.y = y;
        this.none = false;
    }else{
        throw new NO_NATURAL_NUMBER_EXCEPTION;
    }
}

Location.prototype.setNone = function(yes){
    if(yes)
        this.none = true;
    else
        this.none = false;
}

Location.prototype.plusY = function(){
    this.y += 1;
}

Location.prototype.minusY = function(){
    this.y -= 1;
    if(this.y < 0){
        this.y += 1;
        throw new NO_NATURAL_NUMBER_EXCEPTION;
    }
}
Location.prototype.plusX = function(){
    this.x += 1;
}
Location.prototype.minusX = function(){
    this.x -= 1;
    if(this.x < 0){
        this.x += 1;
        throw new NO_NATURAL_NUMBER_EXCEPTION;
    }
}

Location.prototype.getCopy = function(){
    var l = new Location(this.x, this.y);
    l.none = this.none;
    return l;
}

Location.prototype.isSame = function(location){
    if(location === null || this.none)
        return false;
    else
        return (this.x === location.x && this.y === location.y);
}

/*****************************************************************/

function BoardLocation(x, y){
    Location.call(this, x, y);
    if(x > 8 || y > 8){
        throw new NO_BOARD_NUMBER_EXCEPTION;
    }
}

BoardLocation.prototype = Object.create(Location.prototype);
BoardLocation.prototype.plusY = function(){
    Location.prototype.plusY.call(this);
    if(this.y > 7){
        this.y = 7;
        throw new NO_BOARD_NUMBER_EXCEPTION;
    }
}
BoardLocation.prototype.plusX = function(){
    Location.prototype.plusX.call(this);
    if(this.x > 7){
        this.x = 7;
        throw new NO_BOARD_NUMBER_EXCEPTION;
    }
}
BoardLocation.prototype.getCopy = function(){
    var b = new BoardLocation(this.x, this.y);
    b.none = this.none;
    return b;
}
