export const matchStatusDict = new Map([
    // Футбол
    [
        1023,
        {
            id: 1023,
            brId: 1,
            statuses: [
                {
                    id: 6,
                    description: "1st half",
                    periodNumber: 1,
                    rusName: "1Т"
                },
                {
                    id: 7,
                    description: "2nd half",
                    periodNumber: 2,
                    rusName: "2Т"
                },
                {
                    id: 31,
                    description: "Halftime",
                    rusName: "Пер."
                },
                {
                    id: 32,
                    description: "Awaiting extra time",
                    rusName: "Пер."
                },
                {
                    id: 33,
                    description: "Extra time halftime",
                    rusName: "Пер."
                },
                {
                    id: 34,
                    description: "Awaiting penalties",
                    rusName: "Пен."
                },
                {
                    id: 41,
                    description: "1st extra",
                    rusName: "1Т ОТ"
                },
                {
                    id: 42,
                    description: "2st extra",
                    rusName: "2Т ОТ"
                },
                {
                    id: 50,
                    description: "Penalties",
                    rusName: "Пен."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 100,
                    description: "Ended",
                    rusName: "Итог"
                },
                {
                    id: 110,
                    description: "AET",
                    rusName: "После ОТ"
                },
                {
                    id: 120,
                    description: "AP",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Basketball
    [
        1016,
        {
            id: 1016,
            brId: 2,
            statuses: [
                {
                    id: 13,
                    description: "1st quarter",
                    periodNumber: 1,
                    rusName: "1Ч"
                },
                {
                    id: 14,
                    description: "2nd quarter",
                    periodNumber: 2,
                    rusName: "2Ч"
                },
                {
                    id: 15,
                    description: "3nd quarter",
                    periodNumber: 3,
                    rusName: "3Ч"
                },
                {
                    id: 16,
                    description: "4nd quarter",
                    periodNumber: 4,
                    rusName: "4Ч"
                },
                {
                    id: 32,
                    description: "Awaiting extra time",
                    rusName: "ОТ"
                },
                {
                    id: 40,
                    description: "Overtime",
                    rusName: "ОТ"
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 100,
                    description: "Ended",
                    rusName: "Итог"
                },
                {
                    id: 110,
                    description: "AET",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Volleyball
    [
        1035,
        {
            id: 1035,
            brId: 23,
            statuses: [
                {
                    id: 8,
                    description: "1st set",
                    periodNumber: 1,
                    rusName: "1С"
                },
                {
                    id: 9,
                    description: "2nd set",
                    periodNumber: 2,
                    rusName: "2С"
                },
                {
                    id: 10,
                    description: "3rd set",
                    periodNumber: 3,
                    rusName: "3С"
                },
                {
                    id: 11,
                    description: "4th set",
                    periodNumber: 4,
                    rusName: "4С"
                },
                {
                    id: 12,
                    description: "5th set",
                    periodNumber: 5,
                    rusName: "5С"
                },
                {
                    id: 17,
                    description: "Golden set",
                    rusName: "Зол. сет"
                },
                {
                    id: 37,
                    description: "Awaiting golden set",
                    rusName: "Зол. сет"
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 304,
                    description: "Fourth break",
                    rusName: "Пер.4"
                },
                {
                    id: 305,
                    description: "Fifth break",
                    rusName: "Пер.5"
                },
                {
                    id: 306,
                    description: "Sixth break",
                    rusName: "Пер.6"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 441,
                    description: "6th set",
                    periodNumber: 6,
                    rusName: "6С"
                },
                {
                    id: 442,
                    description: "7th set",
                    periodNumber: 7,
                    rusName: "7С"
                },
                {
                    id: 130,
                    description: "After golden set",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Baseball
    [
        1015,
        {
            id: 1015,
            brId: 3,
            statuses: [
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 401,
                    description: "1st inning top",
                    rusName: "Верх 1"
                },
                {
                    id: 402,
                    description: "1st inning bottom",
                    rusName: "Низ 1"
                },
                {
                    id: 403,
                    description: "2nd inning top",
                    rusName: "Верх 2"
                },
                {
                    id: 404,
                    description: "2nd inning bottom",
                    rusName: "Низ 2"
                },
                {
                    id: 405,
                    description: "3rd inning top",
                    rusName: "Верх 3"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 434,
                    description: "Break top8-bottom7",
                    rusName: "Верх 8"
                },
                {
                    id: 435,
                    description: "Break top8-bottom8",
                    rusName: "Низ 8"
                },
                {
                    id: 436,
                    description: "Break top9-bottom8",
                    rusName: "Верх 9"
                },
                {
                    id: 437,
                    description: "Break top9-bottom9",
                    rusName: "Низ 9"
                },
                {
                    id: 439,
                    description: "Break topEI-bottomEI",
                    rusName: "Низ ЭИ"
                },
                {
                    id: 512,
                    description: "Tea break",
                    rusName: "Чайный пер."
                },
                {
                    id: 407,
                    description: "4th inning top",
                    rusName: "Верх 4"
                },
                {
                    id: 408,
                    description: "4th inning bottom",
                    rusName: "Низ 4"
                },
                {
                    id: 407,
                    description: "4th inning top",
                    rusName: "Верх 4"
                },
                {
                    id: 408,
                    description: "4th inning bottom",
                    rusName: "Низ 4"
                },
                {
                    id: 409,
                    description: "5th inning top",
                    rusName: "Верх 5"
                },
                {
                    id: 410,
                    description: "5th inning bottom",
                    rusName: "Низ 5"
                },
                {
                    id: 411,
                    description: "6th inning top",
                    rusName: "Верх 6"
                },
                {
                    id: 412,
                    description: "6th inning bottom",
                    rusName: "Низ 6"
                },
                {
                    id: 413,
                    description: "7th inning top",
                    rusName: "Верх 7"
                },
                {
                    id: 414,
                    description: "7th inning bottom",
                    rusName: "Низ 7"
                },
                {
                    id: 415,
                    description: "8th inning top",
                    rusName: "Верх 8"
                },
                {
                    id: 416,
                    description: "8th inning bottom",
                    rusName: "Низ 8"
                },
                {
                    id: 417,
                    description: "9th inning top",
                    rusName: "Верх 9"
                },
                {
                    id: 418,
                    description: "9th inning bottom",
                    rusName: "Низ 9"
                },
                {
                    id: 419,
                    description: "Extra inning top",
                    rusName: "Верх ЭИ"
                },
                {
                    id: 420,
                    description: "Extra inning bottom",
                    rusName: "Низ ЭИ"
                },
                {
                    id: 421,
                    description: "Break top1-bottom1",
                    rusName: "Низ 1"
                },
                {
                    id: 422,
                    description: "Break top2-bottom1",
                    rusName: "Верх 2"
                },
                {
                    id: 423,
                    description: "Break top2-bottom2",
                    rusName: "Низ 2"
                },
                {
                    id: 424,
                    description: "Break top3-bottom2",
                    rusName: "Верх 3"
                },
                {
                    id: 425,
                    description: "Break top3-bottom3",
                    rusName: "Низ 3"
                },
                {
                    id: 426,
                    description: "Break top4-bottom3",
                    rusName: "Верх 4"
                },
                {
                    id: 427,
                    description: "Break top4-bottom4",
                    rusName: "Низ 4"
                },
                {
                    id: 428,
                    description: "Break top5-bottom4",
                    rusName: "Верх 5"
                },
                {
                    id: 429,
                    description: "Break top5-bottom5",
                    rusName: "Низ 5"
                },
                {
                    id: 430,
                    description: "Break top6-bottom5",
                    rusName: "Верх 6"
                },
                {
                    id: 431,
                    description: "Break top6-bottom6",
                    rusName: "Низ 6"
                },
                {
                    id: 432,
                    description: "Break top7-bottom6",
                    rusName: "Верх 7"
                }
            ]
        }
    ],

    // Badminton
    [
        1014,
        {
            id: 1014,
            brId: 31,
            statuses: [
                {
                    id: 8,
                    description: "1st set",
                    periodNumber: 1,
                    rusName: "1С"
                },
                {
                    id: 9,
                    description: "2nd set",
                    periodNumber: 2,
                    rusName: "2С"
                },
                {
                    id: 10,
                    description: "3rd set",
                    periodNumber: 3,
                    rusName: "3С"
                },
                {
                    id: 11,
                    description: "4th set",
                    periodNumber: 4,
                    rusName: "4С"
                },
                {
                    id: 12,
                    description: "5th set",
                    periodNumber: 5,
                    rusName: "5С"
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 304,
                    description: "Fourth break",
                    rusName: "Пер.4"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 97,
                    description: "Player 1 defaulted, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 98,
                    description: "Player 2 defaulted, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Darts
    [
        1022,
        {
            id: 1022,
            brId: 22,
            statuses: [
                {
                    id: 21,
                    description: "In progress",
                    rusName: "В игре"
                },
                {
                    id: 30,
                    description: "Break",
                    rusName: "Пер."
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 97,
                    description: "Player 1 defaulted, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 98,
                    description: "Player 2 defaulted, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Cricket
    [
        1021,
        {
            id: 1021,
            brId: 21,
            statuses: [
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 501,
                    description: "First innings, home team",
                    rusName: "1 инн."
                },
                {
                    id: 502,
                    description: "First innings, away team",
                    rusName: "1 инн."
                },
                {
                    id: 503,
                    description: "Second innings, home team",
                    rusName: "2 инн."
                },
                {
                    id: 504,
                    description: "Second innngs, away team",
                    rusName: "2 инн."
                },
                {
                    id: 505,
                    description: "Awaiting super overs",
                    rusName: "Суперовер"
                },
                {
                    id: 506,
                    description: "Super over, home team",
                    rusName: "Суперовер"
                },
                {
                    id: 507,
                    description: "Super over, away team",
                    rusName: "Суперовер"
                },
                {
                    id: 508,
                    description: "After super over",
                    rusName: "Итог"
                },
                {
                    id: 509,
                    description: "Innings break",
                    rusName: "Пер."
                },
                {
                    id: 510,
                    description: "Super over break",
                    rusName: "Пер."
                },
                {
                    id: 511,
                    description: "Lunch break",
                    rusName: "Ланч"
                },
                {
                    id: 512,
                    description: "Tea break",
                    rusName: "Чайный пер."
                },
                {
                    id: 513,
                    description: "Stumps",
                    rusName: "Stumps"
                }
            ]
        }
    ],

    // Bowls
    [
        1019,
        {
            id: 1019,
            brId: 32,
            statuses: [
                {
                    id: 8,
                    description: "1st set",
                    periodNumber: 1,
                    rusName: "1C"
                },
                {
                    id: 9,
                    description: "2nd set",
                    periodNumber: 2,
                    rusName: "2C"
                },
                {
                    id: 10,
                    description: "3rd set",
                    periodNumber: 3,
                    rusName: "3C"
                },
                {
                    id: 11,
                    description: "4th set",
                    periodNumber: 4,
                    rusName: "4C"
                },
                {
                    id: 12,
                    description: "5th set",
                    periodNumber: 5,
                    rusName: "5C"
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 304,
                    description: "Fourth break",
                    rusName: "Пер.4"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 97,
                    description: "Player 1 defaulted, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 98,
                    description: "Player 2 defaulted, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Beach Volley
    [
        1017,
        {
            id: 1017,
            brId: 34,
            statuses: [
                {
                    id: 8,
                    description: "1st set",
                    periodNumber: 1,
                    rusName: "1С"
                },
                {
                    id: 9,
                    description: "2nd set",
                    periodNumber: 2,
                    rusName: "2С"
                },
                {
                    id: 10,
                    description: "3rd set",
                    periodNumber: 3,
                    rusName: "3С"
                },
                {
                    id: 11,
                    description: "4th set",
                    periodNumber: 4,
                    rusName: "4С"
                },
                {
                    id: 12,
                    description: "5th set",
                    periodNumber: 5,
                    rusName: "5С"
                },
                {
                    id: 17,
                    description: "Golden set",
                    rusName: "Зол. сет"
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 304,
                    description: "Fourth break",
                    rusName: "Пер.4"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Hockey
    [
        1027,
        {
            id: 1027,
            brId: 4,
            statuses: [
                {
                    id: 1,
                    description: "1st period",
                    periodNumber: 1,
                    rusName: "1П"
                },
                {
                    id: 2,
                    description: "2nd period",
                    periodNumber: 2,
                    rusName: "2П"
                },

                {
                    id: 3,
                    description: "3rd period",
                    periodNumber: 3,
                    rusName: "3П"
                },
                {
                    id: 32,
                    description: "Awaiting extra time",
                    rusName: "ОТ"
                },
                {
                    id: 34,
                    description: "Awaiting penalties",
                    rusName: "Булл."
                },
                {
                    id: 40,
                    description: "Overtime",
                    rusName: "ОТ"
                },
                {
                    id: 50,
                    description: "Penalties",
                    rusName: "Булл."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 110,
                    description: "AET ",
                    rusName: "После ОТ"
                },
                {
                    id: 120,
                    description: "AP ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Handball
    [
        1028,
        {
            id: 1028,
            brId: 6,
            statuses: [
                {
                    id: 6,
                    description: "1st half",
                    periodNumber: 1,
                    rusName: "1Т"
                },
                {
                    id: 7,
                    description: "2nd half",
                    periodNumber: 2,
                    rusName: "2Т"
                },
                {
                    id: 31,
                    description: "Halftime",
                    rusName: "Пер."
                },
                {
                    id: 32,
                    description: "Awaiting extra time",
                    rusName: "ОТ"
                },
                {
                    id: 33,
                    description: "Extra time halftime",
                    rusName: "Пер. ОТ"
                },
                {
                    id: 34,
                    description: "Awaiting penalties",
                    rusName: "Пен."
                },
                {
                    id: 41,
                    description: "1st extra",
                    rusName: "1Т ОТ"
                },
                {
                    id: 42,
                    description: "2nd extra",
                    rusName: "2Т ОТ"
                },
                {
                    id: 50,
                    description: "Penalties",
                    rusName: "Пен."
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 110,
                    description: "AET ",
                    rusName: "После ОТ"
                },
                {
                    id: 120,
                    description: "AP ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Tennis
    [
        1034,
        {
            id: 1034,
            brId: 5,
            statuses: [
                {
                    id: 8,
                    description: "1st set",
                    periodNumber: 1,
                    rusName: "1С"
                },
                {
                    id: 9,
                    description: "2nd set",
                    periodNumber: 2,
                    rusName: "2С"
                },
                {
                    id: 10,
                    description: "3rd set",
                    periodNumber: 3,
                    rusName: "3С"
                },
                {
                    id: 11,
                    description: "4th set",
                    periodNumber: 4,
                    rusName: "4С"
                },
                {
                    id: 12,
                    description: "5th set",
                    periodNumber: 5,
                    rusName: "5С"
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Table tennis
    [
        1033,
        {
            id: 1033,
            brId: 20,
            statuses: [
                {
                    id: 8,
                    description: "1st set",
                    periodNumber: 1,
                    rusName: "1С"
                },
                {
                    id: 9,
                    description: "2nd set",
                    periodNumber: 2,
                    rusName: "2С"
                },
                {
                    id: 10,
                    description: "3rd set",
                    periodNumber: 3,
                    rusName: "3С"
                },
                {
                    id: 11,
                    description: "4th set",
                    periodNumber: 4,
                    rusName: "4С"
                },
                {
                    id: 12,
                    description: "5th set",
                    periodNumber: 5,
                    rusName: "5С"
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 304,
                    description: "Fourth break",
                    rusName: "Пер.4"
                },
                {
                    id: 305,
                    description: "Fifth break",
                    rusName: "Пер.5"
                },
                {
                    id: 306,
                    description: "Sixth break",
                    rusName: "Пер.6"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 97,
                    description: "Player 1 defaulted, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 98,
                    description: "Player 2 defaulted, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 441,
                    description: "6th set",
                    periodNumber: 6,
                    rusName: "6С"
                },
                {
                    id: 442,
                    description: "7th set",
                    periodNumber: 7,
                    rusName: "7С"
                }
            ]
        }
    ],

    // Snooker
    [
        1036,
        {
            id: 1036,
            brId: 19,
            statuses: [
                {
                    id: 21,
                    description: "In progress",
                    rusName: "В игре"
                },
                {
                    id: 30,
                    description: "Break",
                    rusName: "Пер."
                },
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 97,
                    description: "Player 1 defaulted, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 98,
                    description: "Player 2 defaulted, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 445,
                    description: "Break",
                    rusName: "Пер."
                }
            ]
        }
    ],

    // Rugby
    [
        1031,
        {
            id: 1031,
            brId: 12,
            statuses: [
                {
                    id: 6,
                    description: "1st half",
                    periodNumber: 1,
                    rusName: "1Т"
                },
                {
                    id: 7,
                    description: "2nd half",
                    periodNumber: 2,
                    rusName: "2Т"
                },
                {
                    id: 31,
                    description: "Halftime",
                    rusName: "Пер."
                },
                {
                    id: 32,
                    description: "Awaiting extra time",
                    rusName: "ОТ"
                },
                {
                    id: 33,
                    description: "Extra time halftime",
                    rusName: "ОТ Пер."
                },
                {
                    id: 34,
                    description: "Awaiting penalties",
                    rusName: "Пен."
                },
                {
                    id: 41,
                    description: "1st extra",
                    rusName: "1Т ОТ"
                },
                {
                    id: 42,
                    description: "2nd extra",
                    rusName: "2Т ОТ"
                },
                {
                    id: 50,
                    description: "Penalties",
                    rusName: "Пен."
                },
                {
                    id: 60,
                    description: "Postponed",
                    rusName: "Отложен"
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 440,
                    description: "Sudden death ",
                    rusName: "Правило мгновенной смерти"
                },
                {
                    id: 443,
                    description: "Awaiting sudden death ",
                    rusName: "Ожидание правила мгновенной смерти"
                },
                {
                    id: 444,
                    description: "After sudden death ",
                    rusName: "После правила мгновенной смерти"
                },
                {
                    id: 110,
                    description: "AET ",
                    rusName: "После ОТ"
                },
                {
                    id: 120,
                    description: "AP ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Am. Football
    [
        1012,
        {
            id: 1012,
            brId: 16,
            statuses: [
                {
                    id: 13,
                    description: "1st quarter",
                    periodNumber: 1,
                    rusName: "1Ч"
                },
                {
                    id: 14,
                    description: "2nd quarter",
                    periodNumber: 2,
                    rusName: "2Ч"
                },
                {
                    id: 15,
                    description: "3rd quarter",
                    periodNumber: 3,
                    rusName: "3Ч"
                },
                {
                    id: 16,
                    description: "4th quarter",
                    periodNumber: 4,
                    rusName: "4Ч"
                },
                {
                    id: 32,
                    description: "Awaiting extra time",
                    rusName: "ОТ"
                },
                {
                    id: 40,
                    description: "Overtime",
                    rusName: "ОТ"
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 110,
                    description: "AET ",
                    rusName: "После ОТ"
                }
            ]
        }
    ],

    // Au Football
    [
        1013,
        {
            id: 1013,
            brId: 13,
            statuses: [
                {
                    id: 13,
                    description: "1st quarter",
                    periodNumber: 1,
                    rusName: "1Ч"
                },
                {
                    id: 14,
                    description: "2nd quarter",
                    periodNumber: 2,
                    rusName: "2Ч"
                },
                {
                    id: 15,
                    description: "3rd quarter",
                    periodNumber: 3,
                    rusName: "3Ч"
                },
                {
                    id: 16,
                    description: "4th quarter",
                    periodNumber: 4,
                    rusName: "4Ч"
                },
                {
                    id: 32,
                    description: "Awaiting extra time",
                    rusName: "ОТ"
                },
                {
                    id: 33,
                    description: "Extra time halftime",
                    rusName: "Пер."
                },
                {
                    id: 41,
                    description: "1st extra",
                    rusName: "1Т ОТ"
                },
                {
                    id: 42,
                    description: "2nd extra",
                    rusName: "2Т ОТ"
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 440,
                    description: "Sudden death ",
                    rusName: "Правило мгновенной смерти"
                },
                {
                    id: 443,
                    description: "Awaiting sudden death ",
                    rusName: "Ожидание правила мгновенной смерти"
                },
                {
                    id: 444,
                    description: "After sudden death ",
                    rusName: "После правила мгновенной смерти"
                },
                {
                    id: 110,
                    description: "AET ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Futsal
    [
        1103,
        {
            id: 1103,
            brId: 29,
            statuses: [
                {
                    id: 6,
                    description: "1st half",
                    periodNumber: 1,
                    rusName: "1Т"
                },
                {
                    id: 7,
                    description: "2nd half",
                    periodNumber: 2,
                    rusName: "2Т"
                },
                {
                    id: 31,
                    description: "Halftime",
                    rusName: "Пер."
                },
                {
                    id: 32,
                    description: "Awaiting extra time",
                    rusName: "ОТ"
                },
                {
                    id: 33,
                    description: "Extra time halftime",
                    rusName: "Пер. ОТ"
                },
                {
                    id: 34,
                    description: "Awaiting penalties",
                    rusName: "Пен."
                },
                {
                    id: 41,
                    description: "1st extra",
                    rusName: "1Т ОТ"
                },
                {
                    id: 42,
                    description: "2nd extra",
                    rusName: "2Т ОТ"
                },
                {
                    id: 50,
                    description: "Penalties",
                    rusName: "Пен."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 110,
                    description: "AET ",
                    rusName: "После ОТ"
                },
                {
                    id: 120,
                    description: "AP ",
                    rusName: "Итог"
                }
            ]
        }
    ],

    // Squash
    [
        1107,
        {
            id: 1107,
            brId: 37,
            statuses: [
                {
                    id: 61,
                    description: "Start delayed",
                    rusName: "Задерж."
                },
                {
                    id: 80,
                    description: "Interrupted",
                    rusName: "Прерван"
                },
                {
                    id: 90,
                    description: "Abandoned",
                    rusName: "Отменен"
                },
                {
                    id: 301,
                    description: "First break",
                    rusName: "Пер.1"
                },
                {
                    id: 302,
                    description: "Second break",
                    rusName: "Пер.2"
                },
                {
                    id: 303,
                    description: "Third break",
                    rusName: "Пер.3"
                },
                {
                    id: 304,
                    description: "Fourth break",
                    rusName: "Пер.4"
                },
                {
                    id: 93,
                    description: "Walkover, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 94,
                    description: "Walkover, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 95,
                    description: "Player 1 retired, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 96,
                    description: "Player 2 retired, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 97,
                    description: "Player 1 defaulted, player 2 won",
                    rusName: "Итог"
                },
                {
                    id: 98,
                    description: "Player 2 defaulted, player 1 won",
                    rusName: "Итог"
                },
                {
                    id: 100,
                    description: "Ended ",
                    rusName: "Итог"
                },
                {
                    id: 151,
                    description: "1st Game",
                    periodNumber: 1,
                    rusName: "1 гейм"
                },
                {
                    id: 152,
                    description: "2nd Game",
                    periodNumber: 2,
                    rusName: "2 гейм"
                },
                {
                    id: 153,
                    description: "3rd Game",
                    periodNumber: 3,
                    rusName: "3 гейм"
                },
                {
                    id: 154,
                    description: "4th Game",
                    periodNumber: 4,
                    rusName: "4 гейм"
                },
                {
                    id: 155,
                    description: "5th Game",
                    periodNumber: 5,
                    rusName: "5 гейм"
                }
            ]
        }
    ]
]);
