const myHeading = document.querySelector('h1');
myHeading.textContent='HELLO WORLD!';

function multiply(num1,num2){
    let result = num1*num2;
    return result;
}

//alert("HELO ${ multiply(1,4) }");

/*document.querySelector("html").onclick=function(){
    alert("Hello");
}*/

let myImage = document.querySelector("img");

//なんでー

myImage.onclick=function(){
    let mySrc=myImage.getAttribute("src");
    if(mySrc==="../images/cyber-city.jpg"){
        myImage.setAttribute("src","../images/cyber-city2.jpg");
    }
    else{
        myImage.setAttribute("src","../images/cyber-city.jpg");
    }
}

let myButton = document.querySelector("button");
function setUserName(){
    //promtはユーザに記入させて記入内容を返す
    let myName=prompt("あなたの名前は何ですか？");
    if(!myName || myName===null){
        setUserName();
    }
    else{
        localStorage.setItem("name",myName);
        myHeading.textContent = "HELLO" + myName;
    }

}
if(!localStorage.getItem("name")){
    setUserName();
}else{
    let storedName=localStorage.getItem("name");
    myHeading.textContent="HELLO " + storedName;
}

myButton.onclick=function(){
    setUserName();
}