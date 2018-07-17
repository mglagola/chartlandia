import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { AppStyles, NavigationStyles } from '../constants/styles';
import {
    FeedCell,
    FeedHeader,
    FeedFooter,
} from '../components/FeedCell';

const FeedItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const Feed = ({
    deviceSize,
    ss,
    marketCap,
    listData,
    fetchStatus,
    onRefresh,
}) => (
    <View style={styles.container}>
        <FeedHeader
            ss={ss}
            index='#'
            name='Name'
            marketCap='Market Cap'
            price='Price'
            volume='Volume'
            supply='Circulating Supply'
            change1h='Change (1h)'
            change24h='Change (24h)'
            change7d='Change (7d)'
        />
        <FlatList
            removeClippedSubviews
            disableVirtualization
            style={styles.list}
            initialNumToRender={20}
            extraData={deviceSize}
            data={listData}
            renderItem={(({ item, index }) => <FeedCell ss={ss} index={index} {...item} />)}
            ItemSeparatorComponent={FeedItemSeparatorComponent}
            refreshControl={
                <RefreshControl
                    refreshing={fetchStatus === 'loading'}
                    onRefresh={onRefresh}
                />
            }
        />
        <FeedFooter ss={ss} marketCap={marketCap} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppStyles.defaultBackgroundColor,
        flex: 1,
    },
    list: {
        flex: 1,
    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: NavigationStyles.borderColor,
    },
});

export default Feed;
