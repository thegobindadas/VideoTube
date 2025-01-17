function formatCountWithLabel(count, type) {
    if (count < 1000) {
        return `${count} ${type}`;
    } else if (count < 1_000_000) {
        return `${(count / 1000).toFixed(1)}K ${type}`;
    } else if (count < 1_000_000_000) {
        return `${(count / 1_000_000).toFixed(1)}M ${type}`;
    } else {
        return `${(count / 1_000_000_000).toFixed(1)}B ${type}`;
    }
}

export function formatNumberCount(count) {
    if (count < 1000) {
        return `${count}`;
    } else if (count < 1_000_000) {
        return `${(count / 1000).toFixed(1)}K`;
    } else if (count < 1_000_000_000) {
        return `${(count / 1_000_000).toFixed(1)}M`;
    } else {
        return `${(count / 1_000_000_000).toFixed(1)}B`;
    }
}


export function formatViewsCount(views) {
    return formatCountWithLabel(views, 'Views');
}

export function formatSubscriberCount(subscribers) {
    return formatCountWithLabel(subscribers, 'Subscribers');
}

export function formatSubscribedToCount(SubscribedTo) {
    return formatCountWithLabel(SubscribedTo, 'Subscribed');
}

export function formatLikeCount(likes) {
    return formatCountWithLabel(likes, 'Likes');
}

export function formatDislikeCount(dislikes) {
    return formatCountWithLabel(dislikes, 'Dislikes');
}

export function formatCommentsCount(Comments) {
    return formatCountWithLabel(Comments, 'Comments');
}
