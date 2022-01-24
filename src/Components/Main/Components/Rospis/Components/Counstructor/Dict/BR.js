export const BetRadarDict = {
    totalGoals: {
        dict: new Map([
            [30003, [["over", "under"], ["both"], ["match"]]],
            [30233, [["over", "under"], ["home"], ["match"]]],
            [30234, [["over", "under"], ["away"], ["match"]]],
            [30253, [["over", "under"], ["both"], ["firstHalf"]]],
            [30264, [["over", "under"], ["both"], ["secondHalf"]]],
            [30232, [["exact"], ["both"], ["match"]]],
            [31749, [["exact"], ["both"], ["match"]]],
            [8726, [["exact"], ["both"], ["match"]]],
            [30235, [["exact"], ["both"], ["match"]]],
            [30237, [["exact"], ["home"], ["match"]]],
            [31751, [["exact"], ["home"], ["match"]]],
            [10869, [["exact"], ["home"], ["match"]]],
            [30238, [["exact"], ["home"], ["match"]]],
            [30240, [["exact"], ["away"], ["match"]]],
            [30239, [["exact"], ["away"], ["match"]]],
            [31752, [["exact"], ["away"], ["match"]]],
            [10870, [["exact"], ["away"], ["match"]]],

            [30253, [["over", "under"], ["both"], ["firstHalf"]]],

            [30269, [["exact"], ["both"], ["firstHalf"]]],
            [31750, [["exact"], ["both"], ["firstHalf"]]],
            [10146, [["exact"], ["both"], ["firstHalf"]]],
            [30264, [["over", "under"], ["both"], ["secondHalf"]]]
        ]),
        stepsNum: 4,
        name: "totalGoals",
        rusName: "Тотал голов",
        ids: [
            30003,
            30233,
            30234,
            30253,
            30264,
            31749,
            8726,
            30235,
            30232,
            30237,
            30240,
            30239,
            30269,
            10869,
            30238,
            10870,
            10146
        ]
    },
    totalCorners: {
        dict: new Map([
            [30329, [["over", "under"], ["both"], ["match"]]],
            [30330, [["over", "under"], ["home"], ["match"]]],
            [30331, [["over", "under"], ["away"], ["match"]]],
            [30337, [["over", "under"], ["both"], ["firstHalf"]]]
            // [178, [["over", "under"], ["home"], ["firstHalf"]]],
            // [179, [["over", "under"], ["away"], ["firstHalf"]]]
        ]),
        stepsNum: 4,
        name: "totalCorners",
        rusName: "Угловые",
        ids: [30329, 30330, 30331, 30337]
    },
    totalCards: {
        dict: new Map([[30308, [["over", "under"], ["both"], ["match"]]]]),
        stepsNum: 3,
        name: "totalCards",
        rusName: "Карточки",
        ids: [30308]
    },
    oneXTwo: {
        dict: new Map([
            [30001, [["match"]]],
            [30078, [["firstHalf"]]],
            [30120, [["secondHalf"]]]
        ]),
        name: "oneXTwo",
        rusName: "Исход",
        stepsNum: 2,
        ids: [30001, 30078, 30120]
    },
    doubleChance: {
        dict: new Map([[30005, [["match"]]]]),
        name: "doubleChance",
        rusName: "Двойной шанс",
        stepsNum: 2,
        ids: [30005]
    },
    bothToScore: {
        dict: new Map([
            [30007, ["match"]],
            [30108, ["firstHalf"]],
            [30125, ["secondHalf"]]
        ]),
        name: "bothToScore",
        rusName: "Обе забьют",
        stepsNum: 2,
        ids: [30007, 30108, 30125]
    },
    correctScore: {
        dict: new Map([
            [31509, ["match"]],
            [12509, ["match"]],
            ["full_time_correct_score_reduced", ["match"]],
            [31669, ["firstHalf"]]
        ]),
        name: "correctScore",
        rusName: "Точный счет",
        stepsNum: 2,
        ids: [31509, 12509, "full_time_correct_score_reduced", 31669]
    },
    goalsOddEven: {
        dict: new Map([
            [30049, [["match"]]],
            [30106, [["firstHalf"]]]
            // [94, [["secondHalf"]]]
        ]),
        name: "goalsOddEven",
        rusName: "Чет/Нечет голов",
        stepsNum: 2,
        ids: [30049, 30106]
    },
    winningMargin: {
        dict: new Map([[30226, [["match"]]], [31076, [["match"]]]]),
        name: "winningMargin",
        rusName: "Победа с разницей",
        stepsNum: 3,
        ids: [30226, 31076]
    },
    timeMatch: {
        dict: new Map([[30062, [["match"]]]]),
        name: "timeMatch",
        rusName: "Тайм/Матч",
        stepsNum: 2,
        ids: [30062]
    },
    teamGoalScorer: {
        dict: new Map([
            [40, [["anytime"], ["match"]]],
            [38, [["first"], ["match"]]],
            [39, [["last"], ["match"]]],
            [14, [["anytime"], ["match"]]],
            [12, [["first"], ["match"]]],
            [13, [["last"], ["match"]]],
            ["score_anytime_grouped", [["anytime"], ["match"]]],
            ["match_goalscorer", [["first"], ["match"]]],
            ["last_match_goalscorer", [["last"], ["match"]]]
        ]),
        name: "teamGoalScorer",
        rusName: "Игрок забьет",
        stepsNum: 3,
        ids: [
            40,
            39,
            38,
            14,
            12,
            13,
            "score_anytime_grouped",
            "match_goalscorer",
            "last_match_goalscorer"
        ]
    }
};

