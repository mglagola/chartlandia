import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
} from 'react-native';
import Text from '../components/Text';
import Change from '../components/Change';
import TouchableOpacity from '../components/TouchableOpacity';
import { formatNumber } from '../utils/ticker-utils';
import { AppStyles, NavigationStyles } from '../constants/styles';
import { pure } from 'recompose';

export const FeedHeader = pure(({
    ss,
    index,
    name,
    marketCap,
    price,
    volume,
    supply,
    change1h,
    change24h,
    change7d,
}) => (
    <View style={[styles.headerContainer, ss(ms.headerContainer)]}>
        <Text style={[styles.text, styles.headerText, styles.index, ss(ms.headerText)]}>{index}</Text>
        <Text style={[styles.text, styles.headerText, styles.name, ss(ms.name, ms.headerText)]}>{name}</Text>
        <Text style={[styles.text, styles.headerText, ss(ms.marketCap, ms.headerText)]}>{marketCap}</Text>
        <Text style={[styles.text, styles.headerText, ss(ms.headerText)]}>{price}</Text>
        <Text style={[styles.text, styles.headerText, ss(ms.volume, ms.headerText)]}>{volume}</Text>
        <Text style={[styles.text, styles.headerText, ss(ms.supply, ms.headerText)]}>{supply}</Text>
        <Text style={[styles.text, styles.headerText, styles.change, ss(ms.change, ms.change1h, ms.headerText)]}>{change1h}</Text>
        <Text style={[styles.text, styles.headerText, styles.change, ss(ms.change, ms.headerText)]}>{change24h}</Text>
        <Text style={[styles.text, styles.headerText, styles.change, ss(ms.change, ms.change7d, ms.headerText)]}>{change7d}</Text>
    </View>
));

export const FeedFooter = pure(({
    ss,
    marketCap,
}) => (
    <View style={styles.footerContainer}>
        <Text style={[styles.footerText, ss(ms.footerText)]}>Total Market Cap</Text>
        <Text style={[styles.footerText, ss(ms.footerText)]}>${formatNumber(marketCap)}</Text>
    </View>
));

export const FeedCell = pure(({
    ss,
    slug,
    name,
    price_usd: priceUsd,
    percent_change_1h: percentChange1h,
    percent_change_24h: percentChange24h,
    percent_change_7d: percentChange7d,
    available_supply: availableSupply,
    market_cap_usd: marketCapUsd,
    volume_usd_24h: volumeUsd24h,
    index,
    onPress,
    ...rest
}) => (
    <TouchableOpacity style={styles.cellContainer} onHover={{ backgroundColor: AppStyles.shadeColor(0.137) }} onPress={onPress}>
        <Text style={[styles.text, styles.index]}>{index + 1}</Text>
        <Text style={[styles.text, styles.name, ss(ms.name)]}>{name}</Text>
        <Text style={[styles.text, ss(ms.marketCap)]}>${formatNumber(marketCapUsd, 0)}</Text>
        <Text style={[styles.text]}>${formatNumber(priceUsd)}</Text>
        <Text style={[styles.text, ss(ms.volume)]}>${formatNumber(volumeUsd24h, 0)}</Text>
        <Text style={[styles.text, ss(ms.supply)]}>{formatNumber(availableSupply, 0)}</Text>
        <Change style={[styles.text, styles.change, ss(ms.change, ms.change1h)]} change={percentChange1h} />
        <Change style={[styles.text, styles.change, ss(ms.change)]} change={percentChange24h} />
        <Change style={[styles.text, styles.change, ss(ms.change, ms.change7d)]} change={percentChange7d} />
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    cellContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBottom: 12,
        paddingTop: 12,
        backgroundColor: undefined,
    },
    headerContainer: {
        ...NavigationStyles.defaultStyle,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingTop: 15,
        paddingBottom: 10,
    },
    footerContainer: {
        backgroundColor: NavigationStyles.backgroundColor,
        borderTopColor: NavigationStyles.borderColor,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: 15,
    },
    text: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: 'right',
        fontSize: 18,
        letterSpacing: -0.25,
    },
    headerText: {
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 14,
        letterSpacing: -0.25,
        fontWeight: '500',
    },
    index: {
        flex: 0,
        textAlign: 'center',
        color: AppStyles.lightColorWithAlpha(0.5),
        minWidth: 40,
    },
    name: {
        flex: 1.2,
        textAlign: 'left',
    },
    change: {
        flex: 0.65,
        textAlign: 'right',
    },
});

const ms = {
    headerContainer: [{
        when: Platform.OS !== 'web',
        style: { paddingTop: 30, },
    }],
    headerText: [{
        when: 'lte',
        width: 1400,
        style: { fontSize: 16 },
    }, {
        when: 'lte',
        width: 1200,
        style: { fontSize: 15 },
    }, {
        when: 'lte',
        width: 640,
        style: { fontSize: 13 },
    }],
    name: [{
        when: 'lte',
        width: 1200,
        style: {
            flex: 1.4,
            fontSize: 16,
        },
    }],
    marketCap: [{
        when: 'lte',
        width: 640,
        style: {
            display: 'none',
        },
    }],
    supply: [{
        when: 'lte',
        width: 1200,
        style: {
            display: 'none',
        },
    }],
    volume: [{
        when: 'lte',
        width: 940,
        style: {
            display: 'none',
        },
    }],
    change: [{
        when: 'lte',
        width: 640,
        style: {
            flex: 0.9,
        },
    }, {
        when: 'lte',
        width: 940,
        style: {
            flex: 1,
        },
    }],
    change1h: [{
        when: 'lte',
        width: 1050,
        style: {
            display: 'none',
        },
    }],
    change7d: [{
        when: 'lte',
        width: 1050,
        style: {
            display: 'none',
        },
    }],
    footerText: [{
        when: 'gte',
        width: 375,
        style: {
            fontSize: 16,
        },
    }, {
        when: 'gte',
        width: 640,
        style: {
            fontSize: 17,
        },
    }],
};
