#include <stdio.h>
#include <math.h>

int x, y;

void meter_pieza(int c, int x0, int x1, int y0, int y1, int size, int m){
    if(size==2){//Insertar pieza L
        if(c==1)
            printf("%d %d %d %d %d %d\n",x1,y0,x0,y1,x1,y1);
        else if(c==2)
            printf("%d %d %d %d %d %d\n",x0,y0,x0,y1,x1,y1);
        else if(c==3)
            printf("%d %d %d %d %d %d\n",x0,y0,x1,y0,x1,y1);
        else if(c==4)
            printf("%d %d %d %d %d %d\n",x0,y0,x1,y0,x0,y1);
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

void llenar(int x0, int x1, int y0, int y1){
    int size = x1-x0+1;//tamanio del cuadrado
    if(size>1){
        int m=size/2;//Mitad del cuadrado
        if(x<x0+m){//Parte izquierda
            if(y<y0+m){//Parte superior
                meter_pieza(1,x0,x1,y0,y1,size,m);//c1
                llenar(x0,x0+m-1,y0,y0+m-1);
            }else{//Parte inferior
                meter_pieza(3,x0,x1,y0,y1,size,m);//c3
                llenar(x0,x0+m-1,y0+m,y1);
            }
        }else{//Parte derecha
            if(y<y0+m){//Parte superior
                meter_pieza(2,x0,x1,y0,y1,size,m);//c2
                llenar(x0+m,x1,y0,y0+m-1);
            }else{//Parte inferior
                meter_pieza(4,x0,x1,y0,y1,size,m);//c4
                llenar(x0+m,x1,y0+m,y1);
            }
        }
    }
}

int main(){
    int n;
    scanf("%d %d %d", &n,&x,&y);
    int d=pow(2,n);
    llenar(1,d,1,d);
    return 0;
}