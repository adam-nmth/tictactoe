$(document).ready(function(){
  $(".playground").hide();
  var rand = 0;
  rand = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  var player = "";
var computer = "";

var turn = "";
//array of square IDs and values;
var squareIDs = ["square1,square2,square3,square4,square5,square6,square7,square8,square9"];
var values = ["value1","value2","value3","value4","value5","value6","value7","value8","value9"];

var valueMatrix = [["value1","value2","value3"],["value4","value5","value6"],["value7","value8","value9"]];
var diagonalMatrix = [["value1","value5","value9"],["value3","value5","value7"]];
  
//start page
$("#o").on("click",function(){
  $(".popup").remove();
  $(".playground").show();
  $(".table").css("padding-top","0px");
  player = "O";
  computer = "X";
  var doc = document.getElementById(values[rand])
  doc.value = computer;
  doc.innerHTML = computer;
  $("#"+values[rand]).hide().fadeIn("slow");
  turn = player;
});
$("#x").on("click",function(){
  $(".popup").remove();
  $(".playground").show();
  $(".table").css("padding-top","0px");
  player = "X";
  computer = "O";
  var doc = document.getElementById(values[rand])
  doc.value = computer;
  doc.innerHTML = computer;
  $("#"+values[rand]).hide().fadeIn("slow");
  turn = player;
});
  
//squares
$("#square1").on("click",function(){
 squares("value1");
})

$("#square2").on("click",function(){
 squares("value2");
})

$("#square3").on("click",function(){
 squares("value3");
})

$("#square4").on("click",function(){
 squares("value4");
})

$("#square5").on("click",function(){
 squares("value5");
})

$("#square6").on("click",function(){
 squares("value6");
})

$("#square7").on("click",function(){
 squares("value7");
})

$("#square8").on("click",function(){
 squares("value8");
})

$("#square9").on("click",function(){
 squares("value9");
})

var winnerVals = [];
var winSide = "";
//sweep through map function
function sweepThrough(){
  
  //tie method
  var ties=[];
  values.forEach(function(name){
    
      var doc = document.getElementById(name);
      if(doc.value!==undefined){
          ties.push(doc.value);
      }
  
  })
  if(ties.length===9){
    $("#result").html("<h2>It's a tie!</h2>").hide().fadeIn("slow");
    setTimeout(function(){
          restart();
        },1500)
           
    setTimeout(function(){
    intelligence();
}, 2000);
  }
  
  for(var i=0;i<valueMatrix.length;i++){
    var statusRow = [];
    var fieldRow = [];
    var statusCol = [];
    var fieldCol = [];
    var wins = 0;
    for(var j=0;j<valueMatrix[i].length;j++){
      var row = document.getElementById(valueMatrix[i][j]);
      var col = document.getElementById(valueMatrix[j][i]);
      if(row.value==="X"||row.value==="O"){
        statusRow.push(row.value);
        fieldRow.push(valueMatrix[i][j])
      };
      if(col.value==="X"||col.value==="O"){
        statusCol.push(col.value);
        fieldCol.push(valueMatrix[j][i])
      };
    }
 if(statusRow.length===3&&statusRow[0]===statusRow[1]&&statusRow[1]===statusRow[2]){
     wins = 1;
   winnerVals.push(fieldRow);
   winSide = document.getElementById(fieldRow[0]).innerHTML;
      }
 if(statusCol.length===3&&statusCol[0]===statusCol[1]&&statusCol[1]===statusCol[2]){
     wins = 1;
   winnerVals.push(fieldCol);
   winSide = document.getElementById(fieldCol[0]).innerHTML;
      }
    if(wins>0){
      return true;
    }
  };
  var diagonalWin = 0;
  var diagObj = new Object();
  diagonalMatrix.forEach(function(name){
  var diagonalLine=[];
  var diagonalValues = [];
  name.forEach(function(id){
    
    var doc = document.getElementById(id);
    if(doc.value==="X"||doc.value==="O"){
      diagonalLine.push(doc.value);
      diagonalValues.push(id);
    }
  })
  if(diagonalLine.length===3&&diagonalLine[0]===diagonalLine[1]&&diagonalLine[1]===diagonalLine[2]){
    winnerVals.push(diagonalValues);
    winSide = document.getElementById(diagonalValues[0]).innerHTML;
    diagonalWin = 1;
    return true;
  }
})
  if(diagonalWin>0){
    return true;
  }
}


//AI function
function intelligence(){
  
  if(sweepThrough()){
    if(winSide===computer){
          $("#result").append("<h2>Winner: <span style=\"color:red\">Computer</span>!</h2>").hide().fadeIn("slow");
    winnerVals[0].forEach(function(name){
     $("#"+name).css("animation","mymove1 3s"); 
      $("#"+name).css("color","red");
    })
  }else if(winSide===player){
    $("#result").append("<h2>Winner: <span style=\"color:green\">Player</span>!</h2>").hide().fadeIn("slow");
    winnerVals[0].forEach(function(name){
     $("#"+name).css("animation","mymove2 3s"); 
      $("#"+name).css("color","green");
    })
  }
        setTimeout(function(){
          restart();
        },1000);
        
    setTimeout(function(){
    intelligence();
}, 4000);
  }else{
    if(turn===computer){
   var finalPlaces = new Object();
      
    for(var i=0;i<valueMatrix.length;i++){
      
    var  strategyRow = new Object(),
         strategyCol = new Object();
      
    for(var j=0;j<valueMatrix[i].length;j++){
      
      var row = document.getElementById(valueMatrix[i][j]);
      var col = document.getElementById(valueMatrix[j][i]);
      //row scores
     if(row.value===undefined){
       strategyRow[valueMatrix[i][j]] = 0;
     }else if(row.value===player){
       strategyRow[valueMatrix[i][j]] = 3;
     }else if (row.value===computer){
       strategyRow[valueMatrix[i][j]] = 5;
     }
    //col scores
     if(col.value===undefined){
       strategyCol[valueMatrix[j][i]] = 0;
     }else if(col.value===player){
       strategyCol[valueMatrix[j][i]] = 3;
     }else if (col.value===computer){
       strategyCol[valueMatrix[j][i]] = 5;
     } 
       } 
      //scoring the rows
      var firstCheck = 0,
          potField = new Object();
      var scoredField = new Object();
      
      for(var place in strategyRow){
        if(strategyRow[place]===0){
          firstCheck++;
          potField[place] = 0;
        }else if(strategyRow[place]===3){
          scoredField[place] = 3;
        }else if(strategyRow[place]===5){
          scoredField[place] = 5;
        }
      }
      
     if(firstCheck===2){
       for(var add in potField){
         for(var score in scoredField){
           potField[add]+=scoredField[score];
         }   
       }
     }else if(firstCheck===1){
       var points = 0;
       for(var score in scoredField){
         points+=scoredField[score];
       }
       if(points===8){
         potField[Object.keys(potField)[0]]+=1;
       }else if(points===6){
         potField[Object.keys(potField)[0]]+=9;
       }else if(points===10){
         potField[Object.keys(potField)[0]]+=15;
       }
     }
      //scoring the columns
      var secondCheck = 0,
          potCol = new Object(),
          scoredCol = new Object();
      
      for(var place in strategyCol){
        if(strategyCol[place]===0){
          secondCheck++;
          potCol[place] = 0;
        }else if(strategyCol[place]===3){
          scoredCol[place] = 3;
        }else if(strategyCol[place]===5){
          scoredCol[place] = 5;
        }
      }
      if(secondCheck===2){
       for(var add in potCol){
         for(var score in scoredCol){
           potCol[add]+=scoredCol[score];
         }   
       }
     }else if(secondCheck===1){
       var points = 0;
       for(var score in scoredCol){
         points+=scoredCol[score];
       }
       if(points===8){
         potCol[Object.keys(potCol)[0]]+=1;
       }else if(points===6){
         potCol[Object.keys(potCol)[0]]+=9;
       }else if(points===10){
         potCol[Object.keys(potCol)[0]]+=15;
       }
     }
       
//adding the scores, row, col, diagonal
      for(var pos in potField){
        if(finalPlaces.hasOwnProperty(pos)){
          finalPlaces[pos]+=potField[pos];
        }else{
          finalPlaces[pos] = potField[pos];
        }
      };
      
      for(var pos in potCol){
        if(finalPlaces.hasOwnProperty(pos)){
          finalPlaces[pos]+=potCol[pos];
        }else{
          finalPlaces[pos] = potCol[pos];
        }
      }  
    } 
      
            //diagonal sweep
      
      diagonalMatrix.forEach(function(name){
        
       var diagonalScores = new Object();
        
       name.forEach(function(id){
         var diag = document.getElementById(id);
         if(diag.value===undefined){
           diagonalScores[id] = 0;
         }else if (diag.value===player){
           diagonalScores[id] = 3;
         }else if (diag.value===computer){
           diagonalScores[id] = 5;
         }
       });
        
        var thirdCheck = 0,
          potDiag = new Object(),
          scoredDiag = new Object();
        
        for(var place in diagonalScores){
        if(diagonalScores[place]===0){
          thirdCheck++;
          potDiag[place] = 0;
        }else if(diagonalScores[place]===3){
          scoredDiag[place] = 3;
        }else if(diagonalScores[place]===5){
          scoredDiag[place] = 5;
        }
      }
        
      if(thirdCheck===2){
       for(var add in potDiag){
         for(var score in scoredDiag){
           potDiag[add]+=scoredDiag[score];
         }   
       }
     }else if(thirdCheck===1){
       var points = 0;
       for(var score in scoredDiag){
         points+=scoredDiag[score];
       }
       if(points===8){
         potDiag[Object.keys(potDiag)[0]]+=1;
       }else if(points===6){
         potDiag[Object.keys(potDiag)[0]]+=9;
       }else if(points===10){
         potDiag[Object.keys(potDiag)[0]]+=15;
       }
     }
       
        for(var pos in potDiag){
        if(finalPlaces.hasOwnProperty(pos)){
          finalPlaces[pos]+=potDiag[pos];
        }else{
          finalPlaces[pos] = potDiag[pos];
        }
      }  
        
      }); 
    var finalDecision = Object.keys(finalPlaces).map(function(key) {
      return finalPlaces[key]; 
    });
      var nextMovee = Math.max.apply(null, finalDecision);
      var winPlace = [];
      
      for(var the in finalPlaces){
        if(finalPlaces[the]===nextMovee){
           winPlace.push(the);
        }
      }
      
      if(nextMovee===0){
        var numrand = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    var nextMove = document.getElementById(values[numrand]);
    nextMove.value = computer;
    nextMove.innerHTML = computer;
     $("#"+values[numrand]).hide().fadeIn("slow"); 
      }else if(winPlace.length===1){
        
        var winnerDoc = document.getElementById(winPlace[0]);
    winnerDoc.value = computer;
    winnerDoc.innerHTML = computer;
     $("#"+winPlace[0]).hide().fadeIn("slow");
      }else if(winPlace.length>1){
        var numrand = Math.floor(Math.random() * (winPlace.length)) + 0;
        var winnerDoc = document.getElementById(winPlace[numrand]);
    winnerDoc.value = computer;
    winnerDoc.innerHTML = computer;
     $("#"+winPlace[numrand]).hide().fadeIn("slow");
      }
  
      if(sweepThrough()){
        if(winSide===computer){
          $("#result").append("<h2>Winner: <span style=\"color:red\">Computer</span>!</h2>").hide().fadeIn("slow");
    winnerVals[0].forEach(function(name){
     $("#"+name).css("animation","mymove1 3s"); 
      $("#"+name).css("color","red");
    })
  }else if(winSide===player){
    $("#result").append("<h2>Winner: <span style=\"color:green\">Player</span>!</h2>").hide().fadeIn("slow");
    winnerVals[0].forEach(function(name){
     $("#"+name).css("animation","mymove2 3s"); 
      $("#"+name).css("color","green");
    })
  }
        setTimeout(function(){
          restart();
        },1500)
     
        if(winSide===computer){
  turn = player;
}else if(winSide===player){
  turn = computer;
};
     
    setTimeout(function(){
    intelligence();
      winSide="";
}, 4000);
  }else{
     turn = player;
  }
   
  }
  } 
}

//restart method
  function restart(){
    $("#result").fadeOut(2000);
    setTimeout(function(){
      $("#result").empty();
    }, 2100);
    
    values.forEach(function(name){
    var doc = document.getElementById(name)
      doc.value = undefined;
      winnerVals = [];
     
    $("#"+name).css("animation","");
    
   $("#"+name).fadeOut(1300);
    setTimeout(function(){
      doc.innerHTML = "";
      $("#"+name).css("color","white");
     }, 1400);
  }, 200)
  }

//squares function
function squares(square){
  var info = document.getElementById(square);
  if(info.value===undefined && turn === player){
    $("#"+square).append(player).hide().fadeIn("slow");
    info.value = player;
    turn = computer;
   setTimeout(function(){
      intelligence();
   }, 600);
  }
}
})


