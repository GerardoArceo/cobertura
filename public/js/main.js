var x,y,punto = [
		document.querySelector("#coor1"),
		document.querySelector("#coor2"),
		document.querySelector("#coor3"),
		document.querySelector("#coor4")
	],
	piezas = [];

var basicTimeline = anime.timeline({
  direction: "alternate",
  loop: 0,
  autoplay: true
});

function mensaje(){
    console.log(            
"              ,---------------------------,\n" +
"              |  /---------------------\\ |\n" +
"              | |                       | |\n" +
"              | |    Realizado por:     | |\n" +
"              | |    Gerardo Arceo      | |\n" +
"              | |     				     | |\n" +
"              | |			 <3			 | |\n" +
"              |  \\_____________________/ |\n" +
"              |___________________________|\n" +
"            ,---\\_____     []     _______/------,\n" +
"          /         /______________\\           /|\n" +
"        /___________________________________ /  | ___\n" +
"        |                                   |   |    )\n" +
"        |  _ _ _                 [-------]  |   |   (\n" +
"        |  o o o                 [-------]  |  /    _)_\n" +
"        |__________________________________ |/     /  /\n" +
"    /-------------------------------------/|      ( )/\n" +
"  /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /\n" +
"/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /\n" +
"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            );
}

function meter_pieza(c, x0, x1, y0, y1, size, m){
	if(size==2){//Insertar pieza L
        if(c==1)
        	piezas.push([x1,y0,x0,y1,x1,y1]);
        else if(c==2)
        	piezas.push([x0,y0,x0,y1,x1,y1]);
        else if(c==3)
        	piezas.push([x0,y0,x1,y0,x1,y1]);
        else if(c==4)
        	piezas.push([x0,y0,x1,y0,x0,y1]);
    }else{//Formar pieza L de otras 4 piezas L mas pequeñas
        size=m;//Medida que tendran las nuevas L
        m/=2;//Mitad del tamanio de las nuevas L
        meter_pieza(c,x0+m,x1-m,y0+m,y1-m,size,m);//central
        if(c==1){
            meter_pieza(3,x0+size,x1,y0,y0+size-1,size,m);//2
            meter_pieza(2,x0,x0+size-1,y0+size,y1,size,m);//3
            meter_pieza(1,x0+size,x1,y0+size,y1,size,m);//4
        }else if(c==2){
            meter_pieza(4,x0,x0+size-1,y0,y0+size-1,size,m);//1
            meter_pieza(2,x0,x0+size-1,y0+size,y1,size,m);//3
            meter_pieza(1,x0+size,x1,y0+size,y1,size,m);//4
        }else if(c==3){
            meter_pieza(4,x0,x0+size-1,y0,y0+size-1,size,m);//1
            meter_pieza(3,x0+size,x1,y0,y0+size-1,size,m);//2
            meter_pieza(1,x0+size,x1,y0+size,y1,size,m);//4
        }else if(c==4){
            meter_pieza(4,x0,x0+size-1,y0,y0+size-1,size,m);//1
            meter_pieza(3,x0+size,x1,y0,y0+size-1,size,m);//2
            meter_pieza(2,x0,x0+size-1,y0+size,y1,size,m);//3
        }
    }
}

function cuadricula(n,xx,yy){
	var veces = parseInt(document.getElementById('veces').innerHTML);
	var cuadrito = document.getElementById("cuadrito");

	document.getElementById('veces').innerHTML = (veces+1);
	var iDiv = document.getElementsByClassName('grid')[0];
	
	try {	        
        var child = iDiv.lastElementChild;  
        while (child) {
            iDiv.removeChild(child);
            child = iDiv.lastElementChild; 
        } 
	}catch(error) {
	  console.error(error);
	}
   	var parte = window.innerWidth*(2/5);
	parte = parte/n;
	cuadrito.style.width = parte+"px";
	cuadrito.style.height = parte+"px";

	cuadrito.style.marginLeft = parte*(xx-1)+"px";
	cuadrito.style.marginTop = parte*(yy-1)+"px";

	var acumulado = 0;
	for(var i=0; i<=n; i++){
		var lineaVertical = document.createElement('div');
		lineaVertical.className = 'vl';
		lineaVertical.style.marginRight = acumulado+"px";
		iDiv.appendChild(lineaVertical);
		var lineaHorizontal = document.createElement('div');
		lineaHorizontal.className = 'hl';
		lineaHorizontal.style.marginTop = acumulado+"px";
		iDiv.appendChild(lineaHorizontal);
		acumulado+=parte;
	}
	if(n==1){
		var eje_x = document.getElementsByClassName("eje_x")[0];
		var eje_y = document.getElementsByClassName("eje_y")[0];
		eje_x.style.visibility = 'hidden';
		eje_y.style.visibility = 'hidden';
	}
}

function llenar (x0, x1, y0, y1){
	var c;
	var xx0=x0,xx1=x1,yy0=y0,yy1=y1;
    var size = x1-x0+1;//tamanio del cuadrado
    if(size>1){
        var m=parseInt(Math.trunc(size/2));//Mitad del cuadrado
        if(x<x0+m){//Parte izquierda
            if(y<y0+m){//Parte superior  //c1
            	x1=x0+m-1;
            	y1=y0+m-1;
            	c=1;
            }else{//Parte inferior  //c3
            	x1=x0+m-1;
            	y0=y0+m;
            	c=3;
            }
        }else{//Parte derecha
            if(y<y0+m){//Parte superior  //c2
            	x0=x0+m;
            	y1=y0+m-1;
            	c=2;
            }else{//Parte inferior  //c4
            	x0=x0+m;
            	y0=y0+m;
            	c=4;
            }
        }

		var cor_x = window.innerWidth/20;
		var cor_y = cor_x;
		switch(c){
			case 2:
				cor_x=-cor_x;
				break;
			case 3:
				cor_y=-cor_y;
				break;
			case 4:
				cor_x=-cor_x;
				cor_y=-cor_y;
		}

		basicTimeline
		  .add({//Gira el cuadrante escogido
			targets: '#c'+c,
			zIndex: 1,
			rotate: '1turn',
			duration: 1000
		  })
		  .add({//Los demas se vuelven negros
			targets: '.square:not(#c'+c+')',
			zIndex: -1,
			backgroundColor: '#000000',
			begin: function() {
				var linea2 = document.getElementById('linea2');
				linea2.innerHTML='meter_pieza(x0 = '+xx0+', x1 = '+xx1+', y0 = '+yy0+', y1 = '+yy1+', c = '+c+')';
				var n = parseInt(document.getElementById('n').value);
				var veces = parseInt(document.getElementById('veces').innerHTML)+1;
				var eles = document.getElementById('eles');
				eles.innerHTML += 'L de longitud ' + size + ' = ' + (Math.pow(size,2)-Math.pow(size/2,2))/3 + ' L\'s bebés<br>';
			},
			duration: 1000
		  })
		  .add({//El cuadrante escogido hace ZOOM
		  	targets: '#c'+c,
			scale: 2,
			translateX: cor_x,
			translateY: cor_y,
			begin: function() {
				cuadricula(size/2,x-x0+1,y-y0+1);
				var linea1 = document.getElementById('linea1');
				document.getElementById('c'+c).style.color = '#D6EAF8';
				linea1.innerHTML='llenar(x0 = '+xx0+', x1 = '+xx1+', y0 = '+yy0+', y1 = '+yy1+')';
				punto[0].innerHTML=x0;
				punto[1].innerHTML=x1;
				punto[2].innerHTML=y0;
				punto[3].innerHTML=y1;
			},
			duration: 1500
		  })
		  	if(size>2)
			basicTimeline
			  .add({// Regresa a los colores default
				targets: '.square:not(#c'+c+')',
				backgroundColor: '#D6EAF8',
				duration: 1
			  })
			  .add({//Vuelve a su tamanio normal el cuadrante
					targets: '#c'+c,
					scale: 1,
					translateX: 0,
					translateY: 0,
					duration: 1
			  })
			  	.add({//Aparece de nuevo los nombres de los cuadrantes
					targets: '#c'+c,
					begin: function() {
						for(var i=1; i<=4; i++)
							document.getElementById('c'+i).style.color = '#1abc9c';
					},
					duration: 1
			  });
		llenar(x0,x1,y0,y1);
		meter_pieza(c,xx0,xx1,yy0,yy1,size,m);
    }else{
    	var n = parseInt(document.getElementById('n').value);
	  	x = parseInt(document.getElementById('x').value);
		y = parseInt(document.getElementById('y').value);
		d = Math.pow(2, n);
		var width = document.getElementById('sad').offsetWidth;
    	var parte = width/2 - width*(d/2);
    	basicTimeline
    	  .add({// Regresa a los colores default
    	  	delay: 1000,
			targets: '.square',
			backgroundColor: '#D6EAF8',
			begin: function(){
				var n = parseInt(document.getElementById('n').value);
				var veces = parseInt(document.getElementById('veces').innerHTML)+1;
				var eles = document.getElementById('eles');
				eles.innerHTML += 'Total de L\'s bebés: ' + (Math.pow(2,2*n)-1)/3;
			},
			duration: 1
		  })
		  .add({//
			targets: '#cuadrito',
			scale: 1/d,
			translateX: parte+(x-1)*width,
			translateY: parte+(y-1)*width,
			begin: function() {
				punto[0].innerHTML=1;
				punto[1].innerHTML=d;
				punto[2].innerHTML=1;
				punto[3].innerHTML=d;
			},
			duration: 2000
		  })
		  .add({//
			begin: function() {
				imprimirPiezas();
			}
		  });
    }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function imprimirPiezas(){
	var iDiv = document.getElementsByClassName('grid')[0];
	var n = parseInt(document.getElementById('n').value);
	var d = Math.pow(2, n);
	var width = document.getElementById('sad').offsetWidth;
	var parte=width/d;
	var i=0;
	var tiempo = 3000/piezas.length;
	var num_piezas = 1;
	if(n>=6){
		tiempo=0;//Hacer la animación lo más rápido posible
		num_piezas = Math.ceil(piezas.length/200);//Piezas que meterá por intervalo de tiempo
	}
	var id = setInterval(frame, tiempo);
	function frame() {
		if (i>=piezas.length) {
		  clearInterval(id);
		}else {
			for(var k=i; k<num_piezas+i; k++){
				var pieza = piezas[k];
				var color = getRandomColor();
				for(var j=0; j<pieza.length; j+=2){
					var cuadrito = document.createElement('div');
					cuadrito.className = 'cuadrito';
					cuadrito.style.width = parte+"px";
					cuadrito.style.height = parte+"px";
					cuadrito.style.marginLeft = parte*(pieza[j]-1)+"px";
					cuadrito.style.marginTop = parte*(pieza[j+1]-1)+"px";
					cuadrito.style.backgroundColor = color;
					iDiv.appendChild(cuadrito);
				}
			}
			i+=num_piezas;
		}
	}
}

function main(){
	var n = parseInt(document.getElementById('n').value);
	x = parseInt(document.getElementById('x').value);
	y = parseInt(document.getElementById('y').value);
	if(n>=1 && n<=10){
		d = Math.pow(2, n);
		if(x>=1 && x<=d && y>=1 && y<=d){
			var linea1 = document.getElementById('linea1');
			linea1.innerHTML='llenar(x0 = 1, x1 = '+d+', y0 = 1, y1 = '+d+')';
			var ocultos = document.getElementsByClassName("oculto");
			var i;
			for (i = 0; i < ocultos.length; i++) {
			  ocultos[i].style.visibility = 'visible';
			}
			document.getElementById('boton').style.display = "none";
			cuadricula(d,x,y);
			punto[0].innerHTML=1;
			punto[1].innerHTML=d;
			punto[2].innerHTML=1;
			punto[3].innerHTML=d;
			document.getElementById('veces').innerHTML=0;
			llenar(1,d,1,d);
		}else{
			alert('Coordenadas inválidas');
		}
	}else{
		alert('Tamaño de problema inválido (1≤n≤10)');
	}
}

function inicializarL(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#FFFFFF";
	ctx.strokeStyle = "#FFFFFF";
	ctx.fillRect(0, 0, s/2, s/2);
}

function animarL(){
	var s = parseInt(document.getElementById("s").value);
	var x = parseInt(document.getElementById("x2").value);
	var y = parseInt(document.getElementById("y2").value);
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.strokeStyle = "#2c3e50";
	var cuadrante = parseInt(document.getElementById("cuadrante").value);
	var num_l = parseInt(document.getElementById("num_l").value);

	if(num_l<262144){
		//Lineas horizontales
		ctx.moveTo(x+s*(1/2),y+s*(1/4));
		ctx.lineTo(x+s*(3/4),y+s*(1/4));
		ctx.moveTo(x+s*(3/4),y+s*(1/2));
		ctx.lineTo(x+s*(1),y+s*(1/2));
		ctx.moveTo(x+s*(1/4),y+s*(3/4));
		ctx.lineTo(x+s*(3/4),y+s*(3/4));
		//Lineas verticales
		ctx.moveTo(x+s*(1/4),y+s*(1/2));
		ctx.lineTo(x+s*(1/4),y+s*(3/4));
		ctx.moveTo(x+s*(3/4),y+s*(1/4));
		ctx.lineTo(x+s*(3/4),y+s*(3/4));
		ctx.moveTo(x+s*(1/2),y+s*(3/4));
		ctx.lineTo(x+s*(1/2),y+s*(1));
		ctx.stroke();

		document.getElementById("s").value=s/2;
		document.getElementById("x2").value=x+s/4;
		document.getElementById("y2").value=y+s/4;

		if(document.getElementById("cuadrante").value == '5'){
			document.getElementById("num_l").value=num_l*4;
		}
	}
}

function imprimirResultados(){
	var n = parseInt(document.getElementById('n').value);
	document.getElementById('boton_coordenadas').style.visibility = 'hidden';
	var div = document.getElementById('resultado');
	div.innerHTML = '<h1>Resultado:</h1>';
	if(n<8){
		for(var i=0; i<piezas.length; i++){
			div.innerHTML += ' [' + piezas[i] + '] ';
		}
	}else{
		div.innerHTML += 'El resultado es demasiado grande para ser mostrado.';
	}
}

document.querySelector('.pause').onclick = basicTimeline.pause;
document.querySelector('.play').onclick = basicTimeline.play;