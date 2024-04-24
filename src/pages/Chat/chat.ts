import { Block, Props } from "../../core/Block";
import menu from "../../assets/menu.svg";
import photo1 from "../../assets/test_photo.jpg";
import photo2 from "../../assets/test_photo2.png";

export class PageChat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      menu,
      listMessage: [
        {
          day: "19 июня",
          messages: [
            {
              type: "text",
              value:
                "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
              myMessage: false,
              time: "10:30",
            },
            {
              type: "text",
              value: "asd",
              myMessage: true,
              time: "10:30",
            },
            {
              type: "photo",
              value: photo1,
              myMessage: false,
              time: "10:30",
            },
            {
              type: "photo",
              value: photo2,
              myMessage: true,
              time: "10:31",
            },
          ],
        },
      ],
    });
  }
  protected render() {
    return `
        {{# PageSelectedChats component=true}}
            <div class="container-chat">
                    <div class="container-chat__profile">
                        {{{ CardUser name="Вадим" photo=photo_user }}}
                        <div class="container-chat__profile__menu">
                            <img src="{{menu}}" alt="Иконка"/>
                        </div>
                    </div>
                    <div class="container-chat__element">
                        {{{ Chat listMessage=listMessage }}}
                    </div>
                    <div class="container-chat__input">
                        <div class="container-chat__input__attacher">
                            <img src="{{attacher}}" alt="Иконка"/>
                        </div>
                        <div class="container-chat__input__element">
                            {{{ InputMessage placeholder="Сообщение" }}}
                        </div>
                        <div class="container-chat__input__button">
                                <img src="{{arrow_circle}}" alt="Иконка">
                        </div>
                </div>
            </div>
        {{/PageSelectedChats}}`;
  }
}
