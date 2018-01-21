import React, { Component } from 'react';
import styles from '../styles/codebox.css'
const {dialog} = window.require('electron').remote
const ReactDom = require('react-dom');  

var fs = require('fs');

const CodeMirror = require('codemirror');


require('codemirror/mode/stex/stex.js')
require('codemirror/addon/selection/active-line');  
require('codemirror/addon/edit/matchbrackets');

class CodeBox extends Component {  
    constructor(props) {
        super()
        this.file = null;
        
    }
    componentDidMount() {
        const code = ReactDom.findDOMNode(this);

        this.doc = CodeMirror(code, {
            value: "// open a tex file...",
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            mode:  "stex",
            theme: 'seti'
        });
    }

    shouldComponentUpdate(props) {
        if (props.file !== this.file) {
            this.file = props.file;
            
            this.loadFile();
        }

        return false;
    }

    loadFile() {
        var codebox = this;
        fs.readFile(this.file, 'utf8', function(err, data){
            codebox.doc.setValue(data);
        });
        
    }
    save() {
        if (!this.file) {
            var codebox = this;
            dialog.showSaveDialog(
                {
                    filters: [
                        {name: 'LaTeX File', extensions: ['tex']},
                        {name: 'All Files', extensions: ['*']}
                    ]
                },
                (fileName) => {
                if (fileName === undefined){
                    console.log("You didn't save the file");
                    return;
                }
                // fileName is a string that contains the path and filename created in the save file dialog.  
                fs.writeFile(fileName, codebox.doc.getValue(), (err) => {
                    if(err){
                        alert("An error ocurred creating the file "+ err.message)
                    }       
                    // alert("The file has been succesfully saved");
                });
            }); 
        }
        else {
            fs.writeFileSync(this.file, this.doc.getValue(), 'utf8');
            // alert("保存成功");
        }
        
    }

    render() {
        return <div className="codebox" />;
    }
}

export default CodeBox; 