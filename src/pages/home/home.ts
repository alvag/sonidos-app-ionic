import { Component } from '@angular/core';
import { Refresher } from 'ionic-angular';
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

    constructor() {
        this.animales = ANIMALES.slice( 0 );
    }

    reproducir( animal: Animal ) {
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

    pausar( animal: Animal ) {
        clearTimeout( this.timeOut );
        this.audio.pause();
        this.audio.currentTime = 0;

        for ( let a of this.animales ) {
            if ( a.nombre !== animal.nombre ) {
                a.reproduciendo = false;
            }
        }
    }

    borrarAnimal( i ) {
        this.animales.splice( i, 1 );
    }

    recargarData( refresher: Refresher ) {
        setTimeout( () => {
            this.animales = ANIMALES.slice( 0 );
            refresher.complete();
        }, 2000 );
    }

}
