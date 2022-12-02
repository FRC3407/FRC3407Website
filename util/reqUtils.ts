import { ReqCachingOptions } from "../typings"

const defaultReqUrl = "http://localhost:3000"

// `${url}#${JSON.stringify(init || {})}`
type TCachedName = string

interface ICachedResult {
    value: Response
    valTime: string | "-1" | "+1"
}
let reqCache: Map<TCachedName, ICachedResult> = new Map<TCachedName, ICachedResult>()

const proFetch = async (url: string, init?: RequestInit, cacheOptions?: ReqCachingOptions) => {
    let thisReq = ""

    const {
        cacheResults,
        validTime
    } = { ...{ cacheResults: true, validTime: 86400000}, ...(cacheOptions ?? {})}

    if (!url.startsWith("http") && url.match(/[a-z0-9]*\.[a-z/]{1,}/gi) === null) thisReq = `${defaultReqUrl}${url.startsWith("/") ? "" : "/"}${url}`
    else if (url.startsWith("http") && url.match(/[a-z0-9]*\.[a-z/]{1,}/gi)?.length) thisReq = `http://${(url.match(/[a-z0-9]*\.[a-z/]{1,}/gi) as string[])[0]}`
    else throw new SyntaxError(`URL ${url} is not a valid request URL`)

    if (cacheResults && validTime > 0 && String(validTime).toLowerCase() !== "none") {
        const cachedName = `${url}#${JSON.stringify(init || {})}`
        const gotCached = reqCache.get(cachedName)
        if (typeof gotCached !== "undefined" && (gotCached.valTime === "-1" || new Date((reqCache.get(cachedName) as ICachedResult).valTime).getTime() < new Date().getTime())) return (reqCache.get(cachedName) as ICachedResult).value
        
        const res = await fetch(thisReq, init)

        const valTime = (typeof validTime === "number") ? new Date(new Date().getTime() + validTime).toISOString() : (validTime === "forever") ? "+1" : "-1"
        reqCache.set(cachedName, {
            value: res,
            valTime
        })

        return res
    }

    return await fetch(thisReq, init)
}

export { proFetch }