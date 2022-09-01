import { h } from "snabbdom";

const initialState = {
    template: "",
    on: {}
  };

const createReducer = args => (acc, currentString, index) => {
    const currentArg = args[index];

    if (currentArg && currentArg.type === "event-click") {
        return { ...acc, on: { click: currentArg.click } };
    }
    if (currentArg && currentArg.type === "event-hover") {
        return { ...acc, on: { ...acc.on, mouseover: currentArg.click } };
    }

    return {
        ...acc,
        template: acc.template + currentString + (args[index] || "")
    };
};

const createElement = tagName => (strings, ...args) => {
    

    const { template, on } = strings.reduce(createReducer(args), initialState);
  
    return {
      type: "element",
      template: h(tagName, {on}, template)
    };
  };

export const div = createElement('div');




export class FreakElement implements NodeElement {

    name: string
    parentElementGroup: ElementGroup = undefined;
    strings;
    arguments;
    classes = '';

    constructor(name: string) {
        this.name = name;
    }
    
    setParams(strings, ...args) {
        this.strings = strings;
        this.arguments = args; 
        
        return this;
    }

    setClasses(classes: string[]): NodeElement {
        this.classes = classes.join(" ");
        return this;
    }


    render() {
        const { template, on } = this.strings.reduce(createReducer(this.arguments), initialState);
        const elementClasses = this.classes.length > 0 ?  { [`${this.classes}`]: true } : {};
        return {
            ...h(this.name, {on, class: elementClasses}, template)
          };
    }

}


export class ElementGroup implements NodeElement {

    name: string;
    parentElementGroup;
    elements: FreakElement[];

    classes = '';
    strings;
    arguments;

    constructor(name, elements) {
        this.name = name;
        this.elements = elements;
    }
    setParams(strings, ...args) {
        this.strings = strings;
        this.arguments = args; 
        
        return this;
    }

    setClasses(classes: string[]): NodeElement {
        this.classes = classes.join(" ");
        return this;
    }

    render() {
        const group = [];
        this.elements.forEach(element => {
            group.push(element.render())
        });
        const elementClasses = this.classes.length > 0 ?  { [`${this.classes}`]: true } : {};
        return {
            ...h(this.name, {class: elementClasses}, group)
          };
    }
}


interface NodeElement {
    parentElementGroup: ElementGroup;
    setParams(strings, ...args): NodeElement;
    setClasses(classes: string[]): NodeElement;
    render();
}