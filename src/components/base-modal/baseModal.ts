import { Block, Props } from '../../core/Block';

export class BaseModal extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        close: props.close,
        click: () => {},
      },
    });
  }

  componentDidMount() {
    if (this.props.open) {
      this._open();
    } else {
      this._close();
    }
  }

  private _open() {
    const dialog = this.element as HTMLDialogElement;
    dialog.classList.remove('close');
    try {
      if (this.props.global) dialog?.showModal();
      else dialog?.show();
    } catch (e) {
      console.log(e);
    }
  }

  private _close() {
    const dialog = this.element as HTMLDialogElement;
    dialog.classList.add('close');
    dialog?.close();
  }

  protected render(): string {
    return `
      <dialog class="baseModal container-form-modal close
                    {{class}} 
                    {{#if global}} baseModal-global {{/if}}>
          <div class="baseModal__title">
                <h2 class="{{#if errorTitle}}error{{/if}}">{{title}}</h2>
          </div>
      </dialog>`;
  }
}
