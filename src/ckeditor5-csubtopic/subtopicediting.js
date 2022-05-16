import { Plugin } from 'ckeditor5/src/core';
import AttributeCommand from '@ckeditor/ckeditor5-basic-styles/src/attributecommand';

const SUBTOPIC = 'subtopic';

export default class SubtopicEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SubtopicEditing';
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;

        editor.model.schema.extend( '$text', { allowAttributes: SUBTOPIC } );
        editor.model.schema.setAttributeProperties( SUBTOPIC, {
            isFormatting: true,
            copyOnEnter: true
        } );

        editor.conversion.attributeToElement( {
            model: SUBTOPIC,
            view: {name: 'span', classes:'sub-topic'},
            upcastAlso: [
                'span',
                viewElement => {
                        return {
                            name: 'span',
                            classes: [ 'sub-topic' ]
                        };
                }
            ]
        } );

        editor.commands.add( SUBTOPIC, new AttributeCommand( editor, SUBTOPIC ) );
    }
}
