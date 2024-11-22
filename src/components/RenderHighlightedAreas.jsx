import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';

const RenderHighlightAreas = ({ areas, fileUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { jumpToPage } = pageNavigationPluginInstance;

    React.useEffect(() => {
        console.log("areas",areas[0].pageIndex)
        if (areas && areas[0].pageIndex !== undefined) {
            console.log("page changed")
            
                jumpToPage(areas[0].pageIndex);

        }
    }, [areas, jumpToPage]);

    const renderHighlights = (props) => (
        <div>
            {areas
                ?.filter((area) => area.pageIndex === props.pageIndex)
                .map((area, idx) => (
                    <div
                        key={idx}
                        className="highlight-area"
                        style={Object.assign(
                            {},
                            {
                                background: 'yellow',
                                opacity: 0.3,
                            },
                            props.getCssProperties(area, props.rotation)
                        )}
                    />
                ))}
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlights,
        trigger: Trigger.None,
    });

    return (
        <Viewer
            fileUrl={fileUrl}
            plugins={[highlightPluginInstance,pageNavigationPluginInstance]}
        />
    );
};

export default RenderHighlightAreas;
