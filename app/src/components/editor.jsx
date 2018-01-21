import React, {Component} from 'react'
import {shell} from 'electron'
const {dialog} = window.require('electron').remote
import styles from '../styles/editor.css'
// import '../../../node_modules/mathlive/dist/mathlive.css'
// import '../../../node_modules/mathlive/dist/mathlive.core.css'

import CodeBox from './codebox.jsx';

import SplitPane from 'react-split-pane';

const ReactDom = require('react-dom');  
var mathlive = require('mathlive')
var keyboardJS = require('keyboardjs')
var gulp = require('gulp');
var rename = require('gulp-rename');
var pdflatex2 = require('gulp-pdflatex2');

class Editor extends Component{
    constructor(props) {
        super(props);

        this.id = 0;
        keyboardJS.bind('up', function(e){
            var focusEle = document.activeElement;
            console.log(focusEle)
            console.log('fuck you')
            var eleId = Number(focusEle.id.substr(9));
            var newFocusEle = document.getElementById('math-area'+(eleId-1).toString());
            newFocusEle.focus();
        });

        keyboardJS.bind('down', function(e){
            var focusEle = document.activeElement;
            var eleId = Number(focusEle.id.substr(9));
            var newFocusEle = document.getElementById('math-area'+(eleId+1).toString());
            newFocusEle.focus();
        });

        this.state = {
            file: null
        };
    }

    render() {
        return <div id="editor">
            <div id='toolbar'>
                <button className="cyan openbutton" onClick={
                    ()=>{
                        // use editor to store "this" to avoid overriding
                        var editor = this;
                        dialog.showOpenDialog(
                            { 
                                filters: [
                                    {name: 'LaTeX File', extensions: ['tex']},
                                    {name: 'All Files', extensions: ['*']}
                                ]
                            },
                            function (fileNames) {
                            if(fileNames === undefined){
                                console.log("No file selected");
                            }
                            else{
                                
                                editor.setState({file:fileNames[0]});                        
                                
                            }
                        })
                    }
                }>          
                open</button>

                <button className="blue" onClick={
                    
                    ()=>{
                        
                        // this.refs.codebox.save();
                        
                    }
                }>save</button>
                
                <button className="pink" onClick={
                    () => {
                        
                        gulp.task('latex', () => {
                            return gulp.src(this.state.file).on('end', function() { console.log('fuck you! success')})
                              .pipe(pdflatex2({
                                keepIntermediateFiles: './tmp'
                              }))
                            //   .pipe(rename(function(path) {
                            //     path.dirname += '/output';
                            //   }))
                              .pipe(gulp.dest('./'));
                        });
                        // console.log(gulp)

                    }
                }>compile</button>

                <button className="toggle-preview" onClick={
                    () => {
                        var element = document.getElementById('preview');
                        katex.render(this.refs.codebox.doc.getValue(), element); 
                        console.log(this.refs.codebox.doc.getValue())                       
                    }
                }>preview</button>
                



                <button className="show-math" onClick={
                    () => {
                        // var oldMathDiv = document.getElementById("math-area");
                        // if (oldMathDiv != null){
                        //     oldMathDiv.id = "math-display";   
                        // }
                        // mathlive.renderMathInDocument();
                        
                        var mathDiv = document.createElement("div");
                        mathDiv.id = "math-area"+this.id.toString();
                        this.id = this.id+1;
                        var textArea = document.getElementById("text-area");
                        textArea.appendChild(mathDiv);
                        const mathfield = mathlive.makeMathField(mathDiv.id);
                
                    }
                }>math</button>



            </div>
            
            <main id="text-area">
                
            </main>
            



            {/**
            <div id='codebox'><CodeBox file={this.state.file} ref='codebox'/></div>
            **/}

            {/** 
            <SplitPane className='split-view' split="vertical" minSize={50} defaultSize={400}>
            <div><span id='preview'></span></div>
            </SplitPane>
            **/}
            
            {/**
            <div id='codebox'>
                
            </div>
            **/}

            
        </div>;
    }
}

export default Editor

