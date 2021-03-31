
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// default values
var matrix = [[1,1],[-1,1]];
var pValueArray = [1,2,4,3/7,1000];
var colorArray = ["red", "red", "red", "red", "red"];
var weightArray = [1,1,1,1,1];

var pvalueCount = 1;


function MatrixArrayMultiplication(matrixA, arrayX){
    var result = [];
    for (var i=0; i < matrixA.length; i++){
        for(var j=0; j<arrayX.length; j++){ 
        
            var sum =0;
            for (var k=0;k<matrixA[i].length;k++)
                sum  = sum + matrixA[i][k] * arrayX[k];
        }
        result[i] = sum;
    }
return result;
}

function normCalculation(resultMultiplication, arrayX, pValue){
    var sumPowerAX = 0
    var sumPowerX  = 0
    for (var i=0; i<resultMultiplication.length;i++){
        sumPowerAX = sumPowerAX + Math.pow(Math.abs(resultMultiplication[i]),pValue)
    }

    for (var i=0; i<arrayX.length; i++){
        sumPowerX = sumPowerX + Math.pow(Math.abs(arrayX[i]),pValue) 
    }
    return Math.pow(sumPowerAX / sumPowerX,1/(pValue));

}

function draw(PValueArray){
    
    for(i=0;i<PValueArray.length;i++){
                                        
        var pValue = PValueArray[i];
        var step = 2*Math.PI/360;//  see1
        var h = 500; 
        var k = 250;
        var r = 50;   

        //set color
        var gradient = ctx.createLinearGradient(0, 0, 100, 0);
        var gradientColor = colorArray[i];
        // gradient.addColorStop("0", "blue");
        //gradient.addColorStop("0.5" ,"blue");
        gradient.addColorStop("1.0", gradientColor);

        // set line weight
        ctx.strokeStyle = gradient;
        var strokWeight = weightArray[i];
        ctx.lineWidth = strokWeight;

        ctx.beginPath();  //tell canvas to start a set of lines


        for(var theta=0;  theta < 2*Math.PI;  theta+=step){ 
            var x = h + r*Math.cos(theta);
            var y = k - r*Math.sin(theta);    //note 2.
            var sum =0;
            var realx = x - h;
            var realy = y - k;
            var arrayX = [realx,realy];
            var matrixArray = MatrixArrayMultiplication(matrix, arrayX);
            var norm = normCalculation(matrixArray, arrayX, pValue);
            
            ctx.lineTo(realx*norm + h, realy*norm +k)
        }

        ctx.closePath();     //close the end to the start point
        ctx.stroke();        //actually draw the accumulated lines
    }
}

// draw the canvas on the screen
var canvasdraw = document.getElementById("canvasDrawBtn");
canvasdraw.onclick = function() {
    // get x1, y1, x2, y2 
    var x1 = document.getElementById("x1").value;
    var y1 = document.getElementById("y1").value;
    var x2 = document.getElementById("x2").value;
    var y2 = document.getElementById("y2").value;
    matrix = [[x1, y1], [x2, y2]];

    // get pvalues info
    var tempPValueArray = [];
    var tempColorArray = [];
    var tempWeightArray = [];

    for (var j=1; j<pvalueCount+1; j++) {
        // get p value
        var tempPID = "p" + j;
        var p = document.getElementById(tempPID).value;
        tempPValueArray.push(p);

        // get color for pvalue
        var tempColorID = "colors" + j;
        var color = document.getElementById(tempColorID).value;
        tempColorArray.push(color);

        // get line Weight
        var tempWeightID = "weightLine" + j;
        var weight = document.getElementById(tempWeightID).value;
        tempWeightArray.push(weight);
    }
    pValueArray = tempPValueArray;
    colorArray = tempColorArray;
    weightArray = tempWeightArray;

    draw(pValueArray);
}

// reset canvas as default
document.getElementById("reset").onclick = function() {
    ctx.clearRect(0, 0, c.width, c.height);

    // reset p-value number
    document.getElementById("InputPvalue").value = 1;
}

// download drawed canvas image to the local server
const download = document.getElementById('download');
download.addEventListener('click', function(e) {
    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = c.toDataURL();
    link.click();
    link.delete;

   // --------------------------------------------------------------------
    var defaultpInput = '<tr><th>p-Value</th><th>Color</th><th>Weight line</th></tr><tr><td><input id="p1" type="number" value="0" required></td><td><select name="color" id="colors1"><option value="green">green</option><option value="purple">purple</option><option value="blue">blue</option></select></td><td><input id="weightLine1" type="number" value="1" required></td></tr>';
    document.getElementById("pinfoTable").innerHTML = '<td></td>';
});

// after click ok button with p-value number
var pvalueInputOkBtn = document.getElementById("pvalueInputOkBtn");
    pvalueInputOkBtn.onclick = function() {
    modal.style.display = "none";

    pvalueCount = parseInt(document.getElementById("InputPvalue").value);
    var inputTemp1 = '<tr><td><input id="p';
    var inputTemp2 = '" type="number"></td><td><select name="color" id="colors';
    var inputTemp3 = '"><option value="green">green</option> <option value="purple">purple</option> <option value="blue">blue</option></select></td><td><input id="weightLine';
    var inputTemp4 = '" type="number" value="1"></td></tr>';

    for (var i=2; i<pvalueCount+1; i++) {
        var temp = inputTemp1 + i + inputTemp2 + i + inputTemp3 + i +inputTemp4;
        document.getElementById("pinfoTable").innerHTML += temp;
    }
    
    
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


