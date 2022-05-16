import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';


const SUBTOPIC = 'subtopic';

export default class SubtopicUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'SubtopicUI';
    }

    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;

        editor.ui.componentFactory.add( SUBTOPIC, locale => {
            const command = editor.commands.get( SUBTOPIC );
            const view = new ButtonView( locale );

            view.set( {
                label: t( 'Sub Topic' ),
                withText:true,
                tooltip: true,
                isToggleable: true
            } );

            view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute command.
            this.listenTo( view, 'execute', () => {
                editor.execute( SUBTOPIC );
                editor.editing.view.focus();
            } );

            return view;
        } );
    }
}
