
var maxHeight = document.getElementsByClassName("taskbar")[0].offsetHeight;
var iconsTaskbar = document.getElementsByClassName("taskbar-image");
var lastTop;var lastLeft;var i0 =0,i1 = 0;var migasht0;
var migasht; var selectedRadio = 0;var zIndexMain = 3;
var closed0 = true, closed1 = true;
var main1X,main1Y,main2X,main2Y;
window.onload = function(){
    resizeButtons();
    capitalInput.value = null;interestRateInput.value = null;timePeriodsInput.value = null;

    for(var k = 0;k<=1;k++){
        document.getElementsByClassName("main-header-draggable")[k].addEventListener("mousedown",function(e){
        var thisMain = this;
        this.parentElement.style.zIndex = zIndexMain;
        zIndexMain++;
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element
        var y = e.clientY - rect.top;  //y position within the element

        document.body.onmousemove = function(e){
                thisMain.parentElement.parentElement.style.left = (e.clientX-x).toString()+"px";
                thisMain.parentElement.parentElement.style.top=(e.clientY-y).toString()+"px";
                lastX = e.clientX;
            }
        })

        this.addEventListener("mouseup",function(){
            document.body.onmousemove = function(){}
        })

        document.getElementsByClassName("main-header-buttons-container")[k].children[0].onclick = function(){
            var mainWindow = this.parentElement.parentElement.parentElement;
            if(this.parentElement.parentElement.parentElement.getAttribute("id").charAt(5)==0){
                var rect = this.getBoundingClientRect();
                console.log(rect);
                main1X = rect.x;
                main1Y = rect.y;
                console.log(main1X,main1Y);
                migasht0 = setInterval(()=>{
                    
                    i0++;
                    if(i0%2==0){
                    document.getElementById("taskbar-image-0").style.color = "#000000";
                    }
                    else{
                    document.getElementById("taskbar-image-0").style.color = "rgb(1, 0, 129)";
                    }
                },1000)
            }
            else if(this.parentElement.parentElement.parentElement.getAttribute("id").charAt(5)==1){
                var rect = this.getBoundingClientRect();
                main2X = rect.x;
                main2Y = rect.y;
                migasht1 = setInterval(()=>{
                    
                    i1++;
                    if(i1%2==0){
                    document.getElementById("taskbar-image-1").style.color = "#000000";
                    }
                    else{
                    document.getElementById("taskbar-image-1").style.color = "rgb(1, 0, 129)";
                    }
                },1000)
            }
            mainWindow.style.transition = "0.1s";
            mainWindow.style.transitionTimingFunction = "steps(4, end)";
            mainWindow.style.top = (window.innerHeight-40).toString() + "px";;
            mainWindow.style.left = (window.innerWidth*10/100).toString() + "px";;
            mainWindow.style.transform = "scale(0)";
            
        }
        
        document.getElementsByClassName("taskbar-image")[k].addEventListener("click",function(){
            var idIcon = Number(this.getAttribute("id").charAt(14));
            if(idIcon==0){
                if(closed0==true){
                    var iconExpandParent = document.getElementById("main-"+idIcon.toString());
                    expandTaskbarIcon(iconExpandParent,1);
                    clearInterval(migasht0);
                }
            }
            if(idIcon==1){
                if(closed1==true){
                    var iconExpandParent = document.getElementById("main-"+idIcon.toString());
                    expandTaskbarIcon(iconExpandParent,2);
                    clearInterval(migasht1);
                }
            }
           
        })

        
    }
}    


function resizeButtons(){
    maxHeight = document.getElementsByClassName("taskbar")[0].offsetHeight;
    iconsTaskbar[0].style.height = (maxHeight-5).toString()+"px";
    iconsTaskbar[1].style.height = (maxHeight-5).toString()+"px";
    iconsTaskbar[0].style.lineHeight = (maxHeight-5).toString()+"px";
    iconsTaskbar[1].style.lineHeight = (maxHeight-5).toString()+"px";
}

function expandTaskbarIcon(toExpn,id){
    if(id == 1){
    var topOffset = main1Y;
    var leftOffset = main1X;
    }else{
    var topOffset = main2Y;
    var leftOffset = main2X;   
    }
    toExpn.style.top = (topOffset-6).toString() + "px";;
    toExpn.style.left = (leftOffset-578).toString() + "px";;
    toExpn.style.transform = "scale(1)";
    setTimeout(()=>{
        toExpn.style.transition = "0s";
        toExpn.style.transitionTimingFunction = "";
    },100)
}
function radioBtn(id){
    var radioButtons = document.getElementsByClassName("radio-button");
    if(id!==selectedRadio){
        radioButtons[id].setAttribute("class","radio-button selected");
        radioButtons[selectedRadio].setAttribute("class","radio-button");
        selectedRadio = id;
    }
    calcProfit();
}
window.onresize = function(){
    resizeButtons();
}
var capitalInput = document.getElementsByClassName("input-capital-input")[0];
var interestRateInput = document.getElementsByClassName("interest-rate-input")[0];
var timePeriodsInput = document.getElementsByClassName("time-periods-input")[0];
var profitOutput = document.getElementsByClassName("output-input")[0];
capitalInput.addEventListener("input",function(){
    calcProfit1();
})
interestRateInput.addEventListener("input",function(){
    calcProfit1();
})
timePeriodsInput.addEventListener("input",function(){
    calcProfit1();
})
var creditTotal = document.getElementsByClassName("input-capital-input")[1];
var interestRateInput2 = document.getElementsByClassName("interest-rate-input")[1];
var timePeriodsInput2 = document.getElementsByClassName("time-periods-input")[2];
var sizePayment = document.getElementsByClassName("output-input")[1];
creditTotal.addEventListener("input",function(){
    calcProfit2();
})
interestRateInput2.addEventListener("input",function(){
    calcProfit2();
})
timePeriodsInput2.addEventListener("input",function(){
    calcProfit2();
   
})
function calcProfit1(){
    if(capitalInput.value!==""&&interestRateInput.value!==""&&timePeriodsInput.value!==""){
        if(selectedRadio == 0){
            profitOutput.value = (capitalInput.value*interestRateInput.value/100)*timePeriodsInput.value;
        }
        else{
            var profit = 0;
            var capital = Number(capitalInput.value);
            for(var c = 1;c<=timePeriodsInput.value;c++){
                profit = capital*Number(interestRateInput.value)/100;
                capital += profit;
            }
            profitOutput.value = Number((capital-Number(capitalInput.value)).toFixed(2));
        }
    }
    else{
        profitOutput.value = "NaN";
    }
}
function calcProfit2(){
    if(creditTotal.value!==""&&interestRateInput2.value!==""&&timePeriodsInput2.value!==""){
        var capital = Number(creditTotal.value);
        var totalPaid = 0;
        var payment = 0;
        for(var c = 1;c<=timePeriodsInput2.value;c++){
            capital += capital/100*Number(interestRateInput2.value);
            payment = capital/Number((timePeriodsInput2.value)-c+1);
            capital = capital - payment;
            totalPaid += payment;
        }
        sizePayment.value = Math.round(totalPaid/timePeriodsInput2.value * 100) / 100;

    }
    else{
        sizePayment.value = "NaN";
    }
}
