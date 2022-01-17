import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [text, setText] = useState("");
    const [words_number, setWordsNumber] = useState("");
    const [generatedText, setGeneratedText] = useState("")

    const Submit = event => {
        event.preventDefault();

        async function getGeneratedText() {
            const response = axios.post('/api/generate_text/', {text, words_number});
            response.then(function(result) {
                setGeneratedText(result.data.generated_text);
            })
        }

        getGeneratedText()
    }

    const changeText = event => {
        event.persist();
        setText(event.target.value);
    }

    const changeWordsNumber = event => {
        event.persist();
        setWordsNumber(event.target.value);
    }

    return (
        <div className='row'>
            <div className='mx-auto col col-xs-10 col-sm-10 col-md-10 col-lg-8'>
                <h1 className='text-center'>Markov chain text generator</h1>
                <br/>
                <form onSubmit={Submit}>
                    <b>Input text</b>
                    <p><textarea name='text' onChange={changeText} rows="6" required></textarea></p>
                    <b>Words number of generated text</b>
                    <p><input type='number' min="1" max="10000" onChange={changeWordsNumber} required/></p>
                    <input className='btn btn-outline-dark' type='submit' value='Generate text'/>
                </form>
                <br/>
                <br/>
                {generatedText && <div className='text-center'><h2>Generated text</h2><p className='generated-text'>{generatedText}</p></div>}
            </div>
        </div>
    )
}