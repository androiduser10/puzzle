var puzzle = [];
var boardPiece = [];

window.onload = function() {
    puzzle = $$("#puzzlearea div");
    var row = 0, right = 0, top = 0;
    
    for (var i=0; i<puzzle.length; i++) {
        puzzle[i].addClassName("puzzlepiece");
        puzzle[i].style.float = "left";
        puzzle[i].style.backgroundSize = "400px 400px";
        
        boardPiece[i] = [];
        boardPiece[i][0] = right;
        boardPiece[i][1] = top;
        
        puzzle[i].style.backgroundPosition = "-"+boardPiece[i][0]+"px"-boardPiece[i][1]+"px";
        row ++;
        if (row ===4) {
            top +=100; right = 0; row = 0;
        }
        else{
            right +=100;
        }
    }
    
    var freemove = document.createElement("div");
    $("puzzlearea").appendChild(freemove);
    empSpace(freemove);
    
    puzzle = $$("puzzlearea div");
    $("shufflebutton").observe('click',shufflePuzzle);
    shiftpiece();
};

var empSpace = function(n) {
    n.removeClassName("moveablepiece");
    n.addClassName("puzzlepiece");
    n.style.float = "left";
    n.style.backgroundImage = "none";
    n.style.border = "2px solid white";
};

var background_position = function(piece,item) {
    piece.style.backgroundPosition = "_"+boardPiece[item-1][0]
}

var imgPiece = function(pic) {
    pic.addClassName("puzzlepiece");
    pic.style.border = "2px solid black";
    pic.style.backgroundImage = "url(background.jpg)";
    pic.style.backgroundSize = "400px 400px";
};

function shufflePuzzle() {
    var numArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    for (var i=puzzle.length; i>0; i) {
        var j = Math.floor(Math.random() * i);
        var a = numArray[--i];
        var samp = numArray[j];
        if (samp =="0") {
            puzzle[i].addClassName("puzzlepiece");
            empSpace(puzzle[i]);
            puzzle[i].innerHTML = "";
        }
        else {
            puzzle[i].innerHTML = numArray[j];
            imgPiece(puzzle[i]);
            background_position(puzzle[i],samp);
        }
        numArray[j] = a;
    }
    sidepiece();
}

var adjust = function(piece) {
    puzzle[piece].addClassName("movablepiece");
};

var shiftpiece = function() {
    var move = this.innerHTML;
    var non = this.hasClassName('movablepiece');
    var blank = 0;
    if (non) {
        for (var i=0; i<puzzle.length; i++){
            blank = puzzle[i].innerHTML;
            if (puzzle[i].innerHTML == ""){
                puzzle[i].innerHTML = move;
                this.innerHTML = blank;
                
                imgPiece(puzzle[i]);
                empSpace(this);
                
                sidepiece();
                background_position(puzzle[i],move);
            }
        }
    }
}

var sidepiece = function(){
    for (var i=0; i<puzzle.length; i++){
        puzzle[i].removeClassName("movablepiece"); 
        
    }
        for (var i=0; i<puzzle.length; i++) {
            if (puzzle[i].innerHTML == ""){
                puzzle[i].removeClassName("movablepiece");
                
                switch(i){
                    case 0:
                        adjust(i+1);
                        adjust(i+4);
                        break;
                        
                    case 1:
  					case 2:
  						adjust(i-1);
  						adjust(i+1);
        				adjust(i+4);
  						break;
  					
  					case 3:
  						adjust(i-1);
  						adjust(i+4);
  						break;
  					
  					case 4:
  						adjust(i-4);
  						adjust(i+4);
  						adjust(i+1);
  						break;
  					
  					case 5:
  					case 6:
  					case 9:
  					case 10:
  						adjust(i-4);
  						adjust(i+4);
  						adjust(i+1);
  						adjust(i-1);
              			break;
              			
  					case 7: 
  					case 11:
  						adjust(i-4);
  						adjust(i+4);
  						adjust(i-1);
              					break;
  					case 8:
  						adjust(i-4);
  						adjust(i+1);
  						adjust(i+4);
  						break;
  					case 12:
  						adjust(i-4);
  						adjust(i+1);
  						break;
  					case 13: 
  					case 14:
  						adjust(i-4);
  						adjust(i-1);
  						adjust(i+1);
  						break;
  					case 15:
  						adjust(i-4);
  						adjust(i-1);
  						break;
                }
            }
            puzzle[i].observe('click',shiftpiece);
    }
}