'use client';

import React, { useEffect, useRef, useMemo } from 'react'

/**
 * Custom hook to embed TradingView widgets.
 * @param scriptUrl - The TradingView widget script URL
 * @param config - Widget configuration object
 * @param height - Widget height in pixels
 */
const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height: number) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    // Memoize the stringified config to prevent unnecessary re-renders
    const configString = useMemo(() => JSON.stringify(config), [config]);

    useEffect(
        () => {
            if(!containerRef.current) return;
            if(containerRef.current.dataset.loaded) return;
            containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height:${height}px;"></div>`

            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.textContent = configString;

            containerRef.current.appendChild(script);
            containerRef.current.dataset.loaded = 'true';

            return () => {
                if(containerRef.current){
                    containerRef.current.innerHTML = '';
                    delete containerRef.current.dataset.loaded;
                }
            }
        },
        [scriptUrl, configString, height]
    );

    return containerRef;
}

export default useTradingViewWidget