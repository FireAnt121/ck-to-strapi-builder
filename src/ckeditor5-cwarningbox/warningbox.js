import WarningboxEditing from './warningboxediting'
import WarningboxUi from './warningboxui'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class Warningbox extends Plugin{
    static get requires(){
        return [WarningboxEditing, WarningboxUi]
    }
}
