import { Block, Props } from '../../core/Block';

export class CardUser extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const fn = props.onClick;
          if (fn instanceof Function) fn(event, this.props.id);
        },
      },
    });
  }

  protected render() {
    return `<div class="card-user {{class}}">
    <div class="card-user__profile">
      <div class="card-user__profile__photo">
        <img src="{{photo}}" alt="Фото"/>
      </div>
      <div class="card-user__profile__text">
        <h3>{{name}}</h3>
        {{#if meMessage}}
          <p> <span>Вы: </span> {{meMessage}}</p>
        {{/if}}
        {{#if message}}
          <p>{{message}}</p>
        {{/if}}
      </div>
    </div>
    <div class="card_user__info">
      {{#if time}}
        <p class="card_user__info__time">{{time}}</p>
      {{/if}}
      {{#if count}}
        <div class="card_user__info__count">{{count}}</div>
      {{/if}}
    </div>
  </div>
  `;
  }
}
