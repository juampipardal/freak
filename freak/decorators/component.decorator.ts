export interface Type<T> {
    new (...args: any[]): T;
}


export const FreakComponent = (props: {selector: string, styles: Record<string, string>}) => {
    return  <T>(target: Type<T>) => {
        Reflect.defineMetadata('selector', props.selector, target);
        Reflect.defineMetadata('styles', props.styles, target);
    };
};


@FreakComponent({
    selector: 'div',
    styles: {'backgroundColor': 'red'}
})
export class Header {

}