import React from "react";
import Slider from "./Components/Slider";

// import "./style/alfa-club.css";
// import "./style/terms.css";

const AlfaClub = () => {
    return (
        <div className="alfa-club">
            <div className="alfa-club__header">
                <div className="alfa-club__title">
                    Alfa club – <br />
                    бонусы и привилегии
                </div>
                <div className="alfa-club__motto">ваша выгода каждый день</div>
            </div>

            <div className="alfa-club__top">
                <Slider className="alfa-club__slider" />

                <div className="alfa-club__legend">
                    <div className="alfa-club__elem">
                        <div className="alfa-club__icon points" />
                        <div className="alfa-club__description">
                            &mdash; очки
                        </div>
                    </div>
                    <div className="alfa-club__elem">
                        <div className="alfa-club__icon min" />
                        <div className="alfa-club__description">
                            &mdash; неободимый минимум очков для вступления в
                            лигу
                        </div>
                    </div>
                    <div className="alfa-club__elem">
                        <div className="alfa-club__icon bonus-icon" />
                        <div className="alfa-club__description">
                            &mdash; бонусные единицы
                        </div>
                    </div>
                    <div className="alfa-club__elem">
                        <div className="alfa-club__icon cashback" />
                        <div className="alfa-club__description">
                            &mdash; кэшбек
                        </div>
                    </div>
                    <div className="alfa-club__elem">
                        <div className="alfa-club__icon freebet" />
                        <div className="alfa-club__description">
                            &mdash; фрибет
                        </div>
                    </div>
                    <div className="alfa-club__elem">
                        <div className="alfa-club__icon max" />
                        <div className="alfa-club__description">
                            &mdash; максимальная сумма кэшбека в лиге
                        </div>
                    </div>
                </div>
            </div>

            <div className="alfa-club__terms terms terms--first">
                <div className="terms__title">Условия</div>
                <div className="terms__description">
                    Описание Уровней программы лояльности
                </div>
                <div className="terms__list">
                    <p className="terms__text">
                        1. <b>Дворовая лига</b>: начальный уровень в программе
                        лояльности. В ней игрок не получает никаких бонусов.
                        Чтобы перейти на следующий уровень, необходимо набрать{" "}
                        <b>50 очков</b> на этом уровне.
                    </p>
                    <p className="terms__text">
                        2. <b>Любительская лига</b>: при вступлении в лигу игрок
                        получает фрибет <b>500 рублей</b> на бонусный счет. За
                        каждое начисленное очко <b>3 единицы</b> на бонусный
                        счет. Кэшбэк в данной лиге составляет <b>5%</b>, а
                        максимальная сумма кэшбека = <b>5 000 единиц</b> на
                        бонусный счет. Чтобы перейти из Любительской лиги в лигу
                        Про необходимо набрать <b>1 000 очков</b>.
                    </p>
                    <p className="terms__text">
                        3. <b>Лига Про</b>: при вступлении в лигу игрок получает
                        фрибет <b>1 000 рублей</b> на бонусный счет. За каждое
                        начисленное очко <b>4 единицы</b> на бонусный счет.
                        Кэшбэк в данной лиге составляет <b>6%</b>, а
                        максимальная сумма кэшбека = <b>10 000 единиц</b> на
                        бонусный счет. Чтобы перейти из Профессиональной лиги в
                        Первую лигу необходимо набрать <b>5 000 очков</b>.
                    </p>
                    <p className="terms__text">
                        4. <b>Первая лига</b>: при вступлении в лигу игрок
                        получает фрибет <b>2 000 рублей</b> на бонусный счет. За
                        каждое начисленное очко <b>5 единиц</b> на бонусный
                        счет. Кэшбэк в данной лиге составляет <b>7%</b>, а
                        максимальная сумма кэшбека = <b>25 000 единиц</b> на
                        бонусный счет. Чтобы перейти из Первой лиги в Премьер
                        лигу необходимо набрать <b>25 000 очков</b>.
                    </p>
                    <p className="terms__text">
                        5. <b>Премьер лига</b>: при вступлении в лигу игрок
                        получает фрибет <b>5 000 рублей</b> на бонусный счет. За
                        каждое начисленное очко <b>5 единиц</b> на бонусный
                        счет. Кэшбэк в данной лиге составляет <b>10%</b>, а
                        максимальная сумма кэшбека = <b>50 000 единиц</b> на
                        бонусный счет. Чтобы перейти из Премьер лиги в Лигу
                        чемпионов необходимо набрать <b>100 000 очков</b>.
                    </p>
                    <p className="terms__text">
                        6. <b>Лига чемпионов</b>: при вступлении в лигу игрок
                        получает фрибет <b>10 000 рублей</b> на бонусный счет.
                        За каждое начисленное очко <b>5 единиц</b> на бонусный
                        счет. Кэшбэк в данной лиге составляет <b>15%</b>, а
                        максимальная сумма кэшбека = <b>100 000 единиц</b> на
                        бонусный счет.
                    </p>
                </div>
            </div>

            <div className="alfa-club__terms terms">
                <div className="terms__title">Правила</div>
                <div className="terms__list">
                    <p className="terms__text">
                        1. В программе лояльности учитываются ваши ставки с того
                        момента, как вы зарегистрировались в букмекерской
                        компании company. На основании этих ставок вам будут
                        начисляться очки лояльности.
                    </p>
                    <p className="terms__text">
                        2. Очки лояльности начисляются только за квалифицирующие
                        ставки.
                    </p>
                    <div className="terms__rules">
                        <p className="terms__text">
                            3. В зачет идут все ставки, если они соответствует
                            следующим условиям:
                        </p>
                        <ul className="terms__specification">
                            <li>общая сумма ставки не менее 500 рублей</li>
                            <li>коэффициент ставки равен не менее 1.30</li>
                        </ul>
                    </div>
                    <p className="terms__text">
                        4. Расчет очков происходит по формуле 1 очко = сумма
                        ставки * кол-во событий с кф. &ge; 1.3 / 500.
                    </p>
                    <p className="terms__text">
                        5. Очки лояльности начисляются только после расчета
                        квалифицирующей ставки.
                    </p>
                    <p className="terms__text">
                        6. События, по которым произведена отмена, будут
                        рассматриваться как события с коэффициентом 1.0.
                    </p>
                    <p className="terms__text">
                        7. Ставки, к которым была применена функция «Кэшаут» или
                        «Редактирование ставки», не являются квалифицирующими
                        для начисления очков лояльности.
                    </p>
                    <p className="terms__text">
                        8. Игрок начинает с уровня «Любительской лиги». Если по
                        истечении месяца игрок не наберет 50 очков, он
                        отправится на понижение в «Дворовую лигу».
                    </p>
                    <p className="terms__text">
                        9. Достигнутый уровень игрока сохраняется на следующий
                        месяц. Далее игрок может оказаться в любой лиге
                        бонус-клуба, в зависимости от того, сколько он набрал
                        очков в расчетном месяце.
                    </p>
                    <p className="terms__text">
                        10. Процент Кэшбэка рассчитывается по формуле: разница
                        между суммой принятых ставок и суммой выплаченных
                        ставок. Если разница будет меньше 0, то процент кэшбека
                        рассчитывается от этого числа. За промежуток недельной
                        активности с 00:01 понедельника до 23:59 воскресенья (по
                        мск).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AlfaClub;
