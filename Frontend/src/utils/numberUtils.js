function formatCount(count, type) {
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

export function formatViewsCount(views) {
    return formatCount(views, 'views');
}

export function formatSubscriberCount(subscribers) {
    return formatCount(subscribers, 'subscribers');
}

export function formatSubscribedToCount(SubscribedTo) {
    return formatCount(SubscribedTo, 'Subscribed');
}

export function formatLikeCount(likes) {
    return formatCount(likes, 'likes');
}

export function formatCommentsCount(Comments) {
    return formatCount(Comments, 'Comments');
}