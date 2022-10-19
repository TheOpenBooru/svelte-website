import type { Types } from "openbooru";


export function SplitPosts(posts: Types.Post[], parts: number) {
    const buckets = Array.from(Array(parts), () => new Array());
    
    function reduceInsertPost(bucketIndex: number, post: Types.Post): number {
        const currentBucket = buckets[bucketIndex];
        const nextBucketIndex = (bucketIndex + 1) % parts
        const nextBucket = buckets[nextBucketIndex]
        
        if (getColumnHeight(currentBucket) > getColumnHeight(nextBucket)) {
            return reduceInsertPost(nextBucketIndex, post);
        } else {
            currentBucket.push(post);
            return nextBucketIndex
        }
    }
    posts.reduce(reduceInsertPost, 0)
    return buckets;
}


function getColumnHeight(column: Types.Post[]) {
    return column.reduce((total,post) => {
        const height = Math.min((post.full.height / post.full.width), 2)
        return total + height + 15
    },0)
}

