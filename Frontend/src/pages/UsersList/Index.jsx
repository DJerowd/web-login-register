import { useState } from 'react';
import { IoSearch } from "react-icons/io5";

import { getLoggedInUser } from '../../utils/auth.js';
import useSearchUsers from '../../hooks/Users/useSearchUsers';

import { ReturnButton } from '../../components/Buttons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import ErrorPage from "../../components/ErrorPage";
import LoadingPage from '../../components/LoadingPage';
import Pagination from '../../components/Pagination';
import List from './List';

import '../../Styles/table.css';

function UsersList() {
    const { users, setUpdateList, loading, errors, search, setSearch } = useSearchUsers();
    const loggedInUser = getLoggedInUser();
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // ERRO LOGIN INATIVO
    if (!loggedInUser) return <ErrorPage/>;

    // TELA DE LOADING
    if (loading) return <LoadingPage/>;

    return (
        <div className='container'>
            <Header/>
            <div className='content content-list'>

                <main>

                    <div className='btn-bar'>
                        <ReturnButton/>
                        
                        <label className='search-input'>
                            <button className='icon' onClick={() => { setUpdateList(prevState => !prevState); setCurrentPage(1); }}>
                                <IoSearch/>
                            </button>
                            <input 
                                type="text" 
                                placeholder="Pesquisar..." 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                                disabled={loading}
                            />
                        </label>
                    </div>

                    <List users={users} currentPage={currentPage} itemsPerPage={itemsPerPage} />

                    {errors && <h2 className={'form-error'}>{errors}</h2>}
                    
                    <Pagination itens={users} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />
                    
                </main>

            </div>
            <Footer/>
        </div>
    );
}

export default UsersList;