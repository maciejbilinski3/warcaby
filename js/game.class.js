const ComputerReaction = 100;
class Game{
    setPlayers(player1Name, player2Name, player1Computer, player2Computer){
        try{
            this.players = [];
            this.players[0] = new Player(Color.WHITE, player1Name, player1Computer);
            this.players[1] = new Player(Color.RED, player2Name, player2Computer);
            this.activePlayerIndex = 0;
        }catch(e){
            this.players = undefined;
            throw e;
        }
    }

    constructor(params){
        this.movesWithoutTakeWithKings = 0;
        var self = this;

        function gettingStarted(){
                var type = Cookies.get("type");

                var dialog = document.createElement("dialog");
                dialog.className = "getting-started";
                dialog.style.display = "block";
                    var form = document.createElement("form");
                    form.className = "section normal";
                        var h1 = document.createElement("h1");
                        h1.innerText = "Wybierz tryb gry:";
                        var computerField = document.createElement("input");
                        computerField.className = "hidden";
                        computerField.setAttribute("type", "radio");
                        computerField.setAttribute("name", "type");
                        computerField.value = "computer";
                        computerField.id = "computerField";
                        if(type == 1) computerField.checked = true;
                        var computerLabel = document.createElement("label");
                        computerLabel.setAttribute("for", "computerField");
                            var computerIcon = document.createElement("i");
                            computerIcon.className = "fa fa-desktop";
                            computerIcon.setAttribute("aria-hidden", "true");
                        computerLabel.appendChild(computerIcon);
                        var playerField = document.createElement("input");
                        playerField.className = "hidden";
                        playerField.setAttribute("type", "radio");
                        playerField.setAttribute("name", "type");
                        playerField.value = "player";
                        playerField.id = "playerField";
                        if(type == 0) playerField.checked = true;
                        var playerLabel = document.createElement("label");
                        playerLabel.setAttribute("for", "playerField");
                            var playerIcon = document.createElement("i");
                            playerIcon.className = "fa fa-user";
                            playerIcon.setAttribute("aria-hidden", "true");
                        playerLabel.appendChild(playerIcon);
                        var button = document.createElement("button");
                        button.className = "next";
                        button.setAttribute("type", "submit");
                        button.innerText = "Dalej";
                    form.appendChild(h1);
                    form.appendChild(computerField);
                    form.appendChild(computerLabel);
                    form.appendChild(playerField);
                    form.appendChild(playerLabel);
                    form.appendChild(button);
                    form.addEventListener("submit", function(event){
                        event.preventDefault();
                        var radios = form.getElementsByTagName("input");
                        for(var i=0; i<radios.length; i++){
                            if(radios[i].checked){
                                var val = radios[i].value;
                                form.innerHTML = "";
                                var loader = document.createElement("img");
                                loader.setAttribute("src", "/img/loader.gif");
                                form.appendChild(loader);
                                switch(val){
                                    case "player":
                                        Cookies.set("type", 0, {expires: 7});
                                        var divs = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
                                                var player1Input = document.createElement("input");
                                                player1Input.setAttribute("type", "text");
                                                player1Input.setAttribute("name", "player1-name");
                                                    var player1Name = Cookies.get('player1');
                                                    if((typeof(player1Name) === "string"))
                                                        player1Input.value = player1Name;
                                                player1Input.setAttribute("placeholder", "Nazwa pierwszego gracza");
                                                divs[0].appendChild(player1Input);

                                                var player2Input = document.createElement("input");
                                                player2Input.setAttribute("type", "text");
                                                player2Input.setAttribute("name", "player2-name");
                                                var player2Name = Cookies.get('player2');
                                                if((typeof(player2Name) === "string"))
                                                    player2Input.value = player2Name;
                                                player2Input.setAttribute("placeholder", "Nazwa drugiego gracza");
                                                divs[1].appendChild(player2Input);

                                                var button = document.createElement("button");
                                                button.setAttribute("type", "submit");
                                                button.innerText = "Rozpocznij grę";
                                                divs[2].appendChild(button);
                                        form.innerHTML = "";
                                        form.appendChild(divs[0]);
                                        form.appendChild(divs[1]);
                                        form.appendChild(divs[2]);
                                        form.addEventListener("submit", function(event){
                                            event.preventDefault();

                                            var player1Name = player1Input.value, player2Name = player2Input.value;
                                            player1Name = (player1Name.length > 0 ? player1Name : "Gracz 1");
                                            player2Name = (player2Name.length > 0 ? player2Name : "Gracz 2");
                                            Cookies.set("player1", player1Name, {expires: 7});
                                            Cookies.set("player2", player2Name, {expires: 7});
                                            self.setPlayers(player1Name, player2Name, false, false);
                                            document.body.removeChild(dialog);

                                            self.start();
                                        }, false);
                                    break;
                                    case "computer":
                                        Cookies.set("type", 1, {expires: 7});
                                        var divs = [document.createElement("div"), document.createElement("div")];
                                                var player1Input = document.createElement("input");
                                                player1Input.setAttribute("type", "text");
                                                player1Input.setAttribute("name", "player1-name");
                                                    var player1Name = Cookies.get('player1');
                                                    if((typeof(player1Name) === "string"))
                                                        player1Input.value = player1Name;
                                                player1Input.setAttribute("placeholder", "Nazwa pierwszego gracza");
                                                divs[0].appendChild(player1Input);

                                                var button = document.createElement("button");
                                                button.setAttribute("type", "submit");
                                                button.innerText = "Rozpocznij grę";
                                                divs[1].appendChild(button);
                                        form.innerHTML = "";
                                        form.appendChild(divs[0]);
                                        form.appendChild(divs[1]);
                                        form.addEventListener("submit", function(event){
                                            event.preventDefault();
                                            var player1Name = player1Input.value;
                                            player1Name = (player1Name.length > 0 ? player1Name : "Gracz 1");
                                            Cookies.set("player1", player1Name, {expires: 7});
                                            self.setPlayers(player1Name, "Komputer", false, true);
                                            document.body.removeChild(dialog);

                                            self.start();
                                        }, false);
                                    break;
                                    default:
                                        var h1 = document.createElement("h1");
                                        h1.innerText = "Wystąpił błąd!";
                                        form.appendChild(h1);
                                    break;
                                }
                                break;
                            }
                        }
                    }, false);
                dialog.appendChild(form);
            document.body.appendChild(dialog);
        }

        /* BOARD CREATE */
        if(!(params.boardParent instanceof Node))
            throw new NO_NODE_EXCEPTION;
        this.board = new Board(params.boardParent);

        /* RESET EVENT */
        if(params.resetSelector instanceof Node){
            params.resetSelector.addEventListener("click", function(){
                this.players = undefined;
                gettingStarted();
            }, false);
        }

        /* PLAYERS CREATE */
        this.playersSelectors = [];
        if(params.player1Selector instanceof Node)
            this.playersSelectors.push({player: 0, selector: params.player1Selector});

        if(params.player2Selector instanceof Node)
            this.playersSelectors.push({player: 1, selector: params.player2Selector});

        gettingStarted();
    }

