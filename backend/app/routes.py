from flask import Blueprint, request, jsonify
from app.model.processor.text_processor import process_text
from app.model.processor.url_processor import process_url
from app.load_model import url_recognation, spam_corpus, vectorizer

blueprint = Blueprint('blue_print', __name__)

@blueprint.route('/predict_corpus', methods=['POST'])
def spam_prediction():
    corpus = request.json.get('corpus')
    process = process_text(corpus) # text cleaning

    vectorized_corpus = vectorizer.transform([process]) # convert text corpus into numeric
    predict = spam_corpus.predict(vectorized_corpus)[0] # predict text corpus
    proba = spam_corpus.predict_proba(vectorized_corpus)[0][predict] # text corpus outcome

    prediction_result = 'Spam' if predict == 1 else 'Legitimate'

    return jsonify({'prediction': prediction_result, 'proba': proba}), 200
    
@blueprint.route('/predict_url', methods=['POST'])
def url_prediction():
    url = request.json.get('url')
    process = process_url(url) # url cleaning

    predict = url_recognation.predict(process)[0] # predict url
    proba = url_recognation._predict_proba_lr(process)[0][predict] # url outcome

    prediction_result = 'Malicious' if predict == 1 else 'Legitimate'

    return jsonify({'prediction': prediction_result, 'proba': proba}), 200
