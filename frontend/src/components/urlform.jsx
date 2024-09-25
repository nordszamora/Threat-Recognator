import { useState } from 'react';
import axios from 'axios';
import './style.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function URLPredictor() {
    const [url, setUrl] = useState('');
    const [prediction, setPrediction] = useState('');
    const [proba, setProba] = useState(null);
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState('none');
    const [validate, setValidation] = useState(null);
    const [issue, setIssue] = useState('');

    // URL validation pattern
    const urlRegex = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|(localhost)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{1,5})?(\/[^\s]*)?$/;

    async function predict(e) {
       e.preventDefault();

       if(url.trim() === '') {
         setValidation('* Field was empty');
         return;

       } else if(!urlRegex.test(url)) {
         setValidation('* URL must be valid');
         return;

       } else {
         try {
            setLoading(true);
            
            // API request to predict a url
            const response = await axios.post(`${API_URL}/api/v1/predict_url`, { url: url });
   
            setPrediction(response.data.prediction);
            setProba(Math.round(response.data.proba * 100));
            setDisplay('block');
   
         } catch(error) {
            setIssue('Prediction error!');
   
         } finally {
            setTimeout(function() {
               setLoading(false);
               setUrl('');
               setValidation(null);
            },3000);
         }
       }
    }

    return (
      <>
         <div className='d-flex justify-content-center'>
            <div className="row g-2 mt-2">
               <div className="col">
                  <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" placeholder="http://example.com" disabled={loading}/>
                  <p style={{color: 'red'}} className='mt-2'>{validate}</p>
               </div>

               <div className="col">
                  <button onClick={predict} className="btn btn-danger" disabled={loading}>{loading ? 'Scanning...' : 'Scan url'}</button>
               </div>
            </div>
         </div>

         {loading ? null: 
            <div className="d-flex justify-content-center mt-2 mb-5">
                {issue && <div className='prediction'><span style={{color: 'red'}}>{issue}</span></div>}

                <div style={{display: display}} className='prediction'>
                   {/* Prediction result and outcome */}
                   URL was {proba}% - <span style={{color: prediction == 'Malicious' ? 'red': 'skyblue'}}>{prediction}</span>
                </div>
            </div>
         }
      </>
    );
}