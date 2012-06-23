/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** Comment */
define(function (require, exports, module) {
    'use strict';

    var CommandManager = brackets.getModule("command/CommandManager"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        Commands = brackets.getModule("command/Commands"),
        EditorManager = brackets.getModule("editor/EditorManager"),
        PreferencesManager      = brackets.getModule("preferences/PreferencesManager"),
        Menus          = brackets.getModule("command/Menus");

    var PREFERENCES_CLIENT_ID = "com.adobe.silverma.CustomKeys",
        defaultPrefs = { customKeyMap: {} };

    function CtrlYtoCtrlF() {
        var editor = EditorManager.getFocusedEditor();
        editor.setCursorPos(editor.getCursorPos().line, editor.getCursorPos().ch - 1);
        //CodeMirror.commands.goCharLeft(editor);
        var doc = editor.document;

        var k = 70;
        var oEvent = window.document.createEvent('KeyboardEvent');
        // Chromium Hack
        Object.defineProperty(oEvent, 'keyCode', {
            get : function () {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(oEvent, 'which', {
            get : function () {
                return this.keyCodeVal;
            }
        });

        if (oEvent.initKeyboardEvent) {
            oEvent.initKeyboardEvent("keydown", true, true, window, "", 0, true, false, false, false, false);
        } else {
            oEvent.initKeyEvent("keydown", true, true, window.document.defaultView, false, false, false, false, k, 0);
        }

        oEvent.keyCodeVal = k;

        if (oEvent.keyCode !== k) {
            alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
        }

        window.document.body.dispatchEvent(oEvent);
        //var keyEvent = window.document.createEvent("KeyboardEvent");
        // This is a lovely method signature
        //keyEvent.initKeyboardEvent("onkeydown", true, true, window.document.defaultView, "U+0046", 0, "", false, "en_US");
        //window.dispatchEvent(keyEvent);

        // you may want to prevent default here
    }

    // Function to run when the menu item is clicked
    function handleCustomKeys() {

    }

    // Ctrl-G
    // Alt/CMD-<
    // Alt/CMD->
    // Ctrl-V
    // Alt/CMD-Shift-V
    // Ctrl-K
    // Ctrl-Y
    // Ctrl-R

    // Ctrl-X Ctrl-S 
    // Ctrl-X Ctrl-F

    function addCustomKey(commandID, keyBindings, platform) {
        //rememberDefaultKey(keyBindings, platform);
        KeyBindingManager.removeBinding(keyBindings, brackets.platform);
        KeyBindingManager.addBinding(commandID, keyBindings);
    }
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "customkeys.setKeyDialog";
    CommandManager.register("Custom keys...", MY_COMMAND_ID, CtrlYtoCtrlF);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(MY_COMMAND_ID);
    
    // We could also add a key binding at the same time:
    //menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-H");
    // (Note: "Ctrl" is automatically mapped to "Cmd" on Mac)
    
    // Or you can add a key binding without having to create a menu item:
    // KeyBindingManager.addBinding(MY_COMMAND_ID, "Ctrl-Alt-H");
    addCustomKey(Commands.EDIT_FIND, "Ctrl-S", brackets.platform);
    KeyBindingManager.removeBinding("Ctrl-F", brackets.platform);
    addCustomKey(MY_COMMAND_ID, "Ctrl-Y", brackets.platform);
    KeyBindingManager.removeBinding("Ctrl-N", brackets.platform);
    KeyBindingManager.removeBinding("Ctrl-A", brackets.platform);
    KeyBindingManager.removeBinding("Ctrl-E", brackets.platform);
    var $edit = $('#editor-holder');
    $edit.bind("keydown", function (event) {
        if (event.keyCode === 89 || event.keyCode === 27) {  // Enter/Return key or Esc key
            event.stopPropagation();
            event.preventDefault();
            alert("here");
        }
    });

    //var m = KeyBindingManager.getKeymap();
});