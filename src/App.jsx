import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { AboutAs } from './pages/AboutUs';
import { EmailIndex } from './pages/EmailIndex';
import { Home } from './pages/Home';

import { EmailDetails } from './pages/EmailDetails';
import { EmailEdit } from './pages/EmailEdit';



export function App() {

    return (
        <Router >
            <section className='main-app'>

                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutAs />} />
                        <Route path="/email/:folder" element={<EmailIndex />}>
                            {/* <Route path="email/edit" element={<EmailEdit />}/> */}
                            <Route path="/email/:folder/:emailId?" element={ <EmailDetails /> }/>
                        </Route>
                        
                        <Route path="email/edit" element={<EmailEdit />}/>
                    </Routes>
                </main>

            </section>
        </Router>

    )
}

