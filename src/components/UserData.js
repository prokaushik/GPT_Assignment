const UserData = ({users}) => {
    return (
        <>
            {
                users.map((curUser) => {
                    const {id, name, rank, price_usd, percent_change_24h, price_btc, market_cap_usd} = curUser;

                    return (
                        <tr>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{rank}</td>
                            <td>{price_usd}</td>
                            <td>{percent_change_24h}</td>
                            <td>{price_btc}</td>
                            <td>{market_cap_usd}</td>
                        </tr>
                    )
                })

            }
        </>
    )
}
export default UserData;