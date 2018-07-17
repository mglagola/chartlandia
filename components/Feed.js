import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { AppStyles, ProgressBarStyles, NavigationStyles } from '../constants/styles';
import {
    FeedCell,
    FeedHeader,
    FeedFooter,
} from '../components/FeedCell';

const FeedItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const shouldShowList = (fetchStatus) => {
    if (Platform.OS !== 'web') return true;
    return fetchStatus !== 'loading';
}

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
        {Platform.OS === 'web' && fetchStatus === 'loading' && <View style={styles.loadingIndicagtorContainer}>
            <ActivityIndicator size='large' color={ProgressBarStyles.color} />
        </View>}
        {shouldShowList(fetchStatus) && <FlatList
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
        />}
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
    loadingIndicagtorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Feed;
