import F from 'lodash/fp';
import Container from '../containers/SplashContainer';
import withLayout from '../utils/with-layout';
import DefaultLayout from '../components/DefaultLayout';

export default F.compose(
    withLayout(DefaultLayout, {
        headerStyle: {
            display: 'none',
        },
    }),
)(Container);
