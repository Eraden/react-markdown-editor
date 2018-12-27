const isFunction = o => Reflect.apply(({}).toString, o, []) === "[object Function]";

export default (actionType) => actionsMap[actionType] || nullToken;

export const tokenProcessor = (token, tailing) =>
    isFunction(token) ?
        text => token(text) :
        text => `${token}${text}${tailing}`;

export const nullToken = tokenProcessor("", "");
export const headerToken = tokenProcessor("\n## ", "\n");
export const subheaderToken = tokenProcessor("\n### ", "\n");
export const linkToken = tokenProcessor(text => `[${text}](${text})`);
export const listToken = tokenProcessor(text =>
    text.split("\n").reduce((memo, line) => `${memo}+${line}\n`, "") + "\n"
);
export const imageToken = tokenProcessor(text => `![${text}](${text})`);
export const boldToken = tokenProcessor("**", "**");
export const italicToken = tokenProcessor("__", "__");

const actionsMap = ({
    bold:      boldToken,
    italic:    italicToken,
    header:    headerToken,
    subheader: subheaderToken,
    link:      linkToken,
    list:      listToken,
    image:     imageToken,
});
