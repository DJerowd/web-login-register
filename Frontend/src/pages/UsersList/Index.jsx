import { useState } from 'react';
import { IoSearch } from "react-icons/io5";

import { getLoggedInUser } from '../../utils/auth.js';
import useSearchUsers from '../../hooks/Users/useSearchUsers';

import { ReturnButton } from '../../components/Buttons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Error from "../Error";
import Loading from '../Loading';
import List from './List';
import Pagination from '../../components/Pagination';

import '../../Styles/table.css';

function UsersList() {
    const { users, setUpdateList, loading, errors, search, setSearch } = useSearchUsers();
    const loggedInUser = getLoggedInUser();
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // ERRO LOGIN INATIVO
    if (!loggedInUser) { return ( <Error/> ); }

    // TELA DE LOADING
    if (loading) { return <Loading/>; }

    return (
        <div className='container'>
            <Header/>
            <div className='content content-list'>

                <main>

                    <div className='btn-bar'>
                        <ReturnButton/>
                        
                        <label className='search-input'>
                            <button className='icon' onClick={() => setUpdateList(prevState => !prevState)}>
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