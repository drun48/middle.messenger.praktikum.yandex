import { Block, Props } from "../../core/Block";

export class ModalUploadFile extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  protected render(): string {
    return `<div class="uploadFile">
    {{#BaseModal title=title}}
    {{#BaseModalContent }}
      <div class="uploadFile__content">
        {{#if content}}
            <p class="uploadFile__content__element">{{content}}</p>
          {{else}}
            <label class="primary-link uploadFile__upload">
              Выбрать файл на
              <br />
              компьютере
              {{{Input  type="file" style="display: none;" name=input_name }}}
            </label>
          {{/if}}
      </div>
      {{/BaseModalContent }}
    {{{BaseModalFooter default=true labelButton='Поменять' errorFooterText=errorFooterText errorTitle=errorTitle}}}
    {{/BaseModal}}
  </div>`;
  }
}
