
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import unicodedata
import string
import re

lemma = WordNetLemmatizer()

remove_num = r'\d+' # num digits pattern
remove_url = r'http\S+' # urls pattern

def process_text(text):
    # Remove num digits & urls
    text = re.sub(remove_num, '', text)
    text = re.sub(remove_url, '', text)

    # Remove specialchar
    for c in string.punctuation:
        text = text.replace(c,'')
    
    # Remove accented 
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8', 'ignore')

    stop_words = stopwords.words('english')
    token = word_tokenize(text.lower()) # Tokenize words

    # Custom words
    custom_stopwords = ['b', 'c', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'n', 'p', 'q', 'r', 'u', 'v', 'w', 'x', 'z']
    stop_words.extend(custom_stopwords)

    stopwords_removed = [lemma.lemmatize(word) for word in token if word not in stop_words]

    return ' '.join(stopwords_removed)
