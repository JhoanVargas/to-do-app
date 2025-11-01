import { Injectable, Inject } from '@angular/core';
import {
  RemoteConfig,
  fetchAndActivate,
  getValue,
} from '@angular/fire/remote-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Firebase {
  private features = new BehaviorSubject<{ [key: string]: boolean }>({});

  constructor(@Inject('REMOTE_CONFIG') private remoteConfig: RemoteConfig) {
    this.loadFlags();
  }

  async loadFlags() {
    try {
      await fetchAndActivate(this.remoteConfig);

      const newFeatureEnabled = getValue(
        this.remoteConfig,
        'new_feature_enabled'
      ).asBoolean();

      this.features.next({ new_feature_enabled: newFeatureEnabled });
    } catch (error) {
      console.error('Error cargando remote config:', error);
    }
  }

  isEnabled(featureName: string): boolean {
    return this.features.value[featureName] ?? false;
  }

  getFeatures() {
    return this.features.asObservable();
  }
}
