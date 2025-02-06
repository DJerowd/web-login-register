import { React } from 'react';
import { ToastContainer } from 'react-toastify';

import useUsers from '../../hooks/Users/useUsers.jsx';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';
import 'react-toastify/dist/ReactToastify.css';
import './Styles.css';

function Register() {
    const { users, setUpdateUserList } = useUsers();

    return (
        <div className='container-register'>
            <Header/>

            <div className='content-register'>
                <main>
                    <div className='title-register'>
                        <h2>Registre-se:</h2>
                    </div>
                    
                    <div className='form-register'>
                        <Form users={users} setUpdateUserList={setUpdateUserList}/>
                    </div>
                </main>

                <ToastContainer 
                    className='toastContainer' 
                    autoClose={3000} 
                    limit={7}
                    hideProgressBar={true}
                    position="bottom-left" 
                    theme="dark"
                />
            </div>

            <Footer/>
        </div>
    );
}

export default Register;