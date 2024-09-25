# Threat Recognator

### About:

A ML-powered scanner to identify the pattern for spam text and malicious sites. We used a SGDC for url with accuracy of 78% and CNB for text with accuracy of 93%.

#### Data source:

[Spam-&-Malicious-samples](https://github.com/nordszamora/DS-ML-projects/tree/main/Spam-%26-Malicious-samples)

#### Cons:

The model can classify into a unexpected False positive & False negative.

### Features

- **Tabs:** Separate tabs for text and URL input scanning.
- **Input fields:** User-friendly text and URL input forms.
- **Simple UI:** User-friendly design for ease of use.

### Technologies Used

- **Frontend:** ReactJS with Vite
- **Backend:** Flask
- **ML lib** Scikit-Learn
- **Deployment:** Vercel (frontend) and PythonAnywhere (backend)

### Getting Started
Install this project on your local machine and here are following steps.

#### Installation

1. **Clone the Repository**

   ```
   $ git clone https://github.com/nordszamora/Threat-Recognator.git

   $ cd Threat-Recognator

   $ pip install -r requirements.txt
   ```

2. **Backend setup**

   ```
   $ cd backend

   $ python nltk_setup.py

   $ python app.py
   ```

3. **Frontend setup**

   ```
   $ cd frontend

   $ npm install

   $ npm run dev
   ```

Open your browser and run http://localhost:5173

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
