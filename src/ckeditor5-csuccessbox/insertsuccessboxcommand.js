import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSuccessboxCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( createSuccess( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'successbox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSuccess( writer ) {
    const successbox = writer.createElement( 'successbox' );
    const successboxText = writer.createElement( 'successboxText' );
    const successboxIcon = writer.createElement('successboxIcon');

    writer.append(successboxIcon, successbox);
    writer.append( successboxText, successbox );

    return successbox;
}
