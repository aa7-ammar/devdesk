const buckets = new Map<string , {count : number , last: number}>();

export function rateLimit(ip: string , limit = 20 , windowMs = 60_000){
    const now = Date.now();
    const bucket = buckets.get(ip) || {count : 0 , last : now};
    
    if(now - bucket.last > windowMs){
        bucket.count = 1;
        bucket.last = now;

    }else{
        bucket.count++;
    }

    buckets.set(ip , bucket);

    return bucket.count > limit;
}
