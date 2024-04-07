import React, { useEffect, useState } from 'react';
import UserData from './components/UserData';

const API = 'https://api.coinlore.net/api/tickers/';

const App = () => {
    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

    const fetchUsers = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data && data.data && data.data.length > 0) {
                setUsers(data.data);
            }
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchUsers(API);
    }, []);

    useEffect(() => {
        const sortedUsersCopy = [...users];
        if (sortConfig.key) {
            sortedUsersCopy.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        setSortedUsers(sortedUsersCopy);
    }, [sortConfig, users]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.key === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: column, direction: direction });
    };

    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toString().includes(searchQuery)
    );

    return (
        <div>
            <input type="search"
                name="search-form" id="search-form"
                className="search-input"
                placeholder="Search user"
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <table>
                <thead>
                    <tr>
                        <SortableHeader
                            column="id"
                            title="ID ▲"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableHeader
                            column="name"
                            title="Name ▲"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableHeader
                            column="rank"
                            title="Rank ▲"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableHeader
                            column="price_usd"
                            title="Price (USD) ▲"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableHeader
                            column="percent_change_24h"
                            title="24h Change (%) ▲"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableHeader
                            column="price_btc"
                            title="Price (BTC) ▲"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                        <SortableHeader
                            column="market_cap_usd"
                            title="Market Cap (USD) ▲"
                            sortConfig={sortConfig}
                            onClick={handleSort}
                        />
                    </tr>
                </thead>
                <tbody>
                    <UserData users={filteredUsers} />
                </tbody>
            </table>
        </div>
    );
};

const SortableHeader = ({ column, title, sortConfig, onClick }) => {
    const handleClick = () => {
        onClick(column);
    };

    const isSorted = sortConfig.key === column;
    const arrowIcon = isSorted && sortConfig.direction === 'asc' ? '▲' : '▼';

    return (
        <th onClick={handleClick} className={isSorted ? 'sorted' : ''}>
            {title} {isSorted && arrowIcon}
        </th>
    );
};

export default App;
