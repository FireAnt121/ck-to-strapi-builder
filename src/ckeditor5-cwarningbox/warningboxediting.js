import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {toWidget, toWidgetEditable} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertWarningboxCommand from './insertwarningboxcommand';

export default class Warningboxediting extends Plugin {

    static get requires() {
        return [Widget];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertWarningbox', new InsertWarningboxCommand(this.editor));
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('warningbox', {
            isObject: true,
            allowWhere: '$block'
        });

        schema.register('warningboxIcon', {
            isObject: true,
            allowIn: 'warningbox'
        })
        schema.register('warningboxText', {
            isLimit: true,
            allowIn: 'warningbox',
            allowContentOf: '$block'
        });

        schema.addChildCheck((context, childDefinition) => {
            if (context.endsWith('warningboxText') && childDefinition.name == 'warningbox') {
                return false;
            }
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for('upcast').elementToElement({
            model: 'warningbox',
            view: {
                name: 'div',
                classes: 'avr-warning-box'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'warningbox',
            view: {
                name: 'div',
                classes: 'avr-warning-box'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'warningbox',
            view: (modelElement, {writer: viewWriter}) => {
                const div = viewWriter.createContainerElement('div', {class: 'avr-warning-box'});
                return toWidget(div, viewWriter, {label: 'warningbox'});
            }
        });
        conversion.for('upcast').elementToElement({
            model: (viewElement, {writer: viewWriter}) => {
                return viewWriter.createElement('warningboxIcon');
            },
            view: {
                name: 'div',
                classes: 'avr-warningbox-header'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'warningboxIcon',
            view: (modelElement, {writer: viewWriter}) => {
                return viewWriter.createUIElement('div', {class: 'avr-warningbox-header'}, function (domDocument) {
                    const domElement = this.toDomElement(domDocument);
                    domElement.innerHTML = `<div class="avr-warningbox-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4897 4.34592L21.8561 18.8611C21.9525 19.0288 22.0021 19.2181 21.9999 19.4101C21.9977 19.6021 21.9438 19.7903 21.8435 19.9559C21.7432 20.1215 21.6001 20.2588 21.4282 20.3542C21.2563 20.4497 21.0616 20.4999 20.8636 20.5H3.13707C2.93882 20.5 2.74401 20.4498 2.57196 20.3543C2.39992 20.2588 2.25663 20.1213 2.15631 19.9556C2.05598 19.7898 2.00212 19.6015 2.00006 19.4093C1.998 19.2171 2.04782 19.0278 2.14456 18.86L10.5121 4.34592C10.6602 4.08939 10.8762 3.87577 11.1377 3.72708C11.3993 3.57838 11.6971 3.5 12.0003 3.5C12.3036 3.5 12.6013 3.57838 12.8629 3.72708C13.1245 3.87577 13.3404 4.08939 13.4885 4.34592H13.4897ZM12.0003 7.82538C11.8232 7.82537 11.6482 7.86212 11.4869 7.93317C11.3257 8.00423 11.182 8.10793 11.0656 8.2373C10.9492 8.36668 10.8627 8.51872 10.8119 8.68321C10.7611 8.8477 10.7473 9.02083 10.7713 9.19093L11.3546 13.3416C11.3754 13.4933 11.4523 13.6326 11.5711 13.7334C11.6899 13.8343 11.8424 13.8899 12.0003 13.8899C12.1582 13.8899 12.3107 13.8343 12.4295 13.7334C12.5483 13.6326 12.6253 13.4933 12.6461 13.3416L13.2293 9.19093C13.2533 9.02083 13.2395 8.8477 13.1887 8.68321C13.138 8.51872 13.0515 8.36668 12.935 8.2373C12.8186 8.10793 12.6749 8.00423 12.5137 7.93317C12.3525 7.86212 12.1774 7.82537 12.0003 7.82538V7.82538ZM12.0003 17.3369C12.3395 17.3369 12.6649 17.2062 12.9047 16.9737C13.1446 16.7412 13.2793 16.4258 13.2793 16.0969C13.2793 15.7681 13.1446 15.4527 12.9047 15.2202C12.6649 14.9877 12.3395 14.857 12.0003 14.857C11.6611 14.857 11.3358 14.9877 11.0959 15.2202C10.8561 15.4527 10.7213 15.7681 10.7213 16.0969C10.7213 16.4258 10.8561 16.7412 11.0959 16.9737C11.3358 17.2062 11.6611 17.3369 12.0003 17.3369V17.3369Z" fill="currentColor"></path></svg>
                           </div>`;
                    return domElement;
                });
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'warningboxIcon',
            view: (modelElement, {writer: viewWriter}) => {
                return viewWriter.createUIElement('div', {class: 'avr-warningbox-header'}, function (domDocument) {
                    const domElement = this.toDomElement(domDocument);
                    domElement.innerHTML = `<div class="avr-warningbox-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4897 4.34592L21.8561 18.8611C21.9525 19.0288 22.0021 19.2181 21.9999 19.4101C21.9977 19.6021 21.9438 19.7903 21.8435 19.9559C21.7432 20.1215 21.6001 20.2588 21.4282 20.3542C21.2563 20.4497 21.0616 20.4999 20.8636 20.5H3.13707C2.93882 20.5 2.74401 20.4498 2.57196 20.3543C2.39992 20.2588 2.25663 20.1213 2.15631 19.9556C2.05598 19.7898 2.00212 19.6015 2.00006 19.4093C1.998 19.2171 2.04782 19.0278 2.14456 18.86L10.5121 4.34592C10.6602 4.08939 10.8762 3.87577 11.1377 3.72708C11.3993 3.57838 11.6971 3.5 12.0003 3.5C12.3036 3.5 12.6013 3.57838 12.8629 3.72708C13.1245 3.87577 13.3404 4.08939 13.4885 4.34592H13.4897ZM12.0003 7.82538C11.8232 7.82537 11.6482 7.86212 11.4869 7.93317C11.3257 8.00423 11.182 8.10793 11.0656 8.2373C10.9492 8.36668 10.8627 8.51872 10.8119 8.68321C10.7611 8.8477 10.7473 9.02083 10.7713 9.19093L11.3546 13.3416C11.3754 13.4933 11.4523 13.6326 11.5711 13.7334C11.6899 13.8343 11.8424 13.8899 12.0003 13.8899C12.1582 13.8899 12.3107 13.8343 12.4295 13.7334C12.5483 13.6326 12.6253 13.4933 12.6461 13.3416L13.2293 9.19093C13.2533 9.02083 13.2395 8.8477 13.1887 8.68321C13.138 8.51872 13.0515 8.36668 12.935 8.2373C12.8186 8.10793 12.6749 8.00423 12.5137 7.93317C12.3525 7.86212 12.1774 7.82537 12.0003 7.82538V7.82538ZM12.0003 17.3369C12.3395 17.3369 12.6649 17.2062 12.9047 16.9737C13.1446 16.7412 13.2793 16.4258 13.2793 16.0969C13.2793 15.7681 13.1446 15.4527 12.9047 15.2202C12.6649 14.9877 12.3395 14.857 12.0003 14.857C11.6611 14.857 11.3358 14.9877 11.0959 15.2202C10.8561 15.4527 10.7213 15.7681 10.7213 16.0969C10.7213 16.4258 10.8561 16.7412 11.0959 16.9737C11.3358 17.2062 11.6611 17.3369 12.0003 17.3369V17.3369Z" fill="currentColor"></path></svg>
                           </div>`;

                    return domElement;
                });
            }
        });

        conversion.for('upcast').elementToElement({
            model: 'warningboxText',
            view: {
                name: 'div',
                classes: 'avr-warning-box-text'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'warningboxText',
            view: {
                name: 'div',
                classes: 'avr-warning-box-text'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'warningboxText',
            view: (modelElement, {writer: viewWriter}) => {

                const h1 = viewWriter.createEditableElement('div', {class: 'avr-warning-box-text'});
                return toWidgetEditable(h1, viewWriter);
            }
        });
    }
}
