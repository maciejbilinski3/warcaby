class Board{
    constructor(parent){
        var self = this;
        /* PRIVATE FUNCTIONS */
        function boardSize(){
            var size = document.body.getBoundingClientRect();
            if(size.width  > size.height){
                self.me.style.height = "100%";
                self.me.style.width = (self.me.getBoundingClientRect().height + "px");
            }else{
                self.me.style.width = "100%";
                self.me.style.height = (self.me.getBoundingClientRect().width + "px");
            }
        }

        /* EVENTS */
        window.addEventListener("resize", boardSize, false);

        /* BOARD CREATE */
        var board = document.createElement("section");
        board.className = "board";

        var light = true;
        for(var y=0; y<8; y++){
            var row = document.createElement("div");
            row.className = "row";
            row.y = y;
            for(var x=0; x<8; x++){
                var field = document.createElement("div");
                field.className = ("field " + (light ? "light" : "dark"));
                field.x = x;
                light = !light;

                row.appendChild(field);
            }
            light = !light;

            board.appendChild(row);
        }

        this.me = parent.appendChild(board);
        boardSize();
    }

    getBoard(){
        return this.me;
    }
};
