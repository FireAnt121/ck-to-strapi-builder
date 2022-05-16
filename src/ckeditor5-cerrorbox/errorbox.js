import ErrorboxEditing from './errorboxediting'
import ErrorboxUi from './errorboxui'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class Errorbox extends Plugin{
    static get requires(){
        return [ErrorboxEditing, ErrorboxUi]
    }
}
