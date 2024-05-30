import { Block, Props } from './Block';
import store, { Indexed, StoreEvents } from '../core/Store';
import { isEqual } from '../utils/isEqual';

function connect<T extends Indexed>(mapStateToProps: (state: T) => T) {
  // eslint-disable-next-line func-names
  return function (Component: typeof Block) {
    return class extends Component {
      private _state:T;

      constructor(args: Props) {
        const state = mapStateToProps(store.getState() as T);
        super({ ...args, ...state });
        this._state = state;
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      private onChangeStoreCallback = () => {
        const newState = mapStateToProps(store.getState() as T);
        if (!isEqual(this._state, newState)) {
          this.setProps({ ...newState });
        }
        this._state = newState;
      };
    };
  };
}

export default connect;
