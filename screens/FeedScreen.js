import F from 'lodash/fp';
import Container from '../containers/FeedContainer';
import withNavigationOptions from '../utils/with-navigation-options';

export default F.compose(
    withNavigationOptions((props) => ({
        headerStyle: {
            display: 'none',
        },
    })),
)(Container);
