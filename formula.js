for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
      cell.addEventListener("blur", (e) => {
          let address = addressBar.value;
          let [activeCell, cellProp] = getCellAndCellProp(address);
          let enteredData = activeCell.innerText;
          
          cellProp.value = enteredData;
          console.log(cellProp);
      })
    }
}

//formula evaluation enter key
//1)normal expression - ( 10 + 20 )
//2)dependency expression - ( A1 + A2 + 10 );
let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", (e) => {
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula){
        //To get result of experession
        let evaluatedValue = evaluateFormula(inputFormula);
        
        //To update UI and cellProp in DB
        setCellUIAndCellProp(evaluatedValue, inputFormula);
    }
})

function evaluateFormula(formula){
    //condition for formula is it should be space separated
    let encodedFormula = formula.split(" ");

    for(let i=0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell,cellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }

    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula){
    let address = addressBar.value;
    let[cell, cellProp] = getCellAndCellProp(address);
    
    //UI updates
    cell.innerText = evaluatedValue;

    //DB updates
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}


