import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query: any) {
    return this._model.querys('publicacion/querys', query, 'post');
  }
  create(query: any) {
    return this._model.querys('publicacion', query, 'post');
  }
  update(query: any) {
    return this._model.querys('publicacion/' + query.id, query, 'put');
  }
  delete(query: any) {
    return this._model.querys('publicacion/' + query.id, query, 'delete');
  }

  urlprueba(text: string) {
    return new Promise(resolve => {
      if (!text) return text;
      const self = this;

      const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
      const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
      const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

      let resultHtml = text;

      // get all the matches for youtube links using the first regex
      const match = text.match(fullreg);
      if (match && match.length > 0) {
        // get all links and put in placeholders
        const matchlinks = text.match(linkreg);
        if (matchlinks && matchlinks.length > 0) {
          for (var i = 0; i < matchlinks.length; i++) {
            resultHtml = resultHtml.replace(matchlinks[i], "#placeholder" + i + "#");
          }
        }

        // now go through the matches one by one
        for (var i = 0; i < match.length; i++) {
          // get the key out of the match using the second regex
          let matchParts = match[i].split(regex);
          // replace the full match with the embedded youtube code
          resultHtml = resultHtml.replace(match[i], self.createYoutubeEmbed(matchParts[1]));
        }

        // ok now put our links back where the placeholders were.
        if (matchlinks && matchlinks.length > 0) {
          for (var i = 0; i < matchlinks.length; i++) {
            resultHtml = resultHtml.replace("#placeholder" + i + "#", matchlinks[i]);
          }
        }
      }
      return resolve(resultHtml);
    })
  }

  createYoutubeEmbed(key: any) {
    return 'https://www.youtube.com/embed/' + key + "?rel=0&autoplay=1";
  };

}