    reloadScore(){
        var self = this;
        this.playersSelectors.forEach(function(item){
            var score = document.createElement("span");
            score.className = "points";
            score.innerText = self.players[item.player].getPoints();
            item.selector.innerText = self.players[item.player].getName() + ": ";
            item.selector.appendChild(score);
        });
    }

    clear(){
        var selected = this.board.getBoard().getElementsByClassName("selected");
        while(selected[0])
            selected[0].classList.remove("selected");

        var possible = this.board.getBoard().getElementsByClassName("possible");
        while(possible[0]){
            var npossible = possible[0].cloneNode(true);
            possible[0].parentNode.replaceChild(npossible, possible[0]);
            npossible.location = null;
            npossible.classList.remove("possible");
        }

        var route = this.board.getBoard().getElementsByClassName("route");
        while(route[0])
            route[0].classList.remove("route");

        var point = this.board.getBoard().getElementsByClassName("point");
        while(point[0])
            point[0].classList.remove("point");
    }

    move($this){
        var takenPieces = [];
        if($this.classList.contains("point")){
            if(this.players[0].hasKing() && this.players[1].hasKing())
                this.movesWithoutTakeWithKings = 0;

            takenPieces = $this.takenPieces;
            this.players[this.activePlayerIndex].points += takenPieces.length;

            var player = this.players[(this.activePlayerIndex === 0 ? 1 : 0)];
            var self = this;
            takenPieces.forEach(function(item){
                player.pieces.some(function(piece){
                    if(piece.getLocation().isSame(item)){
                        piece.remove();
                        self.board.getBoard().getElementsByClassName("row")[item.y].getElementsByClassName("field")[item.x].firstChild.remove();
                        return false;
                    }
                });
            });
        }else{
            if(this.players[0].hasKing() && this.players[1].hasKing())
                this.movesWithoutTakeWithKings++;
        }

        var field = $this;
        var me = this.board.getBoard().getElementsByClassName("selected")[0];

        var item = me.moves.piece;
        me.remove();
        item.setLocation(field.location);
        var color = item.getColor();
        if((color === Color.RED && field.location.y === 0) || (color === Color.WHITE && field.location.y === 7))
            item.becomeKing();
        item.insertDOM(field);

        if(this.movesWithoutTakeWithKings >= 30)
            this.end(true);

        this.clear();
        this.reloadScore();
        this.changeTurn();
    }

