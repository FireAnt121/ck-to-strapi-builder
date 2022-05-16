import SuccessboxEditing from './successboxediting'
import SuccessboxUi from './successboxui'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class Successbox extends Plugin{
    static get requires(){
        return [SuccessboxEditing, SuccessboxUi]
    }
}
