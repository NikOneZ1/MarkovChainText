import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [text, setText] = useState("");
    const [words_number, setWordsNumber] = useState("");
    const [generatedText, setGeneratedText] = useState("")
    const [presetTexts, setPresetTexts] = useState("");

    useEffect(() => {
        async function get_preset_texts() {
            const response = await axios.get("api/preset_texts/");
            const data = await response.data;
            setPresetTexts(data);
        }
        get_preset_texts();
    }, [])

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
            <div className='mx-auto col col-xs-9 col-sm-9 col-md-9 col-lg-8'>
                <h1 className='text-center'>Markov chain text generator</h1>
                <br/>
                <form onSubmit={Submit}>
                    <b>Input text</b>
                    <p><textarea name='text' value={text} onChange={changeText} rows="15" required></textarea></p>
                    <b>Words number of generated text</b>
                    <p><input type='number' min="1" max="10000" onChange={changeWordsNumber} required/></p>
                    <input className='btn btn-outline-dark' type='submit' value='Generate text'/>
                </form>
                <br/>
                <br/>
                {generatedText && <div className='text-center'><h2>Generated text</h2><p className='generated-text'>{generatedText}</p></div>}
            </div>
            <div className='mx-auto col col-xs-3 col-sm-3 col-md-3 col-lg-3 text-center'>
                <h1>Preset Texts</h1>
                <br/>
                <br/>
                {presetTexts && presetTexts.map(preset_text =>
                    <div className='card text-center mt-3 text-preset' onClick={() => setText(preset_text.text)}>
                        <h4 className='card-title'>{preset_text.name}</h4>
                        <p className='card-text ml-1 mr-1'>{preset_text.text.slice(0, 200)}...</p>
                    </div>
                )}
            </div>
        </div>
    )
}