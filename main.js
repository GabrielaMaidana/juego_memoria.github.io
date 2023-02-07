//inicializacion de variables
let tarjetasDestapadas =  0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivoid = null;
let timerInicial = 30;
let puntaje = 0;
//apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos'); 
let mostrarTiempo = document.getElementById('t-restante');


//creamos las variables para el audio
let winaudio = new Audio('./sounds/click.mp3');
let loseaudio = new Audio('./sounds/lose.mp3');
let clickAudio = new Audio('./sounds/right.mp3');
let rightAudio = new Audio('./sounds/sound.wav');
let wrongAudio = new Audio('./sounds/wrong.mp3');

//generacion de numeros aleatorios
let numeros= [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random() - 0.3})


//funciones
function contarTiempo(){
tiempoRegresivoid = setInterval(()=> {
timer--;
mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`;

if(timer == 0){
clearInterval(tiempoRegresivoid);
bloquearTarjetas();
loseaudio.play();
}
}, 1000, timer);
}

function bloquearTarjetas(){
for (let i= 0; i<=15;i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="/imagenes/${numeros[i]}.png" alt="">`;
    tarjetaBloqueada.disabled = true;
    }
}



//funcion principal
function destapar(id){
    

if(temporizador == false){
 contarTiempo();
 temporizador = true;   
}
 
if(tarjetasDestapadas == 0){
    //mostrar primer numero
  tarjeta1 = document.getElementById(id);
primerResultado = numeros[id];
 tarjeta1.innerHTML = `<img src="imagenes/${primerResultado}.png" alt="">`;
clickAudio.play();
//Deshabilitar primer boton
tarjeta1.disabled = true;
tarjetasDestapadas++;
//primerId= id;

}else if(tarjetasDestapadas == 1){
    //mostrar segundo numero
  tarjeta2 = document.getElementById(id);
segundoResultado = numeros[id];
tarjeta2.innerHTML = `<img src="imagenes/${segundoResultado}.png" alt="">`;

//deshabilitar segundo boton
tarjeta2.disabled = true;
tarjetasDestapadas++;
//segundoId=id;
    
    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    if(primerResultado == segundoResultado){
//encerrar contador tarjetas destapadas
 tarjetasDestapadas = 0;
 rightAudio.play();
// Aumentar aciertos
aciertos++;
mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

if(aciertos == 8){
    winaudio.play();
    clearInterval(tiempoRegresivoid);
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}🥳` ;
    mostrarTiempo.innerHTML= `Fantastico solo demoraste ${timerInicial - timer -1} segundos`;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}😎`;  
}   

}else{
    wrongAudio.play();
    //mostrar momentaneamente valores y volver a tapar
    setTimeout(() => {
    
       tarjeta1.innerHTML ='';
        tarjeta2.innerHTML ='';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
    }, 500);
     }


    }
}