import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {filterBy} from "./helpers/filterBy";
import debounce from "lodash.debounce";

export const AutoCompleteInput = () => {
    const [autoCompleteValues,setAutoCompleteValues] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3000')
            .then(function (response){
                //doing that just because i can
                localStorage.setItem('autoCompleteArray', JSON.stringify(response.data))
            })
            .catch(function (error){
            console.log(error.response)
        })
    }, []);

    const inputDebounce = useCallback(
        debounce((newValue) => setValues(newValue), 300),
        []
    );

    const setValues = (value) => {
        let arr = filterBy(JSON.parse(localStorage.getItem('autoCompleteArray')), value)
        setAutoCompleteValues(arr)
    }

    const handleChange = (newVal) => {
        setInputValue(newVal.target.value)
         inputDebounce(newVal.target.value)
    }

    const handleSelectClick = (word) => {
        setInputValue(word)
        setAutoCompleteValues([])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(inputValue === '') return
        let arr = JSON.parse(localStorage.getItem('autoCompleteArray'))
        let strCheck = inputValue.toLowerCase()
        strCheck = strCheck.charAt(0).toUpperCase() + strCheck.slice(1)
        if(arr.indexOf(strCheck) !== -1){
            alert('Found ' + strCheck)
        } else if(arr.indexOf(strCheck) === -1 && autoCompleteValues[0] && autoCompleteValues.length === 1){
            alert('Found ' + autoCompleteValues[0])
        }
        else{
            alert('Value does not exist.')
        }
        setInputValue('')
    }

    const selectableOptions = autoCompleteValues.map(word =>
        <div className="selectableOptionsSingle" key={word} onClick={() => handleSelectClick(word)}>{word}</div>
    )

    return (
        <div className="mainContainer">
            <div>
                <form className="submitWrapper" onSubmit={handleSubmit}>
                    <input className="submitInput" value={inputValue} onChange={(inVal) => handleChange(inVal)} type="text"/>
                    <button className="submitButton" onSubmit={handleSubmit}>➥</button>
                    <div className="selectableOptions">{inputValue.length !== 0 && selectableOptions}</div>
                </form>
            </div>
        </div>
    )
}
