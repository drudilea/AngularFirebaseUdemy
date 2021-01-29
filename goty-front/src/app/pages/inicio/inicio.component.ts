import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Game } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  public juegosGrafica: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore
      .collection('goty')
      .valueChanges()
      .pipe(
        map((juegos: Game[]) => {
          return juegos.map(({ name, votos }) => ({ name, value: votos }));
        })
      )
      .subscribe((juegosGrafica) => {
        this.juegosGrafica = juegosGrafica;
      });
  }
}
