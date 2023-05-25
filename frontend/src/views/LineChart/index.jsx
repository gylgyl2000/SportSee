import useDimensions from '../../hooks/useDimensions'
import useD3 from '../../hooks/useD3'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../style/colors'

// const Data = [
//     {day: "lundi", sessionLength: 30},
//     {day: "mardi", sessionLength: 40},
//     {day: "mercredi", sessionLength: 50},
//     {day: "jeudi", sessionLength: 30},
//     {day: "vendredi", sessionLength: 30},
//     {day: "samedi", sessionLength: 50},
//     {day: "dimanche", sessionLength: 50}
// ]


const D3LineChart = ({ Data }) => {
    console.log(Data)
    const [parentReference, parentDimensions] = useDimensions()

    const { chartReference } = useD3(
        svg => {
            const { width, height } = parentDimensions
            const sizeRatio = percent => Math.round((percent / 100) * Math.min(width, height))
            
            const xScale = d3
                .scaleBand()
                .domain(Data.map(({ day }) => day))
                .range([0, width])

            const yScale = d3
                .scaleLinear()
                .domain([
                    d3.min(Data, ({ sessionLength }) => sessionLength),
                    d3.max(Data, ({ sessionLength }) => sessionLength)
                ])
                .range([height / 3, 0])

            const line = d3
                .line()
                .x(({ day }) => xScale(day) + xScale.bandwidth() / 2)
                .y(({ sessionLength }) => yScale(sessionLength))
                .curve(d3.curveNatural)

            const xAxis = d3
                .axisBottom(xScale)
                .tickSize(0)
                .tickPadding(sizeRatio(5))
                .tickFormat(day => day.slice(0, 1).toUpperCase())

            // Set up the chart elements
            const chart = svg.attr('width', width).attr('height', height).attr('viewBox', `0 0 ${width} ${height}`)
            const cursorsGroup = chart.append('g')
            const chartGroup = chart.append('g').attr('transform', `translate(0, ${height / 3})`)
            const lineGroup = chartGroup.append('g')
            const pointsGroup = chartGroup.append('g')
            const tooltipsGroup = chartGroup.append('g')
            const chartAxis = chartGroup.append('g').attr('transform', `translate(0, ${height / 2})`)
            const gradient = chart.append('defs').append('linearGradient').attr('id', 'opacityGradient')

            // Create gradient
            gradient.append('stop').attr('offset', '10%').attr('stop-color', 'var(--line)').attr('stop-opacity', 0.1)
            gradient.append('stop').attr('offset', '100%').attr('stop-color', 'var(--line)').attr('stop-opacity', 1)

            // Create the line
            lineGroup
                .append('path')
                .datum(Data)
                .attr('d', d => line(d))
                .attr('fill', 'none')
                .attr('stroke', 'url(#opacityGradient)')
                .attr('stroke-width', sizeRatio(1.25))
                .attr('stroke-linecap', 'round')
                .attr('stroke-dasharray', () => {
                    const length = chartGroup.select('path').node().getTotalLength()
                    return `${length} ${length}`
                })
                .attr('stroke-dashoffset', () => chartGroup.select('path').node().getTotalLength())
                .transition()
                .duration(3000)
                .attr('stroke-dashoffset', 0)

            const points = pointsGroup
                .selectAll('circle')
                .data(Data)
                .enter()
                .append('circle')
                .attr('cx', ({ day }) => xScale(day) + xScale.bandwidth() / 2)
                .attr('cy', ({ sessionLength }) => yScale(sessionLength))
                .attr('r', sizeRatio(1.5))
                .attr('fill', 'var(--line)')
                .attr('stroke', 'var(--line)')
                .attr('stroke-opacity', 0.2)
                .attr('stroke-width', sizeRatio(2.5))
                .attr('opacity', 0)

            const tooltip = tooltipsGroup
                .selectAll('foreignObject')
                .data(Data)
                .enter()
                .append('foreignObject')
                .attr('style','display: inline-block; width: 1px; height: 1px; overflow: visible;')
                .attr('x', d => {
                    const w = sizeRatio(20)
                    const x = xScale(d.day) + xScale.bandwidth() / 1.5
                    return x + w > width ? width - w : x
                })
                .attr('y', d => yScale(d.sessionLength) - sizeRatio(12))
                .append('xhtml:span')
                .attr('style', 'display: inline-block; width: max-content; padding: 0.25rem 0.5rem; background-color: #FFFFFF; border-radius: 0.25rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);')
                .style('font-size', `${sizeRatio(4)}px`)
                .text(d => `${d.sessionLength} min`)
                .style('opacity', 0)

            // Create the axis
            chartAxis
                .call(xAxis)
                .call(g => g.select('.domain').remove())
                .call(g => g.selectAll('.tick text').attr('fill', 'var(--legend)').style('font-size', sizeRatio(5)))

            const cursorRects = cursorsGroup
                .selectAll('rect')
                .data(Data)
                .enter()
                .append('rect')
                .attr('height', height)
                .attr('width', xScale.bandwidth())
                .attr('x', d => xScale(d.day))
                .attr('fill', 'var(--cursor)')
                .attr('opacity', 0)

            chart.on('mousemove', event => {
                const [x] = d3.pointer(event)
                const index = Math.floor(x / xScale.bandwidth())

                cursorRects.attr('opacity', (_, index_) => (index_ >= index ? 1 : 0))
                points.attr('opacity', (_, index_) => (index_ === index ? 1 : 0))
                tooltip.style('opacity', (_, index_) => (index_ === index ? 1 : 0))
            })

            chart.on('mouseout', () => {
                cursorRects.attr('opacity', 0)
                points.attr('opacity', 0)
                tooltip.style('opacity', 0)
            })
        },
        [parentDimensions, Data]
    )

    return (
        <Sessions id='Sessions'>
            <Title>Durée moyenne des sessions</Title>
            <Wrapper ref={parentReference}>
                <SvgContainer ref={chartReference} />
            </Wrapper>
        </Sessions>
    )
}

const Sessions = styled.article`
    grid-area: ses;
    position: relative;
    // height: 19rem;
    height: 33vh;
    background-color: ${colors.backgroundGraphRed};
    border-radius: 0.25rem;
`
const Title = styled.h2`
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    max-width: 9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    font-size: 15px;
`
const Wrapper = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
`
const SvgContainer = styled.svg`
    --legend: rgba(255, 255, 255, 0.5);
    --line: ${colors.primary};
    --cursor: rgba(0, 0, 0, 0.15);
`
// const tooltipStyle = css`
//     display: inline-block;
//     width: 1px;
//     height: 1px;
//     overflow: visible;
// `
// const tooltipSpanStyle  = css`
//     display: inline-block;
//     width: max-content;
//     padding: 0.25rem 0.5rem;
//     backgroundColor: colors.primary;
//     borderRadius: 0.25rem;
//     boxShadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
// `

  

D3LineChart.propTypes = {
    Data: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            sessionLength: PropTypes.number.isRequired
        })
    ).isRequired
}

export default D3LineChart