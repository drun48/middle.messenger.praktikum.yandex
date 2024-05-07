import { EventBus } from './EventBus';
import set from '../utils/set';

// eslint-disable-next-line no-shadow
export enum StoreEvents {
  Updated = 'updated'
}

export type Indexed<T = unknown> = {
    [key in string]: T;
};

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
