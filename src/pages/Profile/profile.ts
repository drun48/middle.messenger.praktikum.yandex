import { Block, Props } from '../../core/Block.ts';
import { FormProfile } from '../../components/form-profile';
import { FormPasswordProfile } from '../../components/form-password-profile';
import { ModalUploadFile } from '../../components/modal-upload-file';
import arrowCircle from '../../assets/arrow-circle.svg';
import profilPhoto from '../../assets/profile_photo.svg';

import { logout } from '../../services/auth';
import connect from '../../core/connect.ts';
import { deleteError, updateUser } from '../../services/user.ts';

class PageProfile extends Block {
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
      logout: () => this.logout(),
      readonlyForm: true,
      changePassword: false,
      openModalFile: false,
    });
  }

  hide() {
    this.setProps({ readonlyForm: true });
    this.setProps({ changePassword: false });
    this.setProps({ openModalFile: false });
    deleteError();
    if (this.element instanceof HTMLElement) this.element.style.display = 'none';
  }

  changeForm = () => {
    deleteError();
    this.props.readonlyForm = false;
  };

  stateChangePassword = () => {
    deleteError();
    this.props.changePassword = true;
  };

  saveProfile = () => {
    const formComponent = this.refs.formProfile as FormProfile;
    const form = formComponent.getForm();
    if (form) {
      this.props.readonlyForm = true;
      updateUser(form);
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

  // eslint-disable-next-line class-methods-use-this
  logout() {
    logout();
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
            {{{ Button class="primary-button" form=user label="Сохранить" onClick=savePassword}}}
          </div>

        {{else}}
          {{{ FormProfile ref="formProfile" readonly=readonlyForm form=user}}}

          {{#if (isEqual readonlyForm false)}}
          <div class="profile__form__btn">
            {{{ Button class="primary-button" label="Сохранить" onClick=saveProfile}}}
          </div>
        {{else}}
          <div class="profile__form__changed with-delimetr">
            {{{ Button class="profile__form__changed__element" label="Изменить данные" onClick=changeForm }}}
            {{{ Button class="profile__form__changed__element" label="Изменить пароль" onClick=stateChangePassword}}}
            {{{ Button class="profile__form__changed__element" label="Выйти" onClick=logout}}}
          </div>
        {{/if}}
        {{/if}}
        {{#if errorUpdateProfile}}
          <p class="error-text">{{errorUpdateProfile}}</p>
        {{/if}}
    </div>
    <div class="profile__back">
      {{#RouterLink class="profile__back__button" to="/messenger"}}
        <img src={{arrowCircle}} alt="Иконка перехода">
      {{/RouterLink}}
    </div>
</div>
`;
  }
}

// eslint-disable-next-line max-len
export default connect(({ user, errorUpdateProfile }) => ({ user, errorUpdateProfile }))(PageProfile);