    setPossibleTakeMoves(takeArray){
        var bestTakes = [], maxNextTake=0;
        for(var i=0; i<takeArray.length; i++){
            if(takeArray[i].getMaxNextTake() === maxNextTake){
                bestTakes.push(i);
            }else if(takeArray[i].getMaxNextTake() > maxNextTake){
                bestTakes = [i];
                maxNextTake = takeArray[i].getMaxNextTake();
            }
        }

        if(maxNextTake === 0){
            var self = this;
            for(var i=0; i<bestTakes.length; i++){
                var location = takeArray[bestTakes[i]].getLocation();
                var item = this.board.getBoard().getElementsByClassName("row")[location.y].getElementsByClassName("field")[location.x];
                item.classList.add("possible");
                item.classList.add("point");
                item.takenPieces = takeArray[bestTakes[i]].getTakenPiecesLocations();
                item.location = location;
                if(!self.players[self.activePlayerIndex].isComputer()){
                    item.addEventListener("click", function(){
                        self.move(this);
                    }, false);
                }
            }

            if(this.players[this.activePlayerIndex].isComputer()){
                setTimeout(function(){
                    var random = Math.floor(Math.random() * bestTakes.length);
                    var location = takeArray[bestTakes[random]].getLocation();
                    self.move(self.board.getBoard().getElementsByClassName("row")[location.y].getElementsByClassName("field")[location.x]);
                }, ComputerReaction);
            }
        }else{
            for(var i=0; i<bestTakes.length; i++){
                var location = takeArray[bestTakes[i]].getLocation();
                var item = this.board.getBoard().getElementsByClassName("row")[location.y].getElementsByClassName("field")[location.x];
                item.classList.add("route");
                this.setPossibleTakeMoves(takeArray[bestTakes[i]].next);
            }
        }
    }

