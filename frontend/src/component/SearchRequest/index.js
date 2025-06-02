import classNames from 'classnames/bind';
import styles from '../DefaultPage/DefaultPage.module.scss';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SearchRequest({ onData2, getDuration }) {
    const [isAction, setIsAction] = useState(true);

    const handleSearchHidden = () => {
        const downIcon = document.querySelector('#icon-1');
        const upIcon = document.querySelector('#icon-2');
        const rdo = document.querySelectorAll('#id-radio-dfpage');

        if (!isAction) {
            downIcon.style.display = 'none';
            upIcon.style.display = 'block';
            rdo.forEach((i) => {
                i.style.display = 'none';
            });
            setIsAction(true);
        } else {
            downIcon.style.display = 'block';
            upIcon.style.display = 'none';
            rdo.forEach((i) => {
                i.style.display = 'block';
            });
            setIsAction(false);
        }
        console.log('e cu');
    };
    const sendDataToParent = (value) => {
        onData2(value);
    };

    const handleOption = (e) => {
        return e.target.value;
    };

    const [progress, setProgress] = useState(240);

    const convertToHourMinute = (progress) => {
        const hours = Math.floor(progress / 60);
        const minutes = progress % 60;
        return `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const handleProgressChange = (event) => {
        const value = parseInt(event.target.value);
        setProgress(value);
        // getDuration(value);
    };
    const handleMouseUp = () => {
        getDuration(progress);
    };

    return (
        <div className={cx('search_request')}>
            <div>
                <h6 className={cx('search_title')}>
                    Tìm kiếm theo hãng bay
                    <span onClick={handleSearchHidden}>
                        <FontAwesomeIcon
                            id="icon-1"
                            className={cx('search-icon')}
                            icon={faCaretDown}
                            style={{ display: 'block' }}
                        />
                        <FontAwesomeIcon
                            id="icon-2"
                            className={cx('search-icon')}
                            icon={faCaretUp}
                            style={{ display: 'none' }}
                        />
                    </span>
                </h6>

                <div>
                    <div
                        id={'id-radio-dfpage'}
                        className={cx('radio-content')}
                        onClick={(e) => sendDataToParent(handleOption(e))}
                    >
                        <input type="radio" id="VNA" value="VNA" name="company" onChange={(e) => handleOption(e)} />
                        <label htmlFor="VNA" className="ms-2">
                            Vietnam Airlines
                        </label>
                    </div>

                    <div
                        id={'id-radio-dfpage'}
                        className={cx('radio-content')}
                        onClick={(e) => sendDataToParent(handleOption(e))}
                    >
                        <input type="radio" id="QH" value="QH" name="company" onChange={(e) => handleOption(e)} />
                        <label htmlFor="QH" className="ms-2">
                            BamBo Airways
                        </label>
                    </div>
                    <div
                        id={'id-radio-dfpage'}
                        className={cx('radio-content')}
                        onClick={(e) => sendDataToParent(handleOption(e))}
                    >
                        <input type="radio" id="BL" value="BL" name="company" onChange={(e) => handleOption(e)} />
                        <label htmlFor="BL" className="ms-2">
                            Jetstar Pacific Airlines
                        </label>
                    </div>
                    <div
                        id={'id-radio-dfpage'}
                        className={cx('radio-content')}
                        onClick={(e) => sendDataToParent(handleOption(e))}
                    >
                        <input type="radio" id="VJ" value="VJ" name="company" onChange={(e) => handleOption(e)} />
                        <label htmlFor="VJ" className="ms-2">
                            VietJet Air
                        </label>
                    </div>
                </div>
                <div
                    id={'id-radio-dfpage'}
                    className={cx('radio-content')}
                    onClick={(e) => sendDataToParent(handleOption(e))}
                >
                    <input
                        type="radio"
                        id="all"
                        value="all"
                        name="company"
                        defaultChecked
                        onChange={(e) => handleOption(e)}
                    />
                    <label htmlFor="all" className="ms-2">
                        Tất cả
                    </label>
                </div>
            </div>

            <div>
                <h6 className={cx('search_title')}>Tìm kiếm theo thời lượng bay</h6>
                <input
                    type="range"
                    min="30"
                    max="240"
                    value={progress}
                    onChange={handleProgressChange}
                    onMouseUp={handleMouseUp}
                    className={cx('progress-bar')}
                    step={15}
                />
                <p className="ms-2">Thời lượng: 0.5h - {convertToHourMinute(progress)}</p>
            </div>
        </div>
    );
}

export default SearchRequest;
