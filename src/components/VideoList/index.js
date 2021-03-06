import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import 'swiper/css';
import tmdbApi from '~/api/tmdbApi';
import Button from '../GlobalComponents/Button';
import VideoCard from '../VideoCard';
import styles from './VideoList.module.scss';
const cx = classNames.bind(styles);

function VideoList({ category, type, search, keyword }) {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (category === 'movie' && !keyword) {
            const params = { page: page };
            const getVideoCardList = async () => {
                try {
                    const res = await tmdbApi.getMoviesList(type, { params });
                    setTotalPages(res.total_pages);
                    setItems(res.results);
                    setItems((prev) => items.concat(prev));
                } catch (error) {
                    alert('the requested page not found');
                }
            };
            getVideoCardList();
        } else if (category === 'tv' && !keyword) {
            const params = { page: page };
            const getVideoCardList = async () => {
                try {
                    const res = await tmdbApi.getTvList(type, { params });
                    setTotalPages(res.total_pages);
                    setItems(res.results);
                    setItems((prev) => items.concat(prev));
                } catch (error) {
                    alert('the requested page not found');
                }
            };
            getVideoCardList();
        } else {
            const params = { query: search };
            const getVideoCardList = async () => {
                try {
                    const res = await tmdbApi.search(category, { params });
                    setTotalPages(res.total_pages);
                    setItems(res.results);
                    console.log(res.results.length);
                    if (page > 1) {
                        setItems((prev) => items.concat(prev));
                    }
                } catch (error) {
                    console.log('page not found');
                }
            };
            getVideoCardList();
        }
    }, [page, search, category, keyword, type]);

    const handOnClickLoadMore = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className={cx('list-container')}>
            {items.length > 0 && keyword && <h1 className={cx('title')}>{`Search results for "${keyword}"`} </h1>}
            {items.length === 0 && keyword && <h1 className={cx('title')}>{`Not found for "${keyword}"`} </h1>}
            {items.length > 0 && (
                <div className={cx('list')}>
                    <div className={cx('list-item')}>
                        {items.map((item, i) => (
                            <VideoCard
                                key={`category-${i}`}
                                title={item.title}
                                posterPath={item.poster_path}
                                category={category}
                                id={item.id}
                            />
                        ))}
                    </div>
                </div>
            )}
            {items.length > 0 && (
                <div className={cx('load-more')}>
                    <Button disable={page === totalPages} outline small onClick={handOnClickLoadMore}>
                        Load more
                    </Button>
                </div>
            )}
        </div>
    );
}

export default VideoList;