    setPossibleMoves($this){
        this.clear();

        $this.classList.add("selected");
        if($this.moves.getMoveType() === MoveType.TAKE){
            this.setPossibleTakeMoves($this.moves.getAllMoves());
        }else{
            var self = this;
            var moves = $this.moves.getAllMoves();
            moves.forEach(function(item){
                var location = item.getLocation();
                var field = self.board.getBoard().getElementsByClassName("row")[location.y].getElementsByClassName("field")[location.x];
                field.classList.add("possible");
                field.location = location;
                field.takenPieces = [];
                if(!self.players[self.activePlayerIndex].isComputer()){
                    field.addEventListener("click", function(){
                        self.move(this);
                    }, false);
                }
            });

            if(this.players[this.activePlayerIndex].isComputer()){
                setTimeout(function(){
                    var random = Math.floor(Math.random() * moves.length);
                    var location = moves[random].getLocation();
                    self.move(self.board.getBoard().getElementsByClassName("row")[location.y].getElementsByClassName("field")[location.x]);
                }, ComputerReaction);
            }
        }
    }

    setCrossField(color, back, right, location){
        try{
            if((color === Color.WHITE && !back) || (color === Color.RED && back))
                location.plusY();
            else
                location.minusY();

            if(right)
                location.plusX();
            else
                location.minusX();

            return true;
        }catch(e){
            return false;
        }
    }

    privateGetMoves(takenPieces, location, pieceIndex, moves, back, right){
        if(this.setCrossField(this.players[this.activePlayerIndex].pieces[pieceIndex].getColor(), back, right, location) === false)
            return false;

        const row = this.board.getBoard().getElementsByClassName("row")[location.y];
        const field = row.getElementsByClassName("field")[location.x];

        if(field.hasChildNodes() && field.childNodes.length === 1){
            var pieceAtLocation = field.firstChild;
            if(pieceAtLocation.classList.contains(getOtherColor(this.players[this.activePlayerIndex].pieces[pieceIndex].getColor()))){
                var location2 = location.getCopy();
                if(this.setCrossField(this.players[this.activePlayerIndex].pieces[pieceIndex].getColor(), back, right, location2) === false)
                    return false;

                const row2 = this.board.getBoard().getElementsByClassName("row")[location2.y];
                const field2 = row2.getElementsByClassName("field")[location2.x];

                if(field2.hasChildNodes() === false){
                    var jumped = false;
                    takenPieces.some(function(item){
                        if(item.isSame(location)){
                            jumped = true;
                            return false;
                        }
                    });

                    if(!jumped){
                        var nTakenPieces = takenPieces.slice();
                        nTakenPieces.push(location.getCopy());
                        var next = this.getMoves(pieceIndex, nTakenPieces, location2);
                        if(next.hasTakeMoves() === false){
                            moves.addTakeMove(new TakeMove(location2, nTakenPieces, false));

                        }else{
                            var takeMoves = next.getAllTakeMoves();
                            var maxNextTake = 0;

                            takeMoves.forEach(function(item){
                                if(item.getMaxNextTake() > maxNextTake)
                                    maxNextTake = item.getMaxNextTake();
                            });

                            moves.addTakeMove(new TakeMove(location2, nTakenPieces, takeMoves, (maxNextTake + 1)));
                        }
                    }
                }
            }
        }else if(back === false){
            moves.addNormalMove(new Move(location));
        }
    }

