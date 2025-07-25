import { useState } from 'react';

import { getLoggedInUser } from '../../utils/auth.js';
import useSearchUsers from '../../hooks/Users/useSearchUsers';

import { ReturnButton } from '../../components/Buttons';
import { SearchInput } from '../../components/Inputs';
import { Pagination } from '../../components/Pagination';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorPage from "../../components/ErrorPage";
import LoadingPage from '../../components/LoadingPage';
import List from './List';

import '../../Styles/table.css';
import '../../Styles/components/select.css'

export default function UsersList() {
    const { users, setUpdateList, loading, errors, search, setSearch } = useSearchUsers();
    const loggedInUser = getLoggedInUser();
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    // ERRO LOGIN INATIVO
    if (!loggedInUser) return <ErrorPage/>;

    return (
        <div className='container'>
            <Header/>
            { loading ? <LoadingPage/> :
                <div className='content content-list'>

                    
                    <main>
                        <div className='btn-bar'>
                            <ReturnButton/>
                            
                            <SearchInput
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onSearch={() => { setUpdateList(prevState => !prevState); setCurrentPage(1); }}
                                placeholder="Pesquisar..."
                                disabled={loading}
                            />

                            <select 
                                className='items-quantity-select' 
                                name="itemsPerPage" 
                                value={itemsPerPage} 
                                onChange={(e) => { setItemsPerPage(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </div>

                        <List 
                            users={users} 
                            currentPage={currentPage} 
                            itemsPerPage={itemsPerPage} 
                        />

                        {errors && <h2 className={'form-error'}>{errors}</h2>}
                        
                        <Pagination 
                            itens={users} 
                            currentPage={currentPage} 
                            setCurrentPage={setCurrentPage} 
                            itemsPerPage={itemsPerPage} 
                        />
                    </main>

                </div>
            }
            <Footer/>
        </div>
    );
};