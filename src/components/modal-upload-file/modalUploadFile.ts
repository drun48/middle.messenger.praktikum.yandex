import { Block, Props } from '../../core/Block';

export class ModalUploadFile extends Block {
  file: File | undefined;

  constructor(props: Props) {
    super({
      ...props,
      title: 'Загрузите файл',
      open: false,
      getFile: (event: Event) => this.getFile(event),
      upload: () => this.upload(),
      onClose: () => {
        this.props.open = false;
      },
    });
  }

  open() {
    this.clearError();
    this.file = undefined;
    this.props.content = '';
    this.props.open = true;
  }

  close() {
    this.props.open = false;
  }

  clearError() {
    this.props.title = 'Загрузите файл';
    this.props.errorFooterText = '';
    this.props.errorTitle = false;
  }

  getFile(event: Event) {
    this.clearError();
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      this.props.title = 'Ошибка, попробуйте ещё раз';
      this.props.errorTitle = true;
      return;
    }

    if (input.files[0] instanceof File) {
      const [file] = input.files;
      this.file = file;
      this.props.content = this.file.name;
    }
  }

  upload() {
    this.clearError();
    if (!this.file) {
      this.props.errorFooterText = 'Нужно выбрать файл';
      return;
    }
    this.props.open = false;
    console.log(this.file);
  }

  protected render(): string {
    return `{{#BaseModal class="uploadFile" open=open global=global title=title errorTitle=errorTitle close=onClose}}
    {{#BaseModalContent }}
      <div class="uploadFile__content">
        {{#if content}}
            <p class="uploadFile__content__element">{{content}}</p>
          {{else}}
            <label class="primary-link uploadFile__upload">
              Выбрать файл на
              <br />
              компьютере
              {{{Input onInput=getFile type="file" style="display: none;" name=input_name accept=accept}}}
            </label>
          {{/if}}
      </div>
      {{/BaseModalContent }}
    {{{BaseModalFooter default=true labelButton=labelButton errorFooterText=errorFooterText onClick=upload}}}
    {{/BaseModal}}`;
  }
}
