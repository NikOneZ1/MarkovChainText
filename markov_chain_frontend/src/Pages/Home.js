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
        <div>
            <form onSubmit={Submit}>
                <p><textarea name='text' onChange={changeText}></textarea></p>
                <p><input type='number' min="1" max="10000" onChange={changeWordsNumber}/></p>
                <input className='btn btn-outline-dark' type='submit' value='submit'/>
            </form>
            {generatedText && <p>{generatedText}</p>}
        </div>
    )
}