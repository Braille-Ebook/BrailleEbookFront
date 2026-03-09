export const getAuthorAndTranslator = (author, translator) => {
    if (!author && !translator) {
        return '';
    }

    if (!author) {
        return `${translator} 번역`;
    }

    return translator ? `${author} 글, ${translator} 번역` : `${author} 글`;
};

export const normalizeBookData = book => {
    if (!book || typeof book !== 'object') {
        return {};
    }

    const nestedBook = [book.Book, book.book, book.bookInfo].find(
        candidate => candidate && typeof candidate === 'object'
    );
    const normalized = nestedBook ? { ...book, ...nestedBook } : { ...book };
    const bookId =
        normalized.book_id ??
        nestedBook?.book_id ??
        normalized.id ??
        nestedBook?.id ??
        null;

    return {
        ...normalized,
        book_id: bookId,
        image_url: normalized.image_url ?? normalized.imageUrl ?? null,
        publish_date: normalized.publish_date ?? normalized.publishDate ?? null,
        bookmark_num:
            normalized.bookmark_num ?? normalized.bookmarkNum ?? 0,
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
