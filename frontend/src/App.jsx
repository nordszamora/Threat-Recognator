import URLPredictor from "./components/urlform";
import CorpusPredictor from "./components/corpusform";
import "bootstrap";
import "./App.css";

export default function App() {

    const triggerTabList = document.querySelectorAll('#myTab button')
    triggerTabList.forEach(triggerEl => {
      const tabTrigger = new bootstrap.Tab(triggerEl)
    
      triggerEl.addEventListener('click', event => {
        event.preventDefault()
        tabTrigger.show()
      })
    })

    return (
      <>
          <div className="container">
              <h1 style={{textAlign: 'center', color: 'white'}} className="banner mt-5">T̴H̴R̶E̶A̶T̶ ̶R̴E̸C̶O̷G̸N̵A̵T̷O̶R̷</h1>
              
              <div className="d-flex justify-content-center mt-4">
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link custom-nav-link-url active" id="pills-urlpredictor-tab" data-bs-toggle="pill" data-bs-target="#pills-urlpredictor" type="button" role="tab" aria-controls="pills-urlpredictor" aria-selected="true">URL</button>
                    </li>

                    <li className="nav-item" role="presentation">
                        <button className="nav-link custom-nav-link-corpus" id="pills-corpuspredictor-tab" data-bs-toggle="pill" data-bs-target="#pills-corpuspredictor" type="button" role="tab" aria-controls="pills-corpuspredictor" aria-selected="false">TEXT</button>
                    </li>
                  </ul>
              </div>

              <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-urlpredictor" role="tabpanel" aria-labelledby="pills-urlpredictor-tab" tabIndex="0">
                    <URLPredictor />
                  </div>

                  <div className="tab-pane fade" id="pills-corpuspredictor" role="tabpanel" aria-labelledby="pills-corpuspredictor-tab" tabIndex="0">
                    <CorpusPredictor />
                  </div>
              </div>
          </div>
      </>
    );
}