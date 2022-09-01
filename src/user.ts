import { createComponent } from "../freak";
import { div, ElementGroup, FreakElement } from "../freak/element";
import { onClick, onHover } from "../freak/event";


const initialState = { firstName: "Juan pablo", lastName: "Pardal" };
const methods = {
    changeName: (state, firstName) => ({ ...state, firstName })
};

const template = ({firstName, lastName, methods}) => {
    const handleClick = () => {
        fetch('https://dummy.restapiexample.com/api/v1/employee/1')
        .then(res => res.json())
        .then(res => methods.changeName(res.data.employee_name))
    };
    const handlehover = () => console.log('hoverr');

    return new ElementGroup('div', [
        new FreakElement('div.clase-prueba').setParams`${onClick(handleClick)} hola como estas? ${firstName}`.setClasses(['class-1']), new FreakElement('div').setParams`TODO BIEN. VOS? ${lastName}`.setClasses(['class-2']),
        new ElementGroup('div', [new FreakElement('div').setParams`contenedor 2? ${firstName}`, new FreakElement('div').setParams`Si, contenedor 2. ${lastName}`])]).setClasses(['container-1'])
    .render();

   // return div`${onClick(handleClick)} ${firstName} ${lastName} ${onHover(handlehover)}`
}

export const User = createComponent({template, methods, initialState });

    
