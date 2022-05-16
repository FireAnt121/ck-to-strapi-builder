import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {toWidget, toWidgetEditable} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertSuccessboxCommand from "./insertsuccessboxcommand";

export default class Successboxediting extends Plugin {

    static get requires() {
        return [Widget];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertSuccessbox', new InsertSuccessboxCommand(this.editor));
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('successbox', {
            isObject: true,
            allowWhere: '$block'
        });

        schema.register('successboxIcon', {
            isObject: true,
            allowIn: 'successbox'
        })
        schema.register('successboxText', {
            isLimit: true,
            allowIn: 'successbox',
            allowContentOf: '$block'
        });

        schema.addChildCheck((context, childDefinition) => {
            if (context.endsWith('successboxText') && childDefinition.name == 'successbox') {
                return false;
            }
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for('upcast').elementToElement({
            model: 'successbox',
            view: {
                name: 'div',
                classes: 'avr-success-box'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'successbox',
            view: {
                name: 'div',
                classes: 'avr-success-box'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'successbox',
            view: (modelElement, {writer: viewWriter}) => {
                const div = viewWriter.createContainerElement('div', {class: 'avr-success-box'});
                return toWidget(div, viewWriter, {label: 'successbox'});
            }
        });
        conversion.for('upcast').elementToElement({
            model: (viewElement, {writer: viewWriter}) => {
                return viewWriter.createElement('successboxIcon');
            },
            view: {
                name: 'div',
                classes: 'avr-successbox-header'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'successboxIcon',
            view: (modelElement, {writer: viewWriter}) => {
                return viewWriter.createUIElement('div', {class: 'avr-successbox-header'}, function (domDocument) {
                    const domElement = this.toDomElement(domDocument);
                    domElement.innerHTML = `<div class="avr-successbox-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22V22ZM13.705 8.295L11.015 13.4325L9.08625 11.695C8.9642 11.5852 8.82172 11.5005 8.66694 11.4457C8.51216 11.391 8.3481 11.3672 8.18415 11.3759C8.0202 11.3845 7.85955 11.4254 7.71139 11.4961C7.56322 11.5669 7.43044 11.6661 7.32063 11.7881C7.21081 11.9102 7.1261 12.0527 7.07135 12.2074C7.0166 12.3622 6.99287 12.5263 7.00152 12.6902C7.01016 12.8542 7.05102 13.0148 7.12175 13.163C7.19248 13.3112 7.2917 13.4439 7.41375 13.5538L10.5388 16.3663C10.6803 16.4938 10.8492 16.5872 11.0325 16.6395C11.2157 16.6917 11.4085 16.7014 11.596 16.6678C11.7836 16.6341 11.9609 16.558 12.1146 16.4453C12.2682 16.3326 12.3941 16.1863 12.4825 16.0175L15.92 9.455C16.0738 9.16127 16.1047 8.81847 16.0057 8.502C15.9068 8.18553 15.6862 7.92133 15.3925 7.7675C15.0988 7.61367 14.756 7.58283 14.4395 7.68176C14.123 7.78068 13.8588 8.00127 13.705 8.295V8.295Z" fill="currentColor"></path></svg>
                                            </div>`;
                    return domElement;
                });
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'successboxIcon',
            view: (modelElement, {writer: viewWriter}) => {
                return viewWriter.createUIElement('div', {class: 'avr-successbox-header'}, function (domDocument) {
                    const domElement = this.toDomElement(domDocument);
                    domElement.innerHTML = `<div class="avr-successbox-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22V22ZM13.705 8.295L11.015 13.4325L9.08625 11.695C8.9642 11.5852 8.82172 11.5005 8.66694 11.4457C8.51216 11.391 8.3481 11.3672 8.18415 11.3759C8.0202 11.3845 7.85955 11.4254 7.71139 11.4961C7.56322 11.5669 7.43044 11.6661 7.32063 11.7881C7.21081 11.9102 7.1261 12.0527 7.07135 12.2074C7.0166 12.3622 6.99287 12.5263 7.00152 12.6902C7.01016 12.8542 7.05102 13.0148 7.12175 13.163C7.19248 13.3112 7.2917 13.4439 7.41375 13.5538L10.5388 16.3663C10.6803 16.4938 10.8492 16.5872 11.0325 16.6395C11.2157 16.6917 11.4085 16.7014 11.596 16.6678C11.7836 16.6341 11.9609 16.558 12.1146 16.4453C12.2682 16.3326 12.3941 16.1863 12.4825 16.0175L15.92 9.455C16.0738 9.16127 16.1047 8.81847 16.0057 8.502C15.9068 8.18553 15.6862 7.92133 15.3925 7.7675C15.0988 7.61367 14.756 7.58283 14.4395 7.68176C14.123 7.78068 13.8588 8.00127 13.705 8.295V8.295Z" fill="currentColor"></path></svg>
                                            </div>`;

                    return domElement;
                });
            }
        });

        conversion.for('upcast').elementToElement({
            model: 'successboxText',
            view: {
                name: 'div',
                classes: 'avr-success-box-text'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'successboxText',
            view: {
                name: 'div',
                classes: 'avr-success-box-text'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'successboxText',
            view: (modelElement, {writer: viewWriter}) => {

                const h1 = viewWriter.createEditableElement('div', {class: 'avr-success-box-text'});
                return toWidgetEditable(h1, viewWriter);
            }
        });
    }
}
