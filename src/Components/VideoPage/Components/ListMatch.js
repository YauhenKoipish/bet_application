import React from "react";
// Сделать по аналогии с моим
export const ListEvent = event => {
    return (
        <div className='tv__schedule-list tv-schedule'>
            <div className='tv-schedule__nav'>
                <div className='tv-schedule__chosen'>Все</div>
                <div className='tv-schedule__list-nav'>
                    <div className='tv-schedule__elem active'>Все</div>
                    <div className='tv-schedule__elem'>Футбол</div>
                    <div className='tv-schedule__elem'>Теннис</div>
                    <div className='tv-schedule__elem'>Баскетбол</div>
                    <div className='tv-schedule__elem'>Волейбол</div>
                    <div className='tv-schedule__elem'>Рэгби</div>
                    <div className='tv-schedule__elem'>Хоккей</div>
                </div>
            </div>

            <div className='tv-schedule__list'>
                <div className='tv-stream__filters'>
                    <div className='tv-stream__filter'>
                        <div className='tv-stream__type'>
                            <span>Ближайшие</span>
                        </div>
                        <div className='tv-stream__date'>
                            <span>13/04/2018</span>
                        </div>
                    </div>
                    <div className='tv-stream__elements'>
                        <div className='tv-stream__item live'>
                            <div className='tv-stream__wrapper'>
                                <div className='tv-stream__title'>
                                    <div className='tv-stream__sport'>
                                        Теннис
                                    </div>
                                    <div className='tv-stream__time'>Live</div>
                                </div>
                                <div className='tv-stream__teams'>
                                    Младенович / Нестор – Рэймонд / Линдстедт
                                </div>
                            </div>
                        </div>
                        <div className='tv-stream__item'>
                            <div className='tv-stream__wrapper'>
                                <div className='tv-stream__title'>
                                    <div className='tv-stream__sport'>
                                        Теннис
                                    </div>
                                    <div className='tv-stream__time'>Live</div>
                                </div>
                                <div className='tv-stream__teams'>
                                    Младенович / Нестор – Рэймонд / Линдстедт
                                </div>
                            </div>
                        </div>
                        <div className='tv-stream__item'>
                            <div className='tv-stream__wrapper'>
                                <div className='tv-stream__title'>
                                    <div className='tv-stream__sport'>
                                        Теннис
                                    </div>
                                    <div className='tv-stream__time'>Live</div>
                                </div>
                                <div className='tv-stream__teams'>
                                    Младенович / Нестор – Рэймонд / Линдстедт
                                </div>
                            </div>
                        </div>
                        <div className='tv-stream__item'>
                            <div className='tv-stream__wrapper'>
                                <div className='tv-stream__title'>
                                    <div className='tv-stream__sport'>
                                        Теннис
                                    </div>
                                    <div className='tv-stream__time'>Live</div>
                                </div>
                                <div className='tv-stream__teams'>
                                    Младенович / Нестор – Рэймонд / Линдстедт
                                </div>
                            </div>
                        </div>
                        <div className='tv-stream__item'>
                            <div className='tv-stream__wrapper'>
                                <div className='tv-stream__title'>
                                    <div className='tv-stream__sport'>
                                        Теннис
                                    </div>
                                    <div className='tv-stream__time'>Live</div>
                                </div>
                                <div className='tv-stream__teams'>
                                    Младенович / Нестор – Рэймонд / Линдстедт
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='tv-schedule__close' />
        </div>
    );
};
