import useDimensions from '../../hooks/useDimensions'
import useD3 from '../../hooks/useD3'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../style/colors'

/**
 * Component displaying a radar chart for performance.
 * @function Performance
 * @param {object} props - Component props.
 * @param {Array<{ kind: string, value: number }>} props.performance - Performance data, containing the kind of the performance and its value.
 * @returns {JSX.Element} - Rendered component.
 */

const D3RadarChart = ({ Data }) => {
    const [parentReference, parentDimensions] = useDimensions()

    const { chartReference } = useD3(
        svg => {
            const { width, height } = parentDimensions
            const sizeRatio = percent => Math.round((percent / 100) * Math.min(width, height))
            const margin = sizeRatio(15)
            const radarRadius = sizeRatio(50) - margin

            const radiusDomain = [0, d3.max(Data, d => d.value)]
            const radiusRange = [0, radarRadius]
            const scaleRadius = d3.scaleLinear().domain(radiusDomain).range(radiusRange)

            const angleDomain = [0, Data.length]
            const angleRange = [0, 2 * Math.PI]
            const scaleAngle = d3.scaleLinear().domain(angleDomain).range(angleRange)

            const levels = 5
            const radarGenerator = Array.from({ length: levels }, (_, index) => d3
                .lineRadial()
                .angle((_, index_) => scaleAngle(index_))
                .radius(scaleRadius.range()[1] * (index + 1) * (1 / levels))
                .curve(d3.curveCardinalClosed.tension(0.8))
            )

            const radarAreaGenerator = d3
                .areaRadial()
                .angle((_, index) => scaleAngle(index))
                .outerRadius(d => scaleRadius(d.value))
                .curve(d3.curveCardinalClosed.tension(0.8))

            // Set up the chart elements
            const chart = svg
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', `0 0 ${width} ${height}`)

            const chartGroup = chart
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`)

            // Draw the chart
            chartGroup
                .selectAll('path')
                .data(radarGenerator)
                .enter()
                .append('path')
                .attr('d', d => d(Data))
                .attr('fill', 'none')
                .attr('stroke', 'var(--radar)')
                .attr('stroke-width', sizeRatio(0.5))
                .attr('stroke-opacity', (_, index) => (index + 1) * (1 / levels))

            // Draw the chart ticks
            chartGroup
                .selectAll('text')
                .data(Data)
                .enter()
                .append('text')
                .attr('x', (_, index) => radarRadius * Math.cos(scaleAngle(index) - Math.PI / 2) * 1.35)
                .attr('y', (_, index) => radarRadius * Math.sin(scaleAngle(index) - Math.PI / 2) * 1.2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr('fill', 'var(--radar)')
                .style('font-size', '12px')
                .style('text-transform', 'capitalize')
                .text(d => d.kind)

            // Draw the chart area
            chartGroup
                .append('path')
                .attr('fill', 'var(--performance)')
                .attr('fill-opacity', 0.5)
                .attr('stroke', 'var(--performance)')
                .attr('stroke-width', sizeRatio(0.5))
                .transition()
                .duration(3000)
                .attrTween('d', () => {
                    const interpolator = d3.interpolate(
                        Data.map(d => ({ ...d, value: 0 })),
                        Data
                    )
                    return t => radarAreaGenerator(interpolator(t))
                })
        },
        [parentDimensions, Data]
    )

    return (
        <Performance id='Performance'>
            <Wrapper ref={parentReference} >
                <SvgContainer ref={chartReference} />
            </Wrapper>
        </Performance>
    )
}

const Performance = styled.div`
    grid-area: per;
    position: relative;
    // height: 19rem;
    height: 33vh;
    background-color: ${colors.neutral800};
    border-radius: 0.25rem;
`
const Wrapper = styled.div`
    // display: inline-block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    // vertical-align: top;
    // overflow: hidden;
    // background: ${colors.backgroundGraphGray};
    // border-radius: 5px;
`
const SvgContainer = styled.svg`
    --radar: ${colors.neutral300};
    --performance: ${colors.backgroundGraphRed};
`

D3RadarChart.propTypes = {
    Data: PropTypes.arrayOf(
        PropTypes.shape({
            kind: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ).isRequired
}

export default D3RadarChart