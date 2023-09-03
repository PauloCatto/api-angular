import { MusicService } from './services/music.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Music } from './models/model.music';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  musicas$ = new Observable<Music[]>();
  public id = '';
  public musica = '';
  public author = '';

  constructor(private musicService: MusicService) {
    this.obterMusicasCadastradas();
  }

  ngOnInit(): void {}

  obterMusicasCadastradas() {
    this.musicas$ = this.musicService.obterMusicas();
  }

  buttonClick() {
    if (!this.musica || !this.author) {
      alert('Preencha os campos');
      return;
    }

    if (this.id) {
      this.atualizarMusica();
      return;
    }

    this.musicService
      .cadastrarMusicas({
        author: this.author,
        text: this.musica,
      })
      .subscribe(() => this.obterMusicasCadastradas());
  }

  atualizarMusica() {
    this.musicService
      .editarMusica({
        id: parseInt(this.id),
        author: this.author,
        text: this.musica,
      })
      .subscribe(() => this.obterMusicasCadastradas());
  }

  preencherCampos(musica: Music) {
    this.id = musica.id!.toString();
    this.musica = musica.text;
    this.author = musica.author;
  }

  removerMusica(id: number) {
    this.musicService
      .remover(id)
      .subscribe((_) => this.obterMusicasCadastradas());
  }
}
