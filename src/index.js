/**
 * Example showcasing LightningChart interactions with external images and icons in context of office layout data visualization.
 */

const lcjs = require('@lightningchart/lcjs')
const {
    lightningChart,
    AxisTickStrategies,
    ColorRGBA,
    ImageFill,
    PalettedFill,
    emptyLine,
    LUT,
    AutoCursorModes,
    UIElementBuilders,
    UIOrigins,
    LegendBoxBuilders,
    Themes,
    isHitHeatmap,
} = lcjs

const chartPadding = 10
const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .ChartXY({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('Office layout data visualization layer')
    .setCursor((autoCursor) => autoCursor.setTickMarkerXVisible(false).setTickMarkerYVisible(false))
    .setSeriesBackgroundStrokeStyle(emptyLine)
    .setCursorFormatting((_, hit) => {
        if (!isHitHeatmap(hit)) return
        const wifiStrength = hit.intensity === 3 ? 'Good' : hit.intensity === 2 ? 'Medium' : hit.intensity === 1 ? 'Weak' : 'No reception'
        return [{ component: hit.series, rowFillStyle: chart.getTheme().cursorResultTableHeaderBackgroundFillStyle }, wifiStrength]
    })
    .setUserInteractions(undefined)

chart.forEachAxis((axis) => axis.setTickStrategy(AxisTickStrategies.Empty).setStrokeStyle(emptyLine))

const legend = chart.addLegendBox(LegendBoxBuilders.VerticalLegendBox).setAutoDispose({
    type: 'max-width',
    maxHeight: 0.3,
})

const officeLayoutImage = new Image()
officeLayoutImage.crossOrigin = ''
officeLayoutImage.src = new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'examples/assets/0025/office.png'
officeLayoutImage.onload = () => {
    chart.setSeriesBackgroundFillStyle(
        new ImageFill({
            source: officeLayoutImage,
        }),
    )

    // Maintain static aspect ratio of chart area (enclosed area between axes).
    const targetAspectRatio = officeLayoutImage.height / officeLayoutImage.width
    const updateChartAspectRatio = () => {
        const chartBounds = chart.engine.container.getBoundingClientRect()
        const chartSizePx = {
            x: Math.ceil(chartBounds.width - 2 * chartPadding),
            y: Math.ceil(chartBounds.height - 2 * chartPadding),
        }
        const curAspectRatio = chartSizePx.y / chartSizePx.x
        if (curAspectRatio < targetAspectRatio) {
            // Add horizontal chart padding to maintain Map picture aspect ratio.
            const targetAxisWidth = chartSizePx.y / targetAspectRatio
            const horizontalPadding = Math.max(chartSizePx.x - targetAxisWidth, 0)
            chart.setPadding({ left: horizontalPadding / 2, right: horizontalPadding / 2, top: chartPadding, bottom: chartPadding })
        } else if (curAspectRatio > targetAspectRatio) {
            // Add vertical chart padding to maintain Map picture aspect ratio.
            const targetAxisHeight = chartSizePx.x * targetAspectRatio
            const verticalPadding = Math.max(chartSizePx.y - targetAxisHeight, 0)
            chart.setPadding({ top: verticalPadding / 2, bottom: verticalPadding / 2, left: chartPadding, right: chartPadding })
        }
    }
    updateChartAspectRatio()
    window.addEventListener('resize', updateChartAspectRatio)

    // Load heat map data visualization layer data set.
    fetch(
        new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'examples/assets/0025/office-wifi-strength.json',
    )
        .then((r) => r.json())
        .then((data) => {
            const wifiStrengthMatrix = data.data
            const heatmap = chart
                .addHeatmapGridSeries({
                    columns: wifiStrengthMatrix.length,
                    rows: wifiStrengthMatrix[0].length,
                })
                .setName('Wi-Fi Strength')
                .invalidateIntensityValues(wifiStrengthMatrix)
                .setWireframeStyle(emptyLine)
                .setFillStyle(
                    new PalettedFill({
                        lookUpProperty: 'value',
                        lut: new LUT({
                            interpolate: false,
                            steps: [
                                // Value 0 = no measurement.
                                { value: 0, color: ColorRGBA(0, 0, 0, 0), label: '' },
                                // Value 1 = weak wifi strength.
                                { value: 0.9, color: ColorRGBA(255, 0, 0, 50), label: 'Weak' },
                                // Value 2 = medium wifi strength.
                                { value: 1.9, color: ColorRGBA(255, 255, 0, 50), label: 'Medium' },
                                // Value 3 = good wifi strength.
                                { value: 2.9, color: ColorRGBA(0, 255, 0, 50), label: 'Good' },
                            ],
                        }),
                    }),
                )
                .setEffect(false)

            legend.add(heatmap)
        })

    // Load router icon.
    const routerImage = new Image()
    routerImage.crossOrigin = ''
    routerImage.src = new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'examples/assets/0025/router.png'
    routerImage.onload = () => {
        const iconAspectRatio = routerImage.height / routerImage.width
        const iconWidthPx = 48
        // Display router icon inside chart at preset X and Y axis coordinates (range 0-1)
        const routerIcon = chart
            .addUIElement(UIElementBuilders.TextBox, { x: chart.getDefaultAxisX(), y: chart.getDefaultAxisY() })
            .setText('')
            .setPadding({ left: iconWidthPx, top: iconWidthPx * iconAspectRatio })
            .setBackground((background) =>
                background.setStrokeStyle(emptyLine).setFillStyle(
                    new ImageFill({
                        source: routerImage,
                    }),
                ),
            )
            .setPosition({ x: 290, y: 120 })
            .setOrigin(UIOrigins.Center)
    }
}
