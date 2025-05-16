import { platformBrowser } from '@angular/platform-browser';
import { PokedexAppModule } from './app/pages/pokedex/pokedex-app.module';

platformBrowser()
  .bootstrapModule(PokedexAppModule)
  .catch((err) => console.error(err));
