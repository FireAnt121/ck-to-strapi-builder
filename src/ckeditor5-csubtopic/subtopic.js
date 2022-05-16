
import { Plugin } from 'ckeditor5/src/core';
import SubtopicEditing from './subtopicediting';
import SubtopicUI from './subtopicui';

export default class Subtopic extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [ SubtopicEditing, SubtopicUI ];
    }

    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'Subtopic';
    }
}
