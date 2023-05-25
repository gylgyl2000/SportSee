import useDimensions from '../../hooks/useDimensions'
import useD3 from '../../hooks/useD3'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../style/colors'

/**
 * Renders a bar chart for the activity data.
 * @function Activity
 * @param {Object} data - The data for the activity.
 * @param {Array} data.activity - The array of daily activity data.
 * @param {Array} data.activity.day - The day for the activity.
 * @param {number} data.activity.kilogram - The amount of weight (in kg) for the activity.
 * @param {number} data.activity.calories - The amount of calories burned for the activity.
 * @param {Array} data.averageSessions - The array of session averages.
 * @param {Object} data.performance - The performance data.
 * @param {Object} data.mainData - The main data.
 * @returns {JSX.Element} - The rendered component.
 */

const D3BarplotGrouped = ({ Data }) => {
    const [parentReference, parentDimensions] = useDimensions()

    const { chartReference } = useD3(
        svg => {
            const { width, height } = parentDimensions
            const sizeRatio = percent => Math.round((percent / 100) * Math.min(width, height))
            const xAxisSize = { w: width, h: sizeRatio(15) }
            const yAxisSize = { w: sizeRatio(25), h: height }
            const chartSize = { w: width - yAxisSize.w, h: height - xAxisSize.h }
            const barWidth = sizeRatio(5)
            const barGap = sizeRatio(5)

            const xScale = d3
                .scaleBand()
                .domain(Data.map(d => d.day))
                .range([0, chartSize.w])

            const yScaleKg = d3
                .scaleLinear()
                .domain([
                    Math.floor(d3.min(Data, d => d.kilogram) / 5) * 5 - 5,
                    Math.ceil(d3.max(Data, d => d.kilogram) / 5) * 5
                ])
                .range([chartSize.h, 0])

            const yScaleCal = d3
                .scaleLinear()
                .domain([0, d3.max(Data, d => d.calories)])
                .range([chartSize.h, 0])

            const xAxis = d3
                .axisBottom(xScale)
                .tickFormat((_, index) => index + 1)
                .tickSize(0)
                .tickPadding(sizeRatio(10))

            const yAxisKg = d3
                .axisRight(yScaleKg)
                .ticks(3)
                .tickFormat(d => d)
                .tickSize(0)
                .tickPadding(sizeRatio(15))

            // Set up the chart elements
            const chart = svg
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', `0 0 ${width} ${height}`)
            const xAxisGroup = chart
                .append('g')
                .attr('transform', `translate(0, ${chartSize.h})`)
            const yAxisGroup = chart
                .append('g')
                .attr('transform', `translate(${chartSize.w}, 0)`)
            const gridLinesGroup = chart
                .append('g')
                .attr('transform', `translate(${yAxisSize.w}, 0)`)
            const chartGroup = chart
                .append('g')
            const cursorsGroup = chart
                .append('g')
            const tooltipsGroup = chart
                .append('g')

            // Create x-axis
            xAxisGroup
                .call(xAxis)
                .select('.domain')
                .attr('stroke', 'var(--line)')
                .attr('stroke-width', 2)
            xAxisGroup
                .selectAll('text')
                .attr('fill', 'var(--text)')
                .style('font-size', sizeRatio(7))
                .style('font-weight', 700)

            // Create y-axis
            yAxisGroup
                .call(yAxisKg)
                .select('.domain')
                .remove()
            yAxisGroup
                .selectAll('text')
                .attr('fill', 'var(--text)')
                .style('font-size', sizeRatio(7))
                .style('font-weight', 700)

            // Create grid lines
            gridLinesGroup
                .selectAll('line')
                .data(yScaleKg.ticks(3).slice(1))
                .join('line')
                .attr('x1', -yAxisSize.w)
                .attr('x2', chartSize.w - yAxisSize.w)
                .attr('y1', d => yScaleKg(d))
                .attr('y2', d => yScaleKg(d))
                .attr('stroke', 'var(--line)')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '3')

            const dayGroup = chartGroup
                .selectAll('g')
                .data(Data)
                .join('g')
                .attr('transform', d => `translate(${xScale(d.day) + xScale.bandwidth() / 2 - barWidth - barGap / 2}, 0)`)

            const barPathGenerator = ({ x, y, h }) => {
                const r = barWidth / 2
                const w = barWidth
                return `M${x} ${y} a${r} ${r} 0 0 1 ${r} -${r} h${w - 2 * r} a${r} ${r} 0 0 1 ${r} ${r} v${h} h-${w} Z`
            }

            // Create bars for weight
            dayGroup
                .append('path')
                .attr('fill', 'var(--poids)')
                .attr('d', barPathGenerator({ x: 0, y: chartSize.h, h: 0 }))
                .transition()
                .duration(3000)
                .attr('d', d =>
                    barPathGenerator({
                        x: 0,
                        y: yScaleKg(d.kilogram) + barWidth / 2,
                        h: chartSize.h - yScaleKg(d.kilogram) - barWidth / 2
                    })
                )

            // Create bars for calories
            dayGroup
                .append('path')
                .attr('fill', 'var(--calories)')
                .attr('d', barPathGenerator({ x: barWidth + barGap, y: chartSize.h, h: 0 }))
                .transition()
                .duration(6000)
                .attr('d', d =>
                    barPathGenerator({
                        x: barWidth + barGap,
                        y: yScaleCal(d.calories) + barWidth / 2,
                        h: chartSize.h - yScaleCal(d.calories) - barWidth / 2
                    })
                )

            const cursorRects = cursorsGroup
                .selectAll('rect')
                .data(Data)
                .join('rect')
                .attr('x', d => xScale(d.day))
                .attr('width', xScale.bandwidth())
                .attr('height', chartSize.h)
                .attr('fill', 'var(--cursor)')
                .attr('opacity', 0)

            const tooltips = tooltipsGroup
                .selectAll('foreignObject')
                .data(Data)
                .enter()
                .append('foreignObject')
                .attr('style', 'display: inline-block; width: 1px; height: 1px; overflow: visible;')
                .attr('x', d => xScale(d.day) + xScale.bandwidth() / 1.3)
                .attr('y', -sizeRatio(10))
                .append('xhtml:div')
                .attr('style', 'display: inline-flex; flex-direction: column; width: max-content; color: #FFFFFF; border-radius: 0.25rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);')
                .html(
                    d => `
                        <span style="background-color: ${colors.neutral700}; text-align: center; padding: 0.5rem 0.5rem;">${d.kilogram} Kg</span>
                        <span style="background-color: ${colors.backgroundGraphRed}; text-align: center; padding: 0.5rem 0.5rem;">${d.calories} kCal</span>
                    `
                )
                .style('font-size', `${sizeRatio(5)}px`)
                .style('opacity', 0)

            chart.on('mousemove', event => {
                const [x] = d3.pointer(event)
                const index = Math.floor(x / xScale.bandwidth())

                cursorRects.attr('opacity', (_, index_) => (index_ === index ? 1 : 0))
                tooltips.style('opacity', (_, index_) => (index_ === index ? 1 : 0))
            })

            chart.on('mouseleave', () => {
                cursorRects.attr('opacity', 0)
                tooltips.style('opacity', 0)
            })
        },
        [parentDimensions, Data]
    )

    return (
        <ActivityArticle id='ActivityArticle'>
            <Header>
                <Title>Activité quotidienne</Title>
                <Legend>
                    <LegendItem inputColor={colors.neutral700}>Poids (kg)</LegendItem>
                    <LegendItem inputColor={colors.backgroundGraphRed}>Calories brûlées (kCal)</LegendItem>
                </Legend>
            </Header>
            <Wrapper ref={parentReference}>
                <SvgContainer ref={chartReference} />
            </Wrapper>
        </ActivityArticle>
    )
}

const ActivityArticle = styled.article`
    grid-area: act;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    // height: 19rem;
    height: 30vh;
    background-color: ${colors.neutral100} ;
    border-radius: 0.25rem;
`
const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Title = styled.h2`
    font-size: 0.875rem;
    font-weight: 500;
`
const Legend = styled.div`
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
`
const LegendItem = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:before {
        content: '';
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background-color: ${props => props.inputColor};
    }
`
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`
const SvgContainer = styled.svg`
    --poids: ${colors.neutral700};
    --calories: ${colors.backgroundGraphRed};
    --text: ${colors.neutral500};
    --line: ${colors.neutral300};
    --white: ${colors.primary};
    --cursor: rgba(0, 0, 0, 0.1);
  
    overflow: visible;
`

D3BarplotGrouped.propTypes = {
    Data: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            kilogram: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired
        })
    ).isRequired
}

export default D3BarplotGrouped