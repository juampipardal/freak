import 'reflect-metadata';
import { classModule, eventListenersModule, init } from "snabbdom";
import { Header } from './decorators/component.decorator';


const patch = init([
    classModule,
    eventListenersModule
]);

export const startup = (selector: string, component) => {
    const app = document.querySelector(selector);
    patch(app, component)
};

let state = {};

export const createComponent = ({
    template,
    methods = {},
    initialState = {}
  }) =>{

    state = initialState;
    let previous;

    const mappedMethods = props =>
      Object.keys(methods).reduce(
        (acc, key) => ({
          ...acc,
          [key]: (...args) => {
            state = methods[key](state, ...args);
            const nextNode = template({
              ...props,
              ...state,
              methods: mappedMethods(props)
            });
            patch(previous, nextNode);
            previous = nextNode;
            return state;
          }
        }),
        {}
      );
  
    return props => {
      previous = template({ ...props, ...state, methods: mappedMethods(props) });
      return previous;
    };
  } 
  