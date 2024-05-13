import { Block, Props } from '../../core/Block.ts';
import { FormProfile } from '../../components/form-profile';
import { FormPasswordProfile } from '../../components/form-password-profile';
import { ModalUploadFile } from '../../components/modal-upload-file';
import arrowCircle from '../../assets/arrow-circle.svg';

import { logout } from '../../services/auth';
import connect from '../../core/connect.ts';
import {
  deleteError, updatePassword, updateUser, updateAvatar,
} from '../../services/user.ts';

class PageProfile extends Block {
  constructor(props: Props) {
    super({
      ...props,
      arrowCircle,
      changeForm: () => this.changeForm(),
      stateChangePassword: () => this.stateChangePassword(),
      saveProfile: () => this.saveProfile(),
      savePassword: () => this.savePassword(),
      openUploadFile: () => this.openUploadFile(),
      logout: () => this.logout(),
      back: () => this.back(),
      changeAvatar: (file:File) => this.changeAvatar(file),
      readonlyForm: true,
      changePassword: false,
      openModalFile: false,
    });
  }

  hide() {
    this.setProps({ openModalFile: false });
    this.back();
    deleteError();
    if (this.element instanceof HTMLElement) this.element.style.display = 'none';
  }

  back() {
    this.setProps({ readonlyForm: true });
    this.setProps({ changePassword: false });
  }

  changeForm() {
    deleteError();
    this.props.readonlyForm = false;
  }

  stateChangePassword() {
    deleteError();
    this.props.changePassword = true;
  }

  saveProfile() {
    const formComponent = this.refs.formProfile as FormProfile;
    const form = formComponent.getForm();
    if (form) {
      this.props.readonlyForm = true;
      updateUser(form);
    }
  }

  savePassword() {
    const formComponent = this.refs.formPasswordProfile as FormPasswordProfile;
    const form = formComponent.getForm();
    if (form) {
      this.props.changePassword = false;
      updatePassword(form);
    }
  }

  openUploadFile() {
    const modal = this.refs.modalUpload as ModalUploadFile;
    modal.open();
  }

  logout = () => {
    logout();
  };

  changeAvatar(file:File) {
    updateAvatar({ avatar: file });
  }

  protected render() {
    return `<div class="profile">
    {{{ ModalUploadFile ref="modalUpload" upload=changeAvatar input_name="avatar" labelButton="Поменять" accept="image/gif, image/jpeg, image/png" global=true}}}
    <div class="profile__form">
        <div class="profile__form__title">
            {{{ ProfileTitle title=user.first_name photo=user.avatar chagePhoto=true onClick=openUploadFile}}}
        </div>

        {{#if changePassword}}

          {{{ FormPasswordProfile ref="formPasswordProfile" }}}
          <div class="profile__form__btn">
            {{{ Button class="primary-button" label="Назад" onClick=back }}}
            {{{ Button class="primary-button" form=user label="Сохранить" onClick=savePassword}}}
          </div>

        {{else}}
          {{{ FormProfile ref="formProfile" readonly=readonlyForm form=user}}}

            {{#if (isEqual readonlyForm false)}}
              <div class="profile__form__btn">
              {{{Button class="primary-button" label="Назад" onClick=back}}}
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

export default connect(({ user, errorUpdateProfile }) => ({ user, errorUpdateProfile }))(PageProfile);
