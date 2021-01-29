import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css'],
})
export class GraficoBarrasComponent implements OnDestroy {
  @Input() results: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Votos';
  yAxisLabel = 'Juegos';

  colorScheme = 'nightLights';

  constructor() {}

  ngOnDestroy(): void {}

  onSelect(event) {
    console.log(event);
  }
}
