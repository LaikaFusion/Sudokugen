class Group {
    constructor(groupArray,groupNumber,groupType){
        this.groupArray = groupArray;
        this.groupNumber = groupNumber;
        this.groupType= groupType;
        this.missing =[];
    }
    //checks to see what numbers are missing from the groupArray (the group array is where you store the content of the row,column or box)
    checkMissing(){
        for (let index = 1; index <= 9; index++) {
            if(this.groupArray.includes(index)===false){
                this.missing .push(index);
            }
            
        }
    }
    //this will update the group away and do related things
    updategroupArray(toReplace,number){
        this.groupArray[toReplace] = number;
        //this.checkMissing();
        console.log(toReplace,number);
    }

}



//accepts either row,column, or box. creates an object for each individual one (nine of each type), and then shoves them into an object that uses numerical keys 
let objectMaker = (type)=>{
let groups ={};
   for (let index = 1; index <= 9; index++) {
    const Elements = document.getElementsByClassName(type+index);
    const arrayValues = Array.from(Elements).map((x) => parseInt(x.value));
    groups[index]= new Group(arrayValues, index,type);
    groups[index].checkMissing();
   }
   return groups;
}



//main function
const solve = () =>{
    let rows = objectMaker("row");
    let columns = objectMaker("column");
   
    let boxes = objectMaker("box");
    //outer for steps through rows 1 to 9 in order 
    for (let index = 1; index <= 9; index++) {
        //rows[index] first object, 
        rows[index].groupArray.forEach(function(element,indexInner) {
            const columnIndex = indexInner+1;
            
            let boxIndex = 0;

            //this is to determine which box you're in
            if (rows[index].groupNumber <= 3){ 
                boxIndex += 1;
            }
            else if(rows[index].groupNumber <= 6){
                boxIndex +=4;
            }
            else{
                boxIndex +=7;
            }
            if (columnIndex <= 3){ 
                //add nothing
            }
            else if(columnIndex <= 6){
                boxIndex +=1;
            }
            else{
                boxIndex +=2;
            }
           
            //NaN is what sits in the array in the blank spots
            if(isNaN(element)){
                


                const rowColFilter = rows[index].missing.filter(val => columns[columnIndex].missing.includes(val));
                const potentialResults = rowColFilter.filter(val => boxes[boxIndex].missing.includes(val));

                if(potentialResults.length === 1){
                    rows[index].updategroupArray(index, potentialResults[0]);
                    columns[columnIndex].updategroupArray(columnIndex, potentialResults[0]);
                    boxes[boxIndex].updategroupArray(boxIndex , potentialResults[0]);
                    const target= `row${index} column${columnIndex} box${boxIndex}`;
                    document.getElementsByClassName(target)[0].value = potentialResults[0];

                    rows[index].checkMissing();
                    columns[columnIndex].checkMissing();
                    boxes[boxIndex].checkMissing();
                    
                }
               debugger;

            }
        });
    }


}

