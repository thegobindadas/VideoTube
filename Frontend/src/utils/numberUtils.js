
export function formatViewsCount(views) {
    if (views < 1000) {
        return `${views} views`;
    } else if (views < 1_000_000) {
        return `${(views / 1000).toFixed(1)}K views`;
    } else if (views < 1_000_000_000) {
        return `${(views / 1_000_000).toFixed(1)}M views`;
    } else {
        return `${(views / 1_000_000_000).toFixed(1)}B views`;
    }
}
  

export function formatSubscriberCount(subscribers) {
    if (subscribers < 1000) {
        return `${subscribers} subscribers`;
    } else if (subscribers < 1_000_000) {
        return `${(subscribers / 1000).toFixed(1)}K`;
    } else if (subscribers < 1_000_000_000) {
        return `${(subscribers / 1_000_000).toFixed(1)}M`;
    } else {
        return `${(subscribers / 1_000_000_000).toFixed(1)}B`;
    }
}
  

export function formatLikeCount(likes) {
    if (likes < 1000) {
        return `${likes} likes`;
    } else if (likes < 1_000_000) {
        return `${(likes / 1000).toFixed(1)}K likes`;
    } else if (likes < 1_000_000_000) {
        return `${(likes / 1_000_000).toFixed(1)}M likes`;
    } else {
        return `${(likes / 1_000_000_000).toFixed(1)}B likes`;
    }
}
  