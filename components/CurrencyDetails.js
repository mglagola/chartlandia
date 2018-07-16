import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { AppStyles, CurrencyDetailsStyles, NavigationStyles } from '../constants/styles';
import Text from '../components/Text';
import Change from '../components/Change';
import { formatNumber } from '../utils/ticker-utils';

const row = (left, right) => (
    <View style={styles.row}>
        <View style={[styles.rowItem]}>{left}</View>
        <View style={[styles.rowItem, styles.rowItemRight]}>{right}</View>
    </View>
);

const CurrencyDetails = ({
    ss,
    status,
    currency,
}) => (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
            <View style={styles.section}>
                {row(
                    [
                        <Text style={[styles.title, ss(ms.title)]} key='1'>{currency.name}</Text>,
                        <Text style={[styles.titleSymbol, ss(ms.title)]} key='2'>{currency.symbol}</Text>,
                    ],
                    [
                        <Text style={styles.price} key='1'>${formatNumber(currency.price_usd, 3)}</Text>,
                        <Change style={styles.changeTitle} change={currency.percent_change_24h} key='2' />,
                    ],
                )}
            </View>
            <View style={styles.section}>
                {row(
                    [
                        <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>Market Cap</Text>,
                        <Text style={[styles.itemText, ss(ms.itemText), styles.itemSubtitle]} key='2'>#{currency.rank} USD</Text>,
                    ],
                    [
                        <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>${formatNumber(currency.market_cap_usd, 0)}</Text>,
                    ],
                )}
                <View style={styles.separator} />
                {row(
                    [
                        <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>Volume (24h)</Text>,
                        <Text style={[styles.itemText, ss(ms.itemText), styles.itemSubtitle]} key='2'>USD</Text>,
                    ],
                    [
                        <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>${formatNumber(currency.volume_usd_24h, 0)}</Text>,
                    ],
                )}
                <View style={styles.separator} />
                {row(
                    <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>Circulating Supply</Text>,
                    <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>{formatNumber(currency.available_supply, 0)}</Text>,
                )}
            </View>
            <View style={styles.section}>
                {row(
                    <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>Change (1h)</Text>,
                    <Change style={[styles.itemText, ss(ms.itemText)]} change={currency.percent_change_1h} key='1' />,
                )}
                <View style={styles.separator} />
                {row(
                    <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>Change (24h)</Text>,
                    <Change style={[styles.itemText, ss(ms.itemText)]} change={currency.percent_change_24h} key='1' />,
                )}
                <View style={styles.separator} />
                {row(
                    <Text style={[styles.itemText, ss(ms.itemText)]} key='1'>Change (7d)</Text>,
                    <Change style={[styles.itemText, ss(ms.itemText)]} change={currency.percent_change_7d} key='1' />,
                )}
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppStyles.defaultBackgroundColor,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    innerContainer: {
        flex: 1,
        padding: 20,
        paddingBottom: 10,
        maxWidth: CurrencyDetailsStyles.layout.maxContentWidth,
    },
    section: {
        paddingBottom: 30,
    },
    separator: {
        backgroundColor: NavigationStyles.borderColor,
        height: StyleSheet.hairlineWidth,
    },
    row: {
        paddingTop: 6,
        paddingBottom: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    rowItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    rowItemRight: {
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleSymbol: {
        marginLeft: 5,
        fontSize: 20,
        color: CurrencyDetailsStyles.subtitleColor,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    changeTitle: {
        marginLeft: 10,
        fontSize: 18,
    },
    itemText: {
        fontSize: 14,
    },
    itemSubtitle: {
        marginLeft: 5,
        color: CurrencyDetailsStyles.subtitleColor,
    },
});

const ms = {
    title: [{
        when: 'gte',
        width: 375,
        style: { fontSize: 22 },
    }, {
        when: 'gte',
        width: 450,
        style: { fontSize: 24 },
    }],
    itemText: [{
        when: 'gte',
        width: 375,
        style: { fontSize: 16 },
    }, {
        when: 'gte',
        width: 450,
        style: { fontSize: 17 },
    }],
};

export default CurrencyDetails;
