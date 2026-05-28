import "./App.css";

// import Form from './views/form/form'
// import Success from './views/form/success'
// import View from './views/form/view'

import Navbar from "./views/boilerplate/Navbar";
import Container from "./views/boilerplate/Container";

function App() {

    return (

        <div className="appRoot">

            <div className="appGlow appGlowOne"></div>
            <div className="appGlow appGlowTwo"></div>
            <div className="appGlow appGlowThree"></div>

            <div className="gridOverlay"></div>

            <Navbar />

            <main className="mainContent">
                <Container />
            </main>

        </div>

    );

}

export default App;