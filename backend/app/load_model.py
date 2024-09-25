import joblib
import os

try:
    # Load model and vectorizer
    URL_RECOGNATION = os.path.join(os.path.dirname(__file__), 'model/url_recognation.joblib')
    SPAM_CORPUS = os.path.join(os.path.dirname(__file__), 'model/spam_corpus.joblib')
    VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), 'model/vectorizer.joblib')

    url_recognation = joblib.load(open(URL_RECOGNATION, 'rb'))
    spam_corpus = joblib.load(open(SPAM_CORPUS, 'rb'))
    vectorizer = joblib.load(open(VECTORIZER_PATH, 'rb'))

except FileNotFoundError as e:
    print(f'An error occurred: {e}')