    privateGetKingMoves(takenPieces, location, pieceIndex, moves, back, right){
        if(this.setCrossField(this.players[this.activePlayerIndex].pieces[pieceIndex].getColor(), back, right, location) === false)
            return false;

        loop1:
        while((location.y > -1) && (location.y < 8)){
            const row = this.board.getBoard().getElementsByClassName("row")[location.y];
            const field = row.getElementsByClassName("field")[location.x];

            if(field.hasChildNodes() && field.childNodes.length === 1){
                var pieceAtLocation = field.firstChild;
                if(pieceAtLocation.classList.contains(getOtherColor(this.players[this.activePlayerIndex].pieces[pieceIndex].getColor()))){
                    var location2 = location.getCopy();
                    if(this.setCrossField(this.players[this.activePlayerIndex].pieces[pieceIndex].getColor(), back, right, location2) === false)
                        break loop1;

                    loop2:
                    while((location2.y > -1) && (location2.y < 8)){
                        const row2 = this.board.getBoard().getElementsByClassName("row")[location2.y];
                        const field2 = row2.getElementsByClassName("field")[location2.x];
                        if(field2.hasChildNodes())
                            break loop1;
                        else{
                            var jumped = false;
                            takenPieces.some(function(item){
                                if(item.isSame(location)){
                                    jumped = true;
                                    return false;
                                }
                            });

                            if(!jumped){
                                var nTakenPieces = takenPieces.slice();
                                nTakenPieces.push(location.getCopy());
                                var next = this.getMoves(pieceIndex, nTakenPieces, location2);

                                if(next.hasTakeMoves() === false){
                                    moves.addTakeMove(new TakeMove(location2, nTakenPieces, false));
                                }else{
                                    var takeMoves = next.getAllTakeMoves();
                                    var maxNextTake = 0;

                                    takeMoves.forEach(function(item){
                                        if(item.getMaxNextTake() > maxNextTake)
                                            maxNextTake = item.getMaxNextTake();
                                    });

                                    moves.addTakeMove(new TakeMove(location2, nTakenPieces, takeMoves, (maxNextTake + 1)));
                                }
                            }
                        }

                        if(this.setCrossField(this.players[this.activePlayerIndex].pieces[pieceIndex].getColor(), back, right, location2) === false)
                            break loop2;

                    }
                    break loop1;
                }else{
                    break loop1;
                }
            }else{
                moves.addNormalMove(new Move(location));
            }

            if(this.setCrossField(this.players[this.activePlayerIndex].pieces[pieceIndex].getColor(), back, right, location) === false)
                break loop1;
        }
    }

    getMoves(pieceIndex, takenPieces, location){
        if(takenPieces === undefined)
            takenPieces = [];

        if(location === undefined)
            location = this.players[this.activePlayerIndex].pieces[pieceIndex].getLocation();

        var moves = new Moves;
        if(this.players[this.activePlayerIndex].pieces[pieceIndex].isKing()){
            this.privateGetKingMoves(takenPieces, location.getCopy(), pieceIndex, moves, false, true);
            this.privateGetKingMoves(takenPieces, location.getCopy(), pieceIndex, moves, true, true);
            this.privateGetKingMoves(takenPieces, location.getCopy(), pieceIndex, moves, true, false);
            this.privateGetKingMoves(takenPieces, location.getCopy(), pieceIndex, moves, false, false);
        }else{
            this.privateGetMoves(takenPieces, location.getCopy(), pieceIndex, moves, false, true);
            this.privateGetMoves(takenPieces, location.getCopy(), pieceIndex, moves, true, true);
            this.privateGetMoves(takenPieces, location.getCopy(), pieceIndex, moves, true, false);
            this.privateGetMoves(takenPieces, location.getCopy(), pieceIndex, moves, false, false);
        }
        return moves;
    }

