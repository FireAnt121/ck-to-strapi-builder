// simplebox/insertsimpleboxcommand.js

import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertErrorboxCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( createErrorBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'errorbox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createErrorBox( writer ) {
    const errorbox = writer.createElement( 'errorbox' );
    const errorboxText = writer.createElement( 'errorboxText' );
    const errorboxIcon = writer.createElement('errorboxIcon');

    writer.append(errorboxIcon, errorbox);
    writer.append( errorboxText, errorbox );

    return errorbox;
}
