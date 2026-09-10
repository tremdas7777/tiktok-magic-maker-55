// TikTok Pixel config without persisted overrides (avoids cross-account bleed)
(function(){
    function normalizeId(id){
        return String(id || '').trim();
    }

    function normalizeIds(input){
        if (Array.isArray(input)) {
            return Array.from(new Set(input.map(normalizeId).filter(Boolean)));
        }

        var raw = normalizeId(input);
        if (raw === '') {
            return [];
        }

        if (raw.indexOf(',') !== -1) {
            return Array.from(new Set(raw.split(',').map(normalizeId).filter(Boolean)));
        }

        return [raw];
    }

    function applyId(id){
        const ids = normalizeIds(id);
        if (ids.length === 0) {
            return [];
        }
        window.TIKTOK_PIXEL_ID = ids[0];
        window.TIKTOK_PIXEL_IDS = ids;
        return ids;
    }

    function reloadTikTok(id){
        const ids = applyId(id);
        if (ids.length === 0) {
            return;
        }

        try {
            if (window.ttq && typeof window.ttq.load === 'function') {
                ids.forEach(function(pixelId){ window.ttq.load(pixelId); });
                if (typeof window.ttq.page === 'function') {
                    window.ttq.page();
                }
                return;
            }

            ids.forEach(function(pixelId){
                const scriptUrl = 'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=' + encodeURIComponent(pixelId) + '&lib=ttq';
                const script = document.createElement('script');
                script.async = true;
                script.src = scriptUrl;
                document.head.appendChild(script);
            });
        } catch (e) {
            console.error('Erro ao recarregar TikTok pixel', e);
        }
    }

    // Clear stale IDs from older versions that used localStorage.
    try { localStorage.removeItem('TIKTOK_PIXEL_ID'); } catch (e) {}

    applyId(window.TIKTOK_PIXEL_IDS || window.TIKTOK_PIXEL_ID);
    window.setTikTokPixelId = function(id){ reloadTikTok(id); };
})();
