 let btn=document.getElementsByClassName("btn");
 function fun(){
    ary=[-1,-2,-3,-4,-5,-6,-7,-8,-9];
    for(let i=0;i<9;i++)
    {
      if(btn[i].innerHTML.length>20){ary[i]=btn[i].innerHTML.length;}
    }
    if((ary[0]==ary[2]&&ary[0]==ary[1])||(ary[0]==ary[3]&&ary[0]==ary[6])||(ary[0]==ary[4]&&ary[0]==ary[8])||(ary[3]==ary[4]&&ary[3]==ary[5])||(ary[6]==ary[7]&&ary[6]==ary[8])||(ary[1]==ary[4]&&ary[1]==ary[7])||(ary[2]==ary[5]&&ary[2]==ary[8])||(ary[2]==ary[4]&&ary[2]==ary[6])){
      alert("you win");
    }

 
 }

 btn[0].addEventListener('click',(e)=>{
    let div=document.getElementById("imgdiv");
    console.log(btn[0].innerHTML.length);
     if(btn[0].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
        btn[0].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
        
        div.setAttribute("class","zero");
     }
     else {
        btn[0].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
        div.setAttribute("class","cross");console.dir( btn[0].textContent);
         }}
         fun();
 });
 
 btn[1].addEventListener('click',(e)=>{
    let div=document.getElementById("imgdiv");console.log(btn[1].innerHTML.length);
     if(btn[1].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
        btn[1].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
        div.setAttribute("class","zero");
     }
     else {
        btn[1].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
        div.setAttribute("class","cross");
         }}fun();
 });
  
 btn[2].addEventListener('click',(e)=>{  let div=document.getElementById("imgdiv");
 if(btn[2].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
    btn[2].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","zero");
 }
 else {
    btn[2].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","cross");
     }}fun();});
 btn[3].addEventListener('click',(e)=>{  let div=document.getElementById("imgdiv");
 if(btn[3].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
    btn[3].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","zero");
 }
 else {
    btn[3].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","cross");
     }}fun();});
 btn[4].addEventListener('click',(e)=>{  let div=document.getElementById("imgdiv");
 if(btn[4].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
    btn[4].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","zero");
 }
 else {
    btn[4].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","cross");
     }}fun();});
 btn[5].addEventListener('click',(e)=>{  let div=document.getElementById("imgdiv");
 if(btn[5].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
    btn[5].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","zero");
 }
 else {
    btn[5].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","cross");
     }}fun();});
 btn[6].addEventListener('click',(e)=>{  let div=document.getElementById("imgdiv");
 if(btn[6].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
    btn[6].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","zero");
 }
 else {
    btn[6].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","cross");
     }}fun();});
 btn[7].addEventListener('click',(e)=>{  let div=document.getElementById("imgdiv");
 if(btn[7].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
    btn[7].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","zero");
 }
 else {
    btn[7].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","cross");
     }}fun();});
 btn[8].addEventListener('click',(e)=>{  let div=document.getElementById("imgdiv");
 if(btn[8].innerHTML.length<5){if(div.getAttribute("class")=="cross"){ 
    btn[8].innerHTML="<img src=\"cross.webp\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","zero");
 }
 else {
    btn[8].innerHTML="<img src=\"zero.png\" height=\"200px\" width=\"200px\"></img>";
    div.setAttribute("class","cross");
     }}fun();});