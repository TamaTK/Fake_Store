export async function fetchHelper(url, options = {}) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
    } catch (err) {
        console.error(`[fetchHelper] Error fetching ${url}:`, err);
        throw err; 
    }
}
