import React, { useState, useEffect } from 'react';
import PN from 'persian-number';
import axios from 'axios';
import errorImage from '../../images/error.png';

//style
import styles from './main.module.css';

const Main = () => {
    const [state, setState] = useState({loading: true});

    useEffect(() => {
        const getData = async () => {
             await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d')
            .then(response => setState({status: 200,result: response.data}))
            .catch(() => setState({error: true}));
        }
        getData();
    }, [])

    const percentConverter = (value) => {
        let convert;
        let element;
        if(typeof value === 'number') {
            convert = value.toFixed(2);
            element = <td className={styles.td + " " + (value > 0 ? styles.green: styles.red)}>%{PN.convertEnToPe(convert)}</td>
        } else {
            element = <td className={styles.td}>____</td>   
        }
        return element;
    }

    const loadData = () => {
        if(state.loading) {
            return  <tr>
                        <td><span class={styles.loader}></span></td>
                    </tr>
        } else if(state.error) { 
            return (
               <>
                  <div className={styles.overlay}></div>
                  <div className={styles.errorContainer}>
                    <img className={styles.errorImage} src={errorImage} alt='ارور' />
                    <h3 className={styles.errorText}>!متاسفانه مشکلی پیش آمده است</h3>
                 </div>
               </>
            )
         }
         else if (state.status === 200){
            console.log(state);
            return state.result.map((coin, i) => <tr className={styles.tr} key={coin.id}>
                                                    <td className={styles.td}>{PN.convertEnToPe(i + 1)}</td>
                                                    <td className={styles.td + " " + styles.coinName}>
                                                        <img className={styles.coinNameImg} src={coin.image} alt="" />
                                                        <span className={styles.coinNameName}>{coin.name}</span>
                                                        <span className={styles.coinNameSymbol}>{coin.symbol}</span>
                                                    </td>
                                                    <td className={styles.td}>$ {PN.convertEnToPe(PN.sliceNumber(coin.current_price))}</td>
                                                    <td className={styles.td}>{PN.convertEnToPe(PN.sliceNumber((coin.current_price * 45000).toFixed(2)))}</td>
                                                    {percentConverter(coin.price_change_percentage_7d_in_currency)}
                                                    {percentConverter(coin.price_change_percentage_24h_in_currency)}
                                                    <td className={styles.td}>$ {PN.convertEnToPe(PN.sliceNumber(coin.market_cap))}</td>
                                             </tr>)
        } 
    } 
   
    return (
        <main className={styles.main}>
            <table className={styles.table}>  
                <thead className={styles.mainThead}>
                    <tr className={styles.thead}>
                        <th className={styles.th}>#</th>
                        <th className={styles.th}>ارز دیجیتال</th>
                        <th className={styles.th}>قیمت</th>
                        <th className={styles.th}>قیمت به تومان</th>
                        <th className={styles.th}>هفتگی</th>
                        <th className={styles.th}>روزانه</th>
                        <th className={styles.th}>حجم بازار</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {loadData()}
                </tbody>
            </table>
        </main>
    );
};

export default Main;


