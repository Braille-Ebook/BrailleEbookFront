export * from './arduinoBLEConnection';

export const getAuthorAndTranslator = (author, translator) => {
    if (!author && !translator) {
        return '';
    }

    if (!author) {
        return `${translator} 번역`;
    }

    return translator ? `${author} 글, ${translator} 번역` : `${author} 글`;
};

const getMergedBookData = (book) => {
    if (!book || typeof book !== 'object') {
        return {};
    }

    const nestedBook = [book.Book, book.book, book.bookInfo].find(
        (candidate) => candidate && typeof candidate === 'object'
    );

    return nestedBook ? { ...book, ...nestedBook } : { ...book };
};

const getBooleanFlag = (value) => {
    if (typeof value === 'boolean') {
        return value;
    }

    if (typeof value === 'number') {
        return value === 1;
    }

    if (typeof value === 'string') {
        const normalizedValue = value.trim().toLowerCase();

        if (['true', '1', 'y', 'yes'].includes(normalizedValue)) {
            return true;
        }

        if (['false', '0', 'n', 'no', ''].includes(normalizedValue)) {
            return false;
        }
    }

    return false;
};

export const getBookBookmarkCount = (book) => {
    const mergedBook = getMergedBookData(book);

    return Number(mergedBook.bookmark_num ?? mergedBook.bookmarkNum ?? 0) || 0;
};

export const getIsBookmarked = (book) => {
    const mergedBook = getMergedBookData(book);
    const rawBookmarkFlag =
        mergedBook.isBookmarked ??
        mergedBook.is_bookmarked ??
        mergedBook.bookmarked ??
        mergedBook.is_bookmark;

    return rawBookmarkFlag == null ? false : getBooleanFlag(rawBookmarkFlag);
};

export const normalizeBookData = (book) => {
    if (!book || typeof book !== 'object') {
        return {};
    }

    const normalized = getMergedBookData(book);
    const bookId = normalized.book_id ?? normalized.id ?? null;

    return {
        ...normalized,
        book_id: bookId,
        image_url: normalized.image_url ?? normalized.imageUrl ?? null,
        publish_date: normalized.publish_date ?? normalized.publishDate ?? null,
        bookmark_num: getBookBookmarkCount(normalized),
        isBookmarked: getIsBookmarked(normalized),
    };
};

export const getDateString = (stringDate) => {
    if (!stringDate) {
        return '-';
    }

    const date = new Date(stringDate);
    if (Number.isNaN(date.getTime())) {
        return '-';
    }

    return `${date.getUTCFullYear()}.${
        date.getUTCMonth() + 1
    }.${date.getUTCDate()}`;
};
export const getTimeAgo = (date) => {
    if (!date) {
        return '-';
    }

    const targetDate = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(targetDate.getTime())) {
        return '-';
    }

    const currentTime = new Date();
    const agoSec = (currentTime - targetDate) / 1000;

    const year = String(targetDate.getFullYear());
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const hours = String(targetDate.getHours()).padStart(2, '0');
    const minutes = String(targetDate.getMinutes()).padStart(2, '0');

    if (agoSec < 60) {
        return `${Math.max(Math.floor(agoSec), 0)}초 전`;
    } else if (agoSec < 3600) {
        return `${Math.floor(agoSec / 60)}분 전`;
    } else if (agoSec < 86400) {
        return `${hours}:${minutes}`;
    } else if (targetDate.getFullYear() === currentTime.getFullYear()) {
        return `${month}/${day} ${hours}:${minutes}`;
    } else {
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
};
