class RoutsName {
    dict: any;
    constructor() {
        this.dict = {
            allevent: "allevents",
            mobile: "mobile",
            promo: "promo",
            kabinet: "myaccount",
            loyalijnostij: "loyalty",
            prematch: "prematch",
            moj_schet: "account",
            moj_akkaunt: "profile",
            moi_stavki: "mybets",
            informacziya: "info",
            recoverPassword: "recoverPassword",
            popolnenie: "deposit",
            vyvod: "withdrawal",
            streaminfo: "streaminfo",
            betbuilder: "betbuilder",
            balans: "balance",
            istoriya: "history",
            rospis: "line",
            live: "In-Play",
            categories: "categories",
            company: "company",
            login: "login",
            cookies: "cookies_policy",
            data: "secure_data",
            documents: "documents",
            moneyAction: "moneyaction",
            offerings: "offerings",
            offer: "offer",
            partnership: "partnership",
            responsible: "responsible_gaming",
            rules: "terms_and_conditions",
            contacts: "contacts",
            faq: "faq",
            moi_matchi: "mymatches",
            signin: "signin",
            dolgosrochnye: "outrights",
            translyacziya: "streaming",
            registration: "registration",
            all: "all",
            longTerm: "longTerm",
            cashout: "cashout"
        };
    }
    getRoutsUrl(...url: Array<string>) {
        let nameUrl: string = url.map(name => "/" + name).join("");
        if (nameUrl.includes("//")) debugger;
        return nameUrl;
    }
}

export const routsName = new RoutsName();
