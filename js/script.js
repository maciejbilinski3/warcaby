window.addEventListener("load", function(){
    var game = new Game({
        boardParent: document.getElementsByTagName("main")[0],
        player1Selector: document.getElementById("player1-name"),
        player2Selector: document.getElementById("player2-name"),
        resetSelector: document.getElementById("reset"),
    });
}, false);
