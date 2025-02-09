import { React } from 'react';

import useUsers from '../../hooks/Users/useUsers';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';

function Login() {
    const { users, setUpdateUserList } = useUsers();

    return (
        <div className='container'>
            <Header/>

            <div className='content'>
                <main className='signup-form'>

                    <h2>Fazer login:</h2>

                    <Form users={users} />
                    
                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Login;