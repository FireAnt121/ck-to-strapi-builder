import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {toWidget, toWidgetEditable} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertErrorboxCommand from './inserterrorboxcommand';

export default class Errorboxediting extends Plugin {

    static get requires() {
        return [Widget];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertErrorbox', new InsertErrorboxCommand(this.editor));
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('errorbox', {
            isObject: true,
            allowWhere: '$block'
        });

        schema.register('errorboxIcon', {
            isObject: true,
            allowIn: 'errorbox'
        })
        schema.register('errorboxText', {
            isLimit: true,
            allowIn: 'errorbox',
            allowContentOf: '$block'
        });

        schema.addChildCheck((context, childDefinition) => {
            if (context.endsWith('errorboxText') && childDefinition.name == 'errorbox') {
                return false;
            }
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for('upcast').elementToElement({
            model: 'errorbox',
            view: {
                name: 'div',
                classes: 'avr-error-box'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'errorbox',
            view: {
                name: 'div',
                classes: 'avr-error-box'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'errorbox',
            view: (modelElement, {writer: viewWriter}) => {
                const div = viewWriter.createContainerElement('div', {class: 'avr-error-box'});
                return toWidget(div, viewWriter, {label: 'errorbox'});
            }
        });
        conversion.for('upcast').elementToElement({
            model: (viewElement, {writer: viewWriter}) => {
                return viewWriter.createElement('errorboxIcon');
            },
            view: {
                name: 'div',
                classes: 'avr-errorbox-header'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'errorboxIcon',
            view: (modelElement, {writer: viewWriter}) => {
                return viewWriter.createUIElement('div', {class: 'avr-errorbox-header'}, function (domDocument) {
                    const domElement = this.toDomElement(domDocument);
                    domElement.innerHTML = `<div class="avr-errorbox-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8562 11.9112L16.5088 9.26C16.7433 9.02545 16.8751 8.70733 16.8751 8.37563C16.8751 8.04392 16.7433 7.7258 16.5088 7.49125C16.2742 7.2567 15.9561 7.12493 15.6244 7.12493C15.2927 7.12493 14.9746 7.2567 14.74 7.49125L12.09 10.1438L9.4375 7.49125C9.20295 7.25686 8.8849 7.12526 8.55331 7.12537C8.22172 7.12549 7.90376 7.25732 7.66937 7.49188C7.43499 7.72643 7.30338 8.04448 7.3035 8.37607C7.30361 8.70766 7.43545 9.02561 7.67 9.26L10.32 11.91L7.67 14.5625C7.4423 14.7983 7.31631 15.114 7.31916 15.4418C7.32201 15.7695 7.45347 16.083 7.68523 16.3148C7.91699 16.5465 8.2305 16.678 8.55825 16.6808C8.88599 16.6837 9.20175 16.5577 9.4375 16.33L12.0888 13.68L14.74 16.33C14.8561 16.4461 14.9939 16.5383 15.1455 16.6012C15.2972 16.664 15.4597 16.6964 15.6239 16.6965C15.7881 16.6966 15.9507 16.6643 16.1024 16.6015C16.2541 16.5387 16.392 16.4467 16.5081 16.3306C16.6243 16.2146 16.7164 16.0768 16.7793 15.9251C16.8422 15.7734 16.8746 15.6109 16.8746 15.4467C16.8747 15.2825 16.8424 15.1199 16.7796 14.9682C16.7168 14.8165 16.6248 14.6786 16.5088 14.5625L13.8562 11.9112V11.9112ZM12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22V22Z" fill="currentColor"></path></svg>
                           </div>`;
                    return domElement;
                });
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'errorboxIcon',
            view: (modelElement, {writer: viewWriter}) => {
                return viewWriter.createUIElement('div', {class: 'avr-errorbox-header'}, function (domDocument) {
                    const domElement = this.toDomElement(domDocument);
                    domElement.innerHTML = `<div class="avr-errorbox-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.8562 11.9112L16.5088 9.26C16.7433 9.02545 16.8751 8.70733 16.8751 8.37563C16.8751 8.04392 16.7433 7.7258 16.5088 7.49125C16.2742 7.2567 15.9561 7.12493 15.6244 7.12493C15.2927 7.12493 14.9746 7.2567 14.74 7.49125L12.09 10.1438L9.4375 7.49125C9.20295 7.25686 8.8849 7.12526 8.55331 7.12537C8.22172 7.12549 7.90376 7.25732 7.66937 7.49188C7.43499 7.72643 7.30338 8.04448 7.3035 8.37607C7.30361 8.70766 7.43545 9.02561 7.67 9.26L10.32 11.91L7.67 14.5625C7.4423 14.7983 7.31631 15.114 7.31916 15.4418C7.32201 15.7695 7.45347 16.083 7.68523 16.3148C7.91699 16.5465 8.2305 16.678 8.55825 16.6808C8.88599 16.6837 9.20175 16.5577 9.4375 16.33L12.0888 13.68L14.74 16.33C14.8561 16.4461 14.9939 16.5383 15.1455 16.6012C15.2972 16.664 15.4597 16.6964 15.6239 16.6965C15.7881 16.6966 15.9507 16.6643 16.1024 16.6015C16.2541 16.5387 16.392 16.4467 16.5081 16.3306C16.6243 16.2146 16.7164 16.0768 16.7793 15.9251C16.8422 15.7734 16.8746 15.6109 16.8746 15.4467C16.8747 15.2825 16.8424 15.1199 16.7796 14.9682C16.7168 14.8165 16.6248 14.6786 16.5088 14.5625L13.8562 11.9112V11.9112ZM12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22V22Z" fill="currentColor"></path></svg>
                           </div>`;

                    return domElement;
                });
            }
        });

        conversion.for('upcast').elementToElement({
            model: 'errorboxText',
            view: {
                name: 'div',
                classes: 'avr-error-box-text'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'errorboxText',
            view: {
                name: 'div',
                classes: 'avr-error-box-text'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'errorboxText',
            view: (modelElement, {writer: viewWriter}) => {

                const h1 = viewWriter.createEditableElement('div', {class: 'avr-error-box-text'});
                return toWidgetEditable(h1, viewWriter);
            }
        });
    }
}