export const SportSolutionDict = {
    totalGoals: {
        dict: new Map([
            //            ["asian_goals_over/under", [["over", "under"], ["both"], ["match"]]],
            ["team_goals_over/under", [["over", "under"], ["home"], ["match"]]],
            ["team_goals_over/under", [["over", "under"], ["away"], ["match"]]],

            ["total_goals_max_9_goals", [["exact"], ["both"], ["match"]]],
            ["team_total_goals_reduced", [["exact"], ["home"], ["match"]]],
            ["team_total_goals_reduced", [["exact"], ["away"], ["match"]]],

            [
                "1st_half_goals_over/under",
                [["over", "under"], ["both"], ["firstHalf"]]
            ],
            //            ["team_goals_half_over_under", [["over", "under"], ["home"], ["firstHalf"]]],
            //            ["team_goals_half_over_under", [["over", "under"], ["away"], ["firstHalf"]]],

            ["1st_half_goals", [["exact"], ["both"], ["firstHalf"]]]

            //            ["team_goals_half_over_under", [["over", "under"], ["home"], ["secondHalf"]]],
            //            ["team_goals_half_over_under", [["over", "under"], ["away"], ["secondHalf"]]],
        ]),
        stepsNum: 4,
        name: "totalGoals",
        rusName: "Тотал",
        ids: [
            "team_goals_over/under",
            "team_goals_over/under",
            "total_goals_max_9_goals",
            "team_total_goals_reduced",
            "team_total_goals_reduced",
            "1st_half_goals_over/under",
            "1st_half_goals"
        ]
    },
    // Требуется уставновка состояния опций
    totalCorners: {
        dict: new Map([
            ["corners_over/under", [["both"], ["match"]]],
            //["team_corners_over/under", [["home"], ["match"]]],
            //["team_corners_over/under", [["away"], ["match"]]],
            ["half_total_corners_over/under", [["both"], ["firstHalf"]]]
        ]),
        stepsNum: 4,
        name: "totalCorners",
        rusName: "Тотал угловых",
        ids: ["corners_over/under", "half_total_corners_over/under"]
    },
    totalCards: {
        stepsNum: 3,
        name: "totalCards",
        rusName: "Тотал карточек",
        ids: ["number_of_cards_over/under"]
    },
    // Требуется уставновка состояния опций
    oneXTwo: {
        dict: new Map([
            ["match_winner", [["match"]]],
            ["half_time_result", [["firstHalf"]]],
            ["second_half_result", [["secondHalf"]]]
        ]),
        name: "oneXTwo",
        rusName: "Исход",
        stepsNum: 2,
        ids: ["match_winner", "half_time_result", "second_half_result"]
    },
    doubleChance: {
        dict: new Map([["double_chance_grouped", [["match"]]]]),
        name: "doubleChance",
        rusName: "Двойной шанс",
        stepsNum: 2,
        ids: ["double_chance_grouped"]
    },
    // Требуется уставновка состояния опций
    bothToScore: {
        dict: new Map([
            ["both_teams_to_score", ["match"]],
            ["both_teams_to_score_in_half", ["firstHalf"]],
            ["both_teams_to_score_in_half", ["secondHalf"]]
        ]),
        name: "bothToScore",
        rusName: "Обе забьют",
        stepsNum: 2,
        ids: [
            "both_teams_to_score",
            "both_teams_to_score_in_half",
            "both_teams_to_score_in_half"
        ]
    },
    // Требуется уставновка состояния опций
    correctScore: {
        dict: new Map([
            ["full_time_correct_score_reduced", ["match"]],
            ["half_time_correct_score", ["firstHalf"]],
            ["half_time_correct_score_max_4_goals", ["firstHalf"]]
        ]),
        name: "correctScore",
        rusName: "Точный счет",
        stepsNum: 2,
        ids: [
            "full_time_correct_score_reduced",
            "half_time_correct_score",
            "half_time_correct_score_max_4_goals"
        ]
    },
    // Требуется уставновка состояния опций
    goalsOddEven: {
        dict: new Map([
            ["goals_odd/even", [["match"]]],
            ["halftime_total_goals_odd/even", [["firstHalf"]]]
        ]),
        name: "goalsOddEven",
        rusName: "Голы чет/нечет",
        stepsNum: 2,
        ids: ["goals_odd/even", "halftime_total_goals_odd/even"]
    },
    //    winningMargin: {
    //        name: "winningMargin",
    //        rusName: "Победа с разницей",
    //        stepsNum: 3,
    //        ids: ["winning_margin_5way"]
    //    },
    //    timeMatch: {
    //        name: "timeMatch",
    //        rusName: "Матч/тайм",
    //        stepsNum: 2,
    //        ids: ["double_result"]
    //    },
    anytimeGoalScorer: {
        dict: new Map([
            ["score_anytime_grouped", [["anytime"]]],
            ["last_match_goalscorer", [["last"]]]
        ]),
        name: "anytimeGoalScorer",
        rusName: "Игрок забьет",
        stepsNum: 3,
        ids: ["score_anytime_grouped", "last_match_goalscorer"]
    }
};

