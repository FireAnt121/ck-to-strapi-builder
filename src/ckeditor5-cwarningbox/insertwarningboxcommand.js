// simplebox/insertsimpleboxcommand.js

import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertInfoboxCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( createWarning( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'warningbox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createWarning( writer ) {
    const warningbox = writer.createElement( 'warningbox' );
    const warningboxText = writer.createElement( 'warningboxText' );
    const warningboxIcon = writer.createElement('warningboxIcon');

    writer.append(warningboxIcon, warningbox);
    writer.append( warningboxText, warningbox );

    return warningbox;
}
