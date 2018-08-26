import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal';


@Component( {
    selector: 'page-home',
    templateUrl: 'home.html'
} )
export class HomePage {

    animales: Animal[] = [];
    timeOut: any;
    audio = new Audio();

    constructor( public navCtrl: NavController ) {
        this.animales = ANIMALES.slice( 0 );
    }

    reproducir( animal: Animal ): void {

        this.pausar( animal );

        if ( animal.reproduciendo ) {
            animal.reproduciendo = false;
            return;
        }

        this.audio.src = animal.audio;

        this.audio.load();
        this.audio.play();

        animal.reproduciendo = true;

        this.timeOut = setTimeout( () => {
            animal.reproduciendo = false;

        }, animal.duracion * 1000 );


    }

    pausar( animal: Animal ): void {
        clearTimeout( this.timeOut );
        this.audio.pause();
        this.audio.currentTime = 0;

        for ( let a of this.animales ) {
            if ( a.nombre !== animal.nombre ) {
                a.reproduciendo = false;
            }
        }
    }
}
