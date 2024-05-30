import { Block, Props } from '../../core/Block';

export class Chat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        scroll: (event:Event) => this.scrollTopEevent(event),
      },
    });
  }

  scrollBottomChat() {
    this.element?.scrollTo(0, this.element?.scrollHeight);
  }

  scrollToOldHeight(value:number) {
    this.element?.scrollTo(0, this.element.scrollHeight - value);
  }

  scrollTopEevent(event:Event) {
    const target = event.target as Element;
    if (target.scrollTop === 0 && this.props.scrollTop instanceof Function) {
      this.props.scrollTop(target.scrollHeight);
    }
  }

  protected render() {
    return `<div class="chat">
    <div></div>
    {{#each listMessage }}
      <div class="message-day">{{this.day}}</div>
      {{#each this.messages}}
      <div class="chat__container-message 
          {{#if this.myMessage}} myMessage 
          {{else}}
          notMyMessage
          {{/if}}">
          <div class="
          chat__container-message__element
          {{#if (isEqual type "photo")}}photo{{/if}}
          end_message
          ">
              {{{ Message type=this.type value=this.value time=this.time }}}
          </div>
      </div>
      {{/each}}
    {{/each}}
  </div>`;
  }
}
