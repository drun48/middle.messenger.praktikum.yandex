import { Block, Props } from "../../core/Block";

export class PageProfile extends Block {
  constructor(props: Props) {
    super({
      ...props,
      changeForm: () => this.changeForm(),
      stateChangePassword: () => this.stateChangePassword(),
      saveProfile: () => this.saveProfile(),
      savePassword: () => this.savePassword(),
      readonlyForm: true,
      changePassword: false,
    });
  }

  changeForm = () => {
    this.props.readonlyForm = false;
  };

  stateChangePassword = () => {
    this.props.changePassword = true;
  };

  saveProfile = () => {
    this.props.readonlyForm = true;
  };

  savePassword = () => {
    this.props.changePassword = false;
  };

  protected render() {
    return `<div class="profile">
    <div class="profile__form">
        <div class="profile__form__title">
            {{{ ProfileTitle title="Иван" photo=profil_photo chagePhoto=true }}}
        </div>

        {{#if changePassword}}

          {{{ FormPasswordProfile }}}
          <div class="profile__form__btn">
            {{{ Button class="primary-button" label="Сохранить" onClick=savePassword}}}
          </div>

        {{else}}
          {{{ FormProfile readonly=readonlyForm }}}

          {{#if (isEqual readonlyForm false)}}
          <div class="profile__form__btn">
            {{{ Button class="primary-button" label="Сохранить" onClick=saveProfile}}}
          </div>
        {{else}}
          <div class="profile__form__changed with-delimetr">
            {{{ Button class="profile__form__changed__element" label="Изменить данные" onClick=changeForm }}}
            {{{ Button class="profile__form__changed__element" label="Изменить пароль" onClick=stateChangePassword}}}
            {{{ Button class="profile__form__changed__element" label="Выйти" }}}
          </div>
        {{/if}}
        {{/if}}
    </div>
    <div class="profile__back">
        <a class="profile__back__button">
            <img src={{arrow_circle}} alt="Иконка">
        </a>
    </div>
</div>
`;
  }
}
