import { Block, Props } from "../../core/Block";

export class PageModals extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }
  protected render() {
    return `
    <div class="container-modals">
    {{{ ModalUploadFile title='Загрузите файл' input_name="avatar" }}}
    {{{ ModalUploadFile title='Файл загружен' content='pic.jpg' input_name="avatar" }}}
    {{{ ModalUploadFile title='Загрузите файл' errorFooterText='Нужно выбрать файл' input_name="avatar" }}}
    {{{ ModalUploadFile title='Ошибка, попробуйте ещё раз' errorTitle=true input_name="avatar" }}}
    {{{ ModalUser title="Добавить пользователя" labelButton="Добавить" }}}
    {{{ ModalUser title='Удалить пользователя' labelButton='Удалить' }}}
    {{{ ModalList list=(listAttach) }}}
    {{{ ModalList list=(listControllerChat) }}}
    {{{ ModalDeleteChat }}}
</div>
        `;
  }
}