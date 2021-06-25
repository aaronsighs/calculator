
    let number = "";
    let reserve1 = ""
    let action = ""
    let reserve2 = ""




    // SETUP NUMPAD
    // --ADD NUMBERS TO NUMPAD
    let numpad = document.querySelector("#numpad")
    for(i=0;i<10;i++){
        let button = document.createElement("button")
        button.textContent = i;
        button.value = i;
        button.addEventListener('click',addNumToScreen)
        numpad.appendChild(button);
    }
    //--ADD DECIMAL TO NUMPAD
    let decimal = document.createElement("button");
    decimal.textContent = ".";
    decimal.addEventListener('click',e=>{
        if (document.querySelector("#lower-screen").textContent.indexOf(".")==-1){
            number += "."
            document.querySelector("#lower-screen").textContent = number;
        }
    });
    numpad.appendChild(decimal);


    //--ADD +/- to NUMPAD
    let changeSign = document.createElement("button");
    changeSign.textContent = "+/-"
    changeSign.addEventListener('click',negateSign);
    numpad.appendChild(changeSign);



    //SETUP TOOLS
    
    let tools = document.querySelector("#tools")


    //--ADD BACK-BUTTON

    let backBtn = document.createElement("button");
    backBtn.addEventListener('click',back);
    backBtn.textContent = "←"
    tools.appendChild(backBtn);

     //--ADD CLEAR-BUTTON


    let clearBtn = document.createElement("button");
    clearBtn.addEventListener('click',clear);
    clearBtn.textContent = "clr"
  
    tools.appendChild(clearBtn);


    let factBtn = document.createElement("button");
    factBtn.addEventListener('click',()=>{
    number=""+factorial(Number(number))
    updateScreen()
    });
    factBtn.textContent = "!"
  
    tools.appendChild(factBtn);


    //--ADD SPECIAL BUTTONS
    ["+","-","*","/","^","%","="].forEach( char => {
        let btn = document.createElement("button");
   btn.addEventListener('click',operate);
    btn.textContent = char
    btn.value=char
    tools.appendChild(btn);
    })


    function factorial(x){
        if (x===0){
            return 1
        }
        return x * factorial(Math.abs(x)-1)
    }







    window.addEventListener("keypress",e=>{
        let element = document.querySelector(`button[value="${e.key}"]`) 
        sudoClass = {
            target:element
        }
        if (element){
            if (!isNaN(+e.key)){
            element.classList.add("sudo-hover")
            setTimeout(()=>element.classList.remove("sudo-hover"),250)
            addNumToScreen(sudoClass)

            }else{
                element.classList.add("sudo-hover2")
            setTimeout(()=>element.classList.remove("sudo-hover2"),250)
                operate(sudoClass)

            }

            
        }
    })





    function validNumber(n){
        return number.replace(".","").replace("-","")!==""

    }


    function setReserve(){
        reserve1 = number;
        reserve2 = ""
        number=""
        document.querySelector("#upper-screen").textContent=reserve1+" "+action;
        document.querySelector("#lower-screen").textContent=number;

    }







    function operate(e){

        if (!validNumber(number)){
            action = e.target.textContent !== "=" ? e.target.textContent : action ;
            return
        }
        if (!reserve1.length){
            if(e)
            action = e.target.textContent !== "=" ? e.target.textContent : action ;
           
            setReserve()
            return
        }
        
        document.querySelector("#upper-screen").textContent=reserve1+" "+action+" "+ number +" =";
        reserve2 = number
        number=""
        switch(action){
        case '+':
            reserve1 = ""+(Math.round((+reserve2 + +reserve1)*10000)/10000)
            break
        case '-':
            reserve1 = ""+(Math.round((+reserve1 - +reserve2)*10000)/10000)
            break

        case '*':
            reserve1 = ""+(Math.round((+reserve1 * +reserve2)*10000)/10000)
            break

        case '/':
            reserve1 = ""+(Math.round((+reserve1 / +reserve2)*10000)/10000)
            break
        case '%':
            reserve1 =""+(Math.round((+reserve1 % +reserve2)*10000)/10000)
            break
        case '^':
            reserve1 =""+(Math.round((Number(reserve1) ** Number(reserve2))*10000)/10000)
            break
        }
       
        action = e.target.textContent !== "=" ? e.target.textContent : action ;
        e.target.textContent !== "="  ? reserve2="":"";
        document.querySelector("#lower-screen").textContent=reserve1;

    }




    function updateTopScreen(){
        if (reserve2.length)
        document.querySelector("#upper-screen").textContent=reserve1+" "+action+" "+ reserve2 +" =";
        else if (reserve1.length)
        document.querySelector("#upper-screen").textContent=reserve1+" "+action+" ";
        else{
            document.querySelector("#upper-screen").textContent="";
        }
    }


    function updateBottomScreen(){
        document.querySelector("#lower-screen").textContent=number;
    }


    function updateScreen(){
        updateTopScreen();
        updateBottomScreen();
    }
    

    function clear_bottom(){
        number  = "";
        document.querySelector("#lower-screen").textContent=number;

    }

    function clear(){
        reserve1 = "";
        reserve2 = ""
        number  = "";
        action  = "";
        updateScreen();

    }

    function back(){
        number = number.substr(0,number.length-1)
        document.querySelector("#lower-screen").textContent=number;

    }

    function negateSign(){
        let index = number.indexOf("-")
        if (index<0){
            number = String(number * -1);
        }else{
            number = number.slice(index+1)
        }
        document.querySelector("#lower-screen").textContent=number;
    }


    function addNumToScreen(e){
        if (number.length>16){
            return
        }
        number += String(e.target.textContent);
        document.querySelector("#lower-screen").textContent=number;
        reserve2=""
        updateTopScreen();
    }
