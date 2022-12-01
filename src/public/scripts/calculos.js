var total1=0,total2=0,total3=0,total=0;
let heladera,lavarropas,transporte;
function respuesta(num_pregunta,seleccionada){
    //pone el blanco las demas opciones
    //
    ///artefactos electricos
    if(num_pregunta==2){
    heladera=seleccionada.value;
    }
    if(num_pregunta==3){
      lavarropas=seleccionada.value;
    }
    ///transporte
    if(num_pregunta==8){
    transporte=seleccionada.value;
    }
}
function corregir(){
  var pcEscritorio=document.getElementById("p1").value;
  var pcPortatil=document.getElementById("p2").value;
  var televisor=document.getElementById("p3").value;
  var Dias=document.getElementById("p8").value;
  var Horas=document.getElementById("p9").value;
  var pavaElectrica=document.getElementById("p10").value;
  var microondas=document.getElementById("p11").value;
  var focos=document.getElementById("p12").value;
  var lampara=document.getElementById("p13").value;

  total1=0;
  total1=(pcEscritorio*80.5)+(pcPortatil*2.46)+(televisor*41.7);
  
  if(heladera==1){
    total1=total1+(350*0.4638);
  }else if(heladera==2){
    total1=total1+(388*0.4638);
  }else if(heladera==3){
    total1=total1+(420*0.4368);
  }
  if(lavarropas==1){
    total1=total1+(56*Dias*0.182*Horas);  
  }else if(lavarropas==2){
    total1=total1+(56*Dias*0.882*Horas);
  }else if(lavarropas==3){
    total1=total1+(56*Dias*0.08*Horas);
  }
     total1=total1+(pavaElectrica*4.56)+(microondas*1.118)+(focos*1.38)+(lampara*13.8);   
    corregir2();
    corregir3();
}
// caloventor y estufa
function corregir2(){
  total2=0;
  var estufa=document.getElementById("p14").value;
  var caloventor=document.getElementById("p15").value;
  var ventilador=document.getElementById("p16").value;
  var aire=document.getElementById("p17").value;
  total2=total2+(estufa*50.02)+(caloventor*92.34)+(ventilador*5.9)+(aire*66.46);
  //document.getElementById("resultado2").innerHTML=total2;
}
//transporte
function corregir3(){
  total3=0;
  var dias=document.getElementById("p18").value;
  var km=document.getElementById("p19").value;
  if(transporte==1){
    total3=total3+(56*dias*km*(6.2/100)*2.37);
  }else if(transporte==2 || transporte==4){
    total3=total3+(56*dias*km*(5.3/100)*2.77);
  }else if(transporte==3){
    total3=total3+(56*dias*km*(3/100)*2.37);
  }
  //document.getElementById("resultado3").innerHTML=total3;
}
function final(){
  corregir();
  var porsentaje;
  total=total1+total2+total3;
  document.getElementById("total").innerHTML= parseInt(total,10)+'  kgCO2';
  porsentaje=(total*100)/12000;       
  var element = document.getElementById("myprogressBar");   
  var width = 1;
  var identity = setInterval(scene, 10);
   function scene() {
    if (width >= 100) {
      clearInterval(identity);
    } else {
      width=porsentaje; 
      element.style.width = parseInt(width,10) + '%'; 
      document.getElementById("porsentaje").innerHTML=parseInt(width,10)+'%';
    }
    }
  if(porsentaje>50){
   document.getElementById("text").innerHTML= '¡UPS! Deberias buscar reducir tu huella de carbono';
  }else if(porsentaje<50){
   document.getElementById("text").innerHTML= '¡FELICIDADES! Sos una persona amigable con el medio ambiente';
  }else if(porsentaje==50){
   document.getElementById("text").innerHTML= '¡CUIDADO! Estas a punto de generar un impacto negativo al medio ambiente ';
  }
}
