import { useState } from 'react';
import axios from 'axios';
import './style.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function CorpusPredictor() {
    const [corpus, setCorpus] = useState('');
    const [prediction, setPrediction] = useState('');
    const [proba, setProba] = useState(null);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState('none');
    const [validate, setValidation] = useState(null);
    const [issue, setIssue] = useState('');

    async function predict(e) {
       e.preventDefault();
       
       if(corpus.trim() === '') {
         setValidation('* Field was empty');
         return;

       } else {
         try {
            setLoading(true);
   
            // API request to predict a text corpus
            const response = await axios.post(`${API_URL}/api/v1/predict_corpus`, { corpus: corpus });
            
            setPrediction(response.data.prediction);
            setProba(Math.round(response.data.proba * 100));
            setDisplay('block');
   
         } catch(error) {
            setIssue('Prediction error!');
   
         } finally {
            setTimeout(function() {
               setLoading(false);
               setCorpus('');
               setValidation(null);
            },3000);
         }
       }
    }

    return (
      <>
         <div className='d-flex justify-content-center mt-3'>
            <div className="mb-3">
               <textarea value={corpus} onChange={(e) => setCorpus(e.target.value)} className="form-control custom-corpus-input" rows="3" placeholder="Text message" disabled={loading}></textarea>
               <p style={{color: 'red'}} className='mt-2'>{validate}</p>

               <button onClick={predict} className="btn btn-danger custom-corpus-btn" disabled={loading}>{loading ? 'Scanning...' : 'Scan text'}</button>
            </div>
         </div>

         {loading ? null: 
            <div className="d-flex justify-content-center mt-2 mb-5">
                {issue && <div className='prediction'><span style={{color: 'red'}}>{issue}</span></div>}

                <div style={{display: display}} className='prediction'>
                   {/* Prediction result and outcome */}
                   Text was {proba}% - <span style={{color: prediction == 'Spam' ? 'red': 'skyblue'}}>{prediction}</span>
                </div>
            </div>
         }
      </>
    )
}