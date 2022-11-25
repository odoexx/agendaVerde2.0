let resultado1=0,resultado2=0,resultado3=0,total1=0;
let Dias,Horas;
function respuesta(num_pregunta,seleccionada){
    //pone el blanco las demas opciones
    //
    if(num_pregunta==1){
        total1=seleccionada.value*80.5;
    }
    if(num_pregunta==2){
        total1=total1+(seleccionada.value*2.46);
    }
    if(num_pregunta==3){
        total1=total1+(seleccionada.value*41.7);
    }
  if(num_pregunta==4){
    if(seleccionada.value==1){
        total1=total1+(350*0.4638);
    }else if(seleccionada.value==2){
        total1=total1+(388*0.4638);
    }else if(seleccionada.value==3){
        total1=total1+(420*0.4630);
    }
  } 
  if(num_pregunta==6){
Dias=seleccionada.value;
  }
  if(num_pregunta==7){
    Horas=seleccionada.value;
  }
  if(num_pregunta==5){
    if(seleccionada.value==1){
        total1=total1+(56*Dias*0.182*Horas);
    }else if(seleccionada.value==2){
        total1=total1+(56*Dias.value*0.882*Horas);
    }else if(seleccionada.value==3){
        total1=total1+(56*Dias*0.08*Horas);

    }
  }
  if(num_pregunta==8){
    total1=total1+(seleccionada.value*4.56);
  } 
  if(num_pregunta==9){
    total1=total1+(seleccionada.value*1.118);
  } 
  if(num_pregunta==10){
    total1=total1+(seleccionada.value*1.38);
  } 
  if(num_pregunta==11){
    total1=total1+(seleccionada.value*13.8);
  } 
}
function corregir(){
    document.getElementById("resultado").innerHTML=total1;
}