export const BetGeniusDict = {
    totalGoals: {
        dict: new Map([
            [259, [["over", "under"], ["both"], ["match"]]],
            [9498, [["over", "under"], ["home"], ["match"]]],
            [9497, [["over", "under"], ["away"], ["match"]]],

            [8726, [["exact"], ["both"], ["match"]]],
            [10869, [["exact"], ["home"], ["match"]]],
            [10870, [["exact"], ["away"], ["match"]]],

            [7076, [["over", "under"], ["both"], ["firstHalf"]]],
            //            [10850, [["over", "under"], ["home"], ["firstHalf"]]],
            //            [10849, [["over", "under"], ["away"], ["firstHalf"]]],

            [10146, [["exact"], ["both"], ["firstHalf"]]]
            //            [10589, [["exact"], ["home"], ["firstHalf"]]],
            //            [10592, [["exact"], ["away"], ["firstHalf"]]],
        ]),
        stepsNum: 4,
        name: "totalGoals",
        rusName: "Тотал",
        ids: [259, 9498, 9497, 8726, 10869, 10870, 7076, 10146]
    },
    // Требуется уставновка состояния опций
    totalCorners: {
        name: "totalCorners",
        rusName: "Тотал угловых",
        stepsNum: 4,
        ids: [7478]
    },
    // Требуется уставновка состояния опций
    oneXTwo: {
        dict: new Map([
            [2, [["match"]]],
            [6832, [["firstHalf"]]],
            [7591, [["secondHalf"]]]
        ]),
        name: "oneXTwo",
        rusName: "Исход",
        stepsNum: 2,
        ids: [2, 6832, 7591]
    },
    doubleChance: {
        dict: new Map([[7202, [["match"]]]]),
        name: "doubleChance",
        rusName: "Двойной шанс",
        stepsNum: 2,
        ids: [7202]
    },
    // Требуется уставновка состояния опций
    bothToScore: {
        dict: new Map([[7079, ["match"]], [10459, ["firstHalf"]]]),
        name: "bothToScore",
        rusName: "Обе забьют",
        stepsNum: 2,
        ids: [7079, 10459]
    },
    // Требуется уставновка состояния опций
    correctScore: {
        dict: new Map([
            [12509, ["match"]],
            //            [170, ["firstHalf"]],
            [12508, ["firstHalf"]]
        ]),
        name: "correctScore",
        rusName: "Точный счет",
        stepsNum: 2,
        ids: [12509, 12508]
    },
    // Требуется уставновка состояния опций
    goalsOddEven: {
        dict: new Map([[7354, [["match"]]], [9535, [["firstHalf"]]]]),
        name: "goalsOddEven",
        rusName: "Голы чет/нечет",
        stepsNum: 2,
        ids: [7354, 9535]
    },
    timeMatch: {
        dict: new Map([[3, [["match"]]]]),
        name: "timeMatch",
        rusName: "Матч/тайм",
        stepsNum: 2,
        ids: [3]
    },
    anytimeGoalScorer: {
        dict: new Map([
            [14, [["anytime"]]],
            [12, [["first"]]],
            [13, [["last"]]]
        ]),
        name: "anytimeGoalScorer",
        rusName: "Игрок забьет",
        stepsNum: 3,
        ids: [14, 12, 13]
    }
};
