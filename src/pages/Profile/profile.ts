import { Block, Props } from '../../core/Block.ts';
import { FormProfile } from '../../components/form-profile';
import { FormPasswordProfile } from '../../components/form-password-profile';
import { ModalUploadFile } from '../../components/modal-upload-file';
import arrowCircle from '../../assets/arrow-circle.svg';
import profilPhoto from '../../assets/profile_photo.svg';

export class PageProfile extends Block {
  profile = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'Иван',
    phone: '79099673030',
  };

  constructor(props: Props) {
    super({
      ...props,
      arrowCircle,
      profilPhoto,
      changeForm: () => this.changeForm(),
      stateChangePassword: () => this.stateChangePassword(),
      saveProfile: () => this.saveProfile(),
      savePassword: () => this.savePassword(),
      openUploadFile: () => this.openUploadFile(),
      readonlyForm: true,
      changePassword: false,
      openModalFile: false,
      profile: {
        email: 'pochta@yandex.ru',
        login: 'ivanivanov',
        first_name: 'Иван',
        second_name: 'Иванов',
        display_name: 'Иван',
        phone: '79099673030',
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
      this.setProps({ profile: form });
      this.props.readonlyForm = true;
      console.log(form);
    }
  };

  savePassword = () => {
    const formComponent = this.refs.formPasswordProfile as FormPasswordProfile;
    const form = formComponent.getForm();
    if (form) {
      this.props.changePassword = false;
      console.log(form);
    }
  };

  openUploadFile() {
    const modal = this.refs.modalUpload as ModalUploadFile;
    modal.open();
  }

  protected render() {
    return `<div class="profile">
    {{{ ModalUploadFile ref="modalUpload" input_name="avatar" labelButton="Поменять" accept=".jpg, .png" global=true}}}
    <div class="profile__form">
        <div class="profile__form__title">
            {{{ ProfileTitle title="Иван" photo=profilPhoto chagePhoto=true onClick=openUploadFile}}}
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
            <img src={{arrowCircle}} alt="Иконка перехода">
        </a>
    </div>
</div>
`;
  }
}
