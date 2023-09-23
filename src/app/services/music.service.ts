import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Music, MusicCadastrar } from '../models/model.music';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  private url = `${environment.api}/musics`;

  constructor(private httpClient: HttpClient) {}

  obterMusicas(): Observable<Music[]> {
    return this.httpClient.get<Music[]>(this.url);
  }

  cadastrarMusicas(musica: MusicCadastrar) {
    return this.httpClient.post<Music>(this.url, musica);
  }

  editarMusica(musica: Music) {
    return this.httpClient.put<Music>(`${this.url}/${musica.id}`, musica);
  }

  remover(id: number) {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
