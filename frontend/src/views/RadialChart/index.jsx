import useDimensions from '../../hooks/useDimensions'
import useD3 from '../../hooks/useD3'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../style/colors'

/**
 * Component that displays a circular score chart.
 * @function Score
 * @param {Object} props - The component props.
 * @param {number} props.score - The user's score as a percentage (between 0 and 1).
 * @returns {JSX.Element} Returns a React element for the score chart.
 */

const D3RadialChart = ({ Data }) => {
    const [parentReference, parentDimensions] = useDimensions()

    const { chartReference } = useD3(
        svg => {
            const { width, height } = parentDimensions
            const sizeRatio = percent => Math.round((percent / 100) * Math.min(width, height))
            const margin = sizeRatio(15)
            const thickness = sizeRatio(5)
            const outerRadius = sizeRatio(50) - margin
            const innerRadius = outerRadius - thickness

            const arcGenerator = amount => d3
                .arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .cornerRadius(thickness / 2)
                .startAngle(0)
                .endAngle(amount * 2 * Math.PI)

            // Set up the chart elements
            const chart = svg
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', `0 0 ${width} ${height}`)
            const chartGroup = chart
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`)

            // Create background
            chartGroup
                .append('circle')
                .attr('r', innerRadius)
                .attr('fill', 'var(--background)')

            // Create remaining arc
            chartGroup
                .append('path')
                .attr('fill', 'var(--remaining)')
                .attr('d', arcGenerator(1))

            // Create progress arc
            chartGroup
                .append('path')
                .attr('fill', 'var(--progress)')
                .transition()
                .duration(3000)
                .attrTween('d', () => {
                    const interpolator = d3.interpolate(0, - Data)
                    return t => arcGenerator(interpolator(t))()
                })

            // Create title
            chartGroup
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'mathematical')
                .attr('dy', - sizeRatio(6))
                .attr('fill', 'var(--title)')
                .style('font-size', '26px')
                .style('font-weight', 'bold')
                .transition()
                .duration(3000)
                .tween('text', () => {
                    const interpolator = d3.interpolate(0, Data)
                    return t => chart.select('text').text(`${Math.round(interpolator(t) * 100)}%`)
                })

            // Create subtitle
            chartGroup
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'mathematical')
                .attr('dy', sizeRatio(6))
                .attr('fill', 'var(--baseline)')
                .style('font-size', '16px')
                .text('de votre')
            chartGroup
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'mathematical')
                .attr('dy', sizeRatio(16))
                .attr('fill', 'var(--baseline)')
                .style('font-size', '16px')
                .text('objectif')
        },
        [parentDimensions, Data]
    )

    return (
        <Score id='Score'>
            <Title>Score</Title>
            <Wrapper ref={parentReference}>
                <SvgContainer ref={chartReference} />
            </Wrapper>
        </Score>
    )
}

const Score = styled.article`
    grid-area: sco;
    position: relative;
    // height: 19rem;
    height: 33vh;
    background-color: ${colors.neutral100};
    border-radius: 0.25rem;
`
const Title = styled.h2`
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    font-weight: 500;
    font-size: 15px;
`
const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`
const SvgContainer = styled.svg`
    --progress: ${colors.backgroundGraphRed};
    --remaining: ${colors.neutral200};
    --background: ${colors.primary};
    --title: ${colors.neutral900};
    --baseline: ${colors.neutral500};
`

D3RadialChart.propTypes = {
    Data: PropTypes.number.isRequired
}

export default D3RadialChart