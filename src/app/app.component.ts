import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from './modules/pokemon-list/pokemon-list.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { SpinComponent } from './shared/components/spin/spin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonListComponent, ModalComponent, SpinComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokemon-interview';
}
