import path from 'path';
import { fileURLToPath } from 'url';
import ejs from "ejs";
import moment from "moment";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const formateError = (error) => {
    let errors = {};
    error.errors?.map((issue) => {
        errors[issue.path[0]] = issue.message;
    });
    return errors;
};
export const renderEmailEjs = async (fileName, payload) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html = await ejs.renderFile(__dirname + `/views/emails/${fileName}.ejs`, payload);
    return html;
};
export const checkDateHourDiff = (date) => {
    const now = moment();
    const tokenSendAt = moment(date);
    const differnece = moment.duration(now.diff(tokenSendAt)).asHours();
    return differnece;
};
