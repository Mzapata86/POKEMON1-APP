import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { PokemonService } from '../../services/pokemon.service';
import { MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-pokemon-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MaterialModule],
  providers: [PokemonService],
  templateUrl: './pokemon-dialog.component.html',
  styleUrl: './pokemon-dialog.component.scss'
})
export default class PokemonDialogComponent implements OnInit, OnDestroy {
  pokemon: any;
  animationArray: string[] = [];
  indiceActual: number = 0;
  animating: boolean = false;
  private animationInterval: any; 
  pokemonImagenActual: string = ''; 

  constructor(
    private pokemonservice: PokemonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
      this.pokemonservice.getPokemon(this.data.id).subscribe({
        next: (response: any) => {
          this.pokemon = response;

          if(response.sprites && response.sprites.front_default && response.sprites.back_default){
            this.animationArray = [
              response.sprites.front_default,
              response.sprites.back_default
            ];
            this.iniciarAnimacion();
          } else {
            this.animationArray = [];
          }
        },
        error: (err: any) => {
          console.error('Error al obtener Pokemon:', err);
          this.openSnackBarError();
          this.animationArray = [];
        }
      });
  }

  ngOnDestroy(): void {
      this.detenerAnimacion();
  }

  playSound(soundSource: string){
    if (soundSource){
      const audio = new Audio(soundSource);
      audio.play().catch(err => console.error('Error al reproducir el sonido:', err));
    }
  }

  openSnackBarError () {
    this._snackBar.open('Nombre del Pokemon no valido:', 'Cerrar', {duration: 3000});
  }

  iniciarAnimacion () {
    this.indiceActual = 0;
    this.animating = true;
    this.pokemonImagenActual = this.animationArray[0];
    this. animateFrames();
  }

  animateFrames () {
    if (this.animating) {
      this.animationInterval = setInterval(() => {
        try {
          this.indiceActual =
            (this.indiceActual + 1) % this.animationArray.length;
          this.pokemonImagenActual = this.animationArray[this.indiceActual];
        } catch (error) {
          this.detenerAnimacion();
          console.error('Error de la animacion:', error);
        }
      }, 300);
    }
  }

  detenerAnimacion() {
    this.animating = false;
    if (this.animationInterval){
      clearInterval(this.animationInterval);
    }
  }

}
