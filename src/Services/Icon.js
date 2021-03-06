import React from "react";

export default ({
    name = "",
    style = {},
    fill = "#000",
    viewBox = "",
    width = "100%",
    className = "",
    height = "100%"
}) => (
    <svg
        width={width}
        style={style}
        height={height}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        viewBox={viewBox || getViewBox(name)}
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        {getPath(name)}
    </svg>
);

const getViewBox = () => {
    switch (name) {
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        case "americanFootball":
            return "0 0 34 24";
        default:
            return "0 0 32 32";
    }
};

const getPath = name => {
    switch (name) {
        case "americanFootball":
            return (
                <path d="M29.134 4.95859C29.0796 4.01013 28.8618 3.07825 28.4902 2.20389C28.2198 1.56946 27.7179 1.06186 27.0865 0.784335C26.2805 0.430972 25.4239 0.206576 24.5482 0.119418C21.6142 -0.208707 18.6443 0.141543 15.8672 1.14319C13.8686 1.82892 12.0263 2.90522 10.4476 4.30948C9.20517 5.4206 8.16428 6.73819 7.37094 8.20404C5.64621 11.3564 4.83481 14.9274 5.02793 18.5156C5.0593 19.4919 5.23715 20.4578 5.55564 21.3811C5.84458 22.3082 6.5549 23.0439 7.47129 23.3654C8.22678 23.6335 9.01157 23.8107 9.80905 23.8931C12.4388 24.1718 15.0978 23.9041 17.6192 23.1068C20.1496 22.3694 22.459 21.019 24.3424 19.1753C25.0953 18.4333 25.7594 17.6063 26.3213 16.7108C28.513 13.204 29.5006 9.07773 29.134 4.95859ZM8.07187 22.1276C8.01084 22.1053 7.9498 22.083 7.88816 22.0619C7.37192 21.9004 6.97385 21.4864 6.83274 20.9643C6.54538 20.0658 6.38547 19.1314 6.35776 18.1884C6.31711 17.2281 6.35776 16.266 6.4791 15.3124V15.1646L13.7088 22.5527C11.9496 22.7718 10.1651 22.6699 8.44223 22.2519C8.31565 22.2167 8.1937 22.1722 8.07187 22.1276ZM24.5112 16.9008C25.8326 15.1337 26.779 13.1153 27.2923 10.9693C27.3462 10.8573 27.3181 10.723 27.2237 10.6421L18.6324 1.85562C18.5578 1.76325 18.4345 1.72562 18.3211 1.76062C17.1695 2.02552 16.0471 2.40378 14.9701 2.88993C12.6633 3.91312 10.6864 5.5575 9.26023 7.63938C7.9603 9.57773 7.07627 11.7645 6.66391 14.0617C6.64536 14.1668 6.68845 14.2733 6.77463 14.3361L10.6428 18.3362L14.5216 22.2941C14.5968 22.3857 14.7175 22.4266 14.8329 22.3996C16.5243 22.1093 18.1649 21.5761 19.7037 20.8165C21.5879 19.9011 23.2336 18.5607 24.5112 16.9008ZM27.5456 9.79776C27.5456 9.82413 27.5456 9.85581 27.514 9.90329L19.3766 1.57593C20.0678 1.50205 20.7064 1.41761 21.3502 1.3754C22.7643 1.24982 24.1892 1.34955 25.572 1.6709C25.9074 1.76322 26.237 1.87601 26.5588 2.00864C26.905 2.14325 27.1788 2.41706 27.3134 2.76328C27.6141 3.52921 27.7922 4.33774 27.8412 5.15912C27.9576 6.71109 27.8617 8.2717 27.5561 9.79776H27.5456ZM17.9834 5.26993L19.4293 3.86621V3.8873C19.5327 3.78678 19.6981 3.78913 19.7987 3.89258C19.8993 3.99607 19.8968 4.16144 19.7934 4.262L18.3474 5.66571L19.2287 6.5734C19.3293 6.67685 19.3269 6.84226 19.2235 6.94278C19.12 7.04334 18.9546 7.04099 18.8541 6.9375L17.9728 6.02985L16.2629 7.69742L17.1443 8.60511C17.2093 8.67203 17.2337 8.76859 17.2082 8.85837C17.1908 8.92008 17.1516 8.97217 17.0995 9.00611C17.0757 9.02158 17.0492 9.0333 17.0208 9.04044C16.9304 9.0633 16.8346 9.03617 16.7695 8.96924L15.8883 8.06156L14.1784 9.72913L15.0598 10.6368C15.1603 10.7403 15.1579 10.9057 15.0545 11.0062C14.951 11.1068 14.7856 11.1044 14.685 11.0009L13.8038 10.0933L12.094 11.7608L12.9753 12.6685C13.0758 12.772 13.0735 12.9374 12.9699 13.0379C12.8665 13.1385 12.7011 13.1361 12.6006 13.0327L11.7193 12.125L10.3841 13.4232C10.2807 13.5237 10.1153 13.5213 10.0147 13.4179C9.91428 13.3144 9.9166 13.149 10.0201 13.0485L11.3552 11.7503L10.4792 10.8479C10.4142 10.781 10.3897 10.6844 10.4151 10.5946C10.4282 10.5484 10.4535 10.5076 10.4873 10.4758C10.5191 10.4457 10.5586 10.4237 10.6025 10.4126C10.693 10.3897 10.7888 10.4168 10.8539 10.4838L11.7298 11.3862L13.4397 9.71857L12.5637 8.8162C12.4631 8.71271 12.4654 8.54734 12.5689 8.44678C12.6725 8.34622 12.8377 8.34861 12.9383 8.45206L13.8143 9.35446L15.5241 7.68686L14.6482 6.78449C14.5831 6.71756 14.5587 6.621 14.5841 6.53119C14.6096 6.44141 14.681 6.37201 14.7715 6.34915C14.8619 6.32627 14.9577 6.35343 15.0228 6.42035L15.8988 7.30164L17.6086 5.63407L16.7326 4.73166C16.6321 4.62821 16.6345 4.4628 16.7379 4.36225C16.7729 4.32816 16.8152 4.30591 16.8595 4.29541C16.946 4.27494 17.0409 4.29914 17.1073 4.36753L17.9834 5.26993Z" />
            );
        default:
            return <path />;
    }
};
