import Handlebars from "handlebars";
import './style.css'
export {default as PageProfile} from './index.hbs?raw'

Handlebars.registerHelper("profileForm", () => [
    {
        label:'Почта',
        value:'pochta@yandex.ru',
        type:'email',
        readonly:true
    },
    {
        label:'Логин',
        value:'ivanivanov',
        type:'text',
        readonly:true
    },
    {
        label:'Имя',
        value:'Иван',
        type:'text',
        readonly:true
    },
    {
        label:'Фамилия',
        value:'Иванов',
        type:'text',
        readonly:true
    },
    {
        label:'Имя в чате',
        value:'Иван',
        type:'text',
        readonly:true
    },
    {
        label:'Телефон',
        value:'+7 (909) 967 30 30F',
        type:'text',
        readonly:true
    }
])
