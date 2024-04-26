import { Block, Props } from "../../core/Block";

export class ProfileTitle extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render() {
    return `<div class="profile-title">
    <div class="profile-title__photo">
      <img class="profile-title__photo__element" src="{{photo}}" alt="Фото"/>
      {{#if chagePhoto}}
        <div class="profile-title__photo__upload">
          <p>Поменять аватар</p>
        </div>
      {{/if}}
    </div>
    {{#if title}}
      <h2>{{title}}</h2>
    {{/if}}
  </div>
  
  `;
  }
}
