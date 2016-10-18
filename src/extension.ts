'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "smartinputmethod" is now active!');
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('1');
    });

    context.subscriptions.push(disposable);


class InputMethodAdaptor {
    
    private _chinese_input = 1;
    private _english_input = 2;
    
    private _is_comment_regex = /$[\#(\/\/)]/;
    
    public updateInputMethod () {
        if (!this._suggest_change_input_method()) {
            return;
        }
        
    }
    
    private _suggest_change_input_method (): Boolean {
        let editor = vscode.window.activeTextEditor;
        let line_text = this._current_line_text();
        let current_char = editor.selection.active.character;
        
        // 判断当前光标是否是在comment中
        if (line_text.match(this._is_comment_regex)) {
            return false;
        }
        // 判断当前光标是否是在字符串中
        return !this._is_in_a_string(line_text, current_char);
    }
    
    private _is_in_a_string(str: string, position): Boolean {
        if (!str) {
            return false;
        }
        let is_in_str = false;
        for (let c of str) {
            if (c == "'" || c == '"') {
                is_in_str = !is_in_str;
            }
        }
        return is_in_str;
    }
    
    private _current_line_text (): string {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return '';
        }
        let document = editor.document;
        let position = editor.selection.active;
        let current_line_number = position.line;
        return document.lineAt(current_line_number).text;
    }
    
}

// this method is called when your extension is deactivated
export function deactivate() {
}