    setShifting(){
        var anyMoves = false;
        var maxNextTake = -1;
        var possibleMoves = [];
        var index = 0;

        var self = this;
        this.players[this.activePlayerIndex].pieces.forEach(function(item, i){
            if(item.isExists()){
                var moves = self.getMoves(i);
                if(moves.hasAnyMoves()){
                    anyMoves = true;
                    if(moves.hasTakeMoves()){

                        moves.getAllTakeMoves().forEach(function(take){
                            if(take.getMaxNextTake() > maxNextTake){
                                maxNextTake = take.getMaxNextTake();
                                index = 0;
                                possibleMoves = [new PossibleMove([take], item)];
                            }else if(take.maxNextTake === maxNextTake){
                                if(item.getLocation().isSame(possibleMoves[index].getPieceLocation())){
                                    possibleMoves[index].moves.push(take);
                                }else{
                                    possibleMoves.push(new PossibleMove([take], item));
                                    index++;
                                }
                            }
                        });
                    }else if(maxNextTake == -1){
                        possibleMoves.push(new PossibleMove(moves.normal, item));
                        index++;
                    }
                }
            }
        });
        if(!anyMoves)
            return GameStatus.BLOCKED;
        else{
            possibleMoves.forEach(function(item){
                var location = item.getPieceLocation();
                var me = self.board.getBoard().getElementsByClassName("row")[location.y].getElementsByClassName("field")[location.x].firstChild;
                me.classList.add("shifting");
                me.moves = item;
                if(!self.players[self.activePlayerIndex].isComputer()){
                    me.addEventListener("click", function(){
                        self.setPossibleMoves(this);
                    }, false);
                }
            });
            if(this.players[this.activePlayerIndex].isComputer()){
                setTimeout(function(){
                    var random = Math.floor(Math.random() * possibleMoves.length);
                    var location = possibleMoves[random].getPieceLocation();
                    var me = self.board.getBoard().getElementsByClassName("row")[location.y].getElementsByClassName("field")[location.x].firstChild;
                    self.setPossibleMoves(me);
                }, ComputerReaction);
            }
            return GameStatus.OK;
        }
    }

    setTurn(yes){
        if(yes){
            return this.setShifting();
        }else{
            var shifting = this.board.getBoard().getElementsByClassName("shifting");
            while(shifting[0]){;
                var nshifting = shifting[0].cloneNode(true);
                shifting[0].parentNode.replaceChild(nshifting, shifting[0]); //remove all events
                nshifting.classList.remove("shifting");
            }

            return GameStatus.OK;
        }
    }

    changeTurn(){
        if(this.players[0].getPoints() >= 12){
            this.end(false);
        }else if(this.players[1].getPoints() >= 12){
            this.end(false);
        }else{
            if(this.activePlayerIndex === 0){
                this.setTurn(false);
                this.activePlayerIndex = 1;
                if(this.setTurn(true) === GameStatus.BLOCKED){
                    this.activePlayerIndex = 0;
                    this.end(false);
                }
            }else{
                this.setTurn( false);
                this.activePlayerIndex = 0;
                if(this.setTurn(true) === GameStatus.BLOCKED){
                    this.activePlayerIndex = 1;
                    this.end(false);
                }
            }
        }
    }

    start(){
        this.reloadScore();
        var self = this;
        this.players.forEach(function(player){
            player.insertPieces(self.board);
        });
        if(this.setTurn(true) === GameStatus.BLOCKED)
            this.end(false);
    }

    end(double_win){
        var winner = this.players[this.activePlayerIndex], loser = this.players[(this.activePlayerIndex === 0 ? 1 : 0)];
        this.movesWithoutTakeWithKings = 0;
        var pieces = document.getElementsByClassName("piece");
        while(pieces[0])
            pieces[0].remove();

        var dialog = document.createElement("dialog");
        dialog.style.display = "block";
        dialog.classList.add("end");
            var section = document.createElement("section");
            section.classList.add("section");
                var h2 = document.createElement("h2");
                h2.innerText = "Gra skończona!";
                var h3 = document.createElement("h3");
                var button = document.createElement("button");
                button.innerText = "Zagraj ponownie!";
                var self = this;
                button.addEventListener("click", function(){
                    dialog.remove();
                    self.setPlayers(loser.getName(), winner.getName(), loser.isComputer(), winner.isComputer());
                    self.start();
                }, false);

                section.appendChild(h2);
                section.appendChild(h3);
                section.appendChild(button);
            dialog.appendChild(section);

        if(double_win)
            h3.innerHTML = "Gra zakończyła się <span>remisem</span>!";
        else{
            if(winner.isComputer())
                h3.innerHTML = "Wygrał komputer.";
            else
                h3.innerHTML = "Wygrał gracz o nazwie: <span>"+winner.getName()+"</span>.";
        }
        document.body.appendChild(dialog);
    }
};
