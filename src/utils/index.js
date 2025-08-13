export const getAuthorAndTranslator = (author, translator) => {
    return translator ? `${author} 글, ${translator} 번역` : `${author} 글`;
};
export const getDateString = (date) => {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};
export const getTimeAgo = (date) => {
    const currentTime = new Date();
    const agoSec = (currentTime - date) / 1000;

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (agoSec < 60) {
        return `${agoSec}초 전`;
    } else if (agoSec < 3600) {
        return `${Math.floor(agoSec / 60)}분 전`;
    } else if (agoSec < 86400) {
        return `${hours}:${minutes}`;
    } else if (date.getFullYear() === currentTime.getFullYear()) {
        return `${month}/${day} ${hours}:${minutes}`;
    } else {
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
};
