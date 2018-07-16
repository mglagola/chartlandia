import F from 'lodash/fp';
import FeedContainer from '../containers/FeedContainer';
import DefaultLayout from '../components/DefaultLayout';
import withLayout from '../utils/with-layout';

export default F.compose(
    withLayout(DefaultLayout, {
        headerStyle: {
            display: 'none',
        },
    })
)(FeedContainer);
