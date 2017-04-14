const Color = {
    RED: "red",
    WHITE: "white"
};

function getOtherColor(color){
    if(color === Color.RED)
        return Color.WHITE;
    else if(color === Color.WHITE)
        return Color.RED;
    else
        throw new BAD_COLOR_EXCEPTION;
}
