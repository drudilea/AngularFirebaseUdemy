import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';

import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css'],
})
export class GotyComponent implements OnInit {
  public juegos: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getJuegos().subscribe((juegos) => {
      this.juegos = juegos;
    });
  }

  votarJuego(id: string) {
    this.gameService
      .votarJuego(id)
      .subscribe((resp: { ok: boolean; msj: string }) => {
        resp.ok
          ? Swal.fire('Listo', resp.msj, 'success')
          : Swal.fire('Error', resp.msj, 'error');
      });
  }
}
