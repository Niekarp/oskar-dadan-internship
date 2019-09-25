import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client/api-client.service';
import { UrlConfig } from 'src/app/models/url-config.mode';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public readonly URL_CONFIG_URL = 'assets/config.json';

  public urlConfig = new UrlConfig();
}

export function urlConfigProvider(api: ApiClientService, config: ConfigService): () => Promise<void> {
  return (): Promise<void> => {
    return new Promise((resolve, reject): void => {
      api.getUrlConfig(config.URL_CONFIG_URL)
          .toPromise()
          .then(urlconfig => {
            Object.assign(config.urlConfig, urlconfig);
            resolve();
          });
    });
  };
}
