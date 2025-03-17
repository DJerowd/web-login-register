import { React } from 'react';

import useUsers from '../../hooks/Users/useUsers';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Form from './Form';

function Signup() {
    const { users, setUpdateList, loading, errors } = useUsers();

    return (
        <div className='container'>
            <Header/>

            <div className='content'>
                <main className='signup-form'>

                    <h2>Registre-se:</h2>

                    <Form users={users} setUpdateList={setUpdateList} />

                </main>
            </div>

            <Footer/>
        </div>
    );
}

export default Signup;