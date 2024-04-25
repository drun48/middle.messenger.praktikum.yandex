import { Block, Props } from "../../core/Block";
import { FormProfile } from "../../components/form-profile";
import { FormPasswordProfile } from "../../components/form-password-profile";

export class PageProfile extends Block {
  profile = {
    email: "pochta@yandex.ru",
    login: "ivanivanov",
    first_name: "Иван",
    second_name: "Иванов",
    display_name: "Иван",
    phone: "79099673030",
  };
  constructor(props: Props) {
    super({
      ...props,
      changeForm: () => this.changeForm(),
      stateChangePassword: () => this.stateChangePassword(),
      saveProfile: () => this.saveProfile(),
      savePassword: () => this.savePassword(),
      readonlyForm: true,
      changePassword: false,
      profile: {
        email: "pochta@yandex.ru",
        login: "ivanivanov",
        first_name: "Иван",
        second_name: "Иванов",
        display_name: "Иван",
        phone: "79099673030",
      },
    });
  }

  changeForm = () => {
    this.props.readonlyForm = false;
  };

  stateChangePassword = () => {
    this.props.changePassword = true;
  };

  saveProfile = () => {
    const formComponent = this.refs.formProfile as FormProfile;
    const form = formComponent.getForm();
    if (form) {
      console.log(form);
      this.setProps({ profile: form });
      this.props.readonlyForm = true;
    }
  };

  savePassword = () => {
    const formComponent = this.refs.formPasswordProfile as FormPasswordProfile;
    const form = formComponent.getForm();
    if (form) {
      console.log(form);
      this.props.changePassword = false;
    }
  };

  protected render() {
    return `<div class="profile">
    <div class="profile__form">
        <div class="profile__form__title">
            {{{ ProfileTitle title="Иван" photo=profil_photo chagePhoto=true }}}
        </div>

        {{#if changePassword}}

          {{{ FormPasswordProfile ref="formPasswordProfile" }}}
          <div class="profile__form__btn">
            {{{ Button class="primary-button" form=profile label="Сохранить" onClick=savePassword}}}
          </div>

        {{else}}
          {{{ FormProfile ref="formProfile" readonly=readonlyForm form=profile}}}

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
