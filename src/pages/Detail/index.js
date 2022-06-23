import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import 'swiper/css';
import VideoDetail from '~/components/VideoDetail';
import VideoSlider from '~/components/VideoSlider';
import styles from './Detail.module.scss';
const cx = classNames.bind(styles);
function Detail() {
    const { category, id } = useParams();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div>
            <VideoDetail category={category} id={id} />
            <VideoSlider title="Similar" category={category} id={id} methodName="getSimilar" />
        </div>
    );
}

export default Detail;
