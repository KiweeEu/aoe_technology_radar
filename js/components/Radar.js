import React from 'react';
import Fadeable from './Fadeable';
import * as d3 from 'd3';

// Mocked data; will be eventually passed as props
const quadrants = [
    {
        color: '#9ad3a9',
        index: 0
    },
    {
        color: '#7c8bbc',
        index: 1
    },
    {
        color: '#ad79a5',
        index: 2
    },
    {
        color: '#92acbf',
        index: 3
    }
];
const rings = [2, 3, 4, 5];
const radius = 400;


export default ({ leaving, onLeave, pageName, items, ...props }) => {
    const svg = d3.select('#radar')
        .append('svg')
        .attr("width", radius)
        .attr("height", radius * 2);

    const grid = svg.append('g')
        .attr('transform', `translate(0, ${radius})`);

    quadrants.forEach(({ index, color }) => {
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
            .startAngle(index * Math.PI / 4)
            .endAngle((index + 1) * Math.PI / 4);

        grid.append('path')
            .attr('d', arc())
            .style('fill', color)
            .style("stroke", '#ffffff')
            .style("stroke-width", 2);
    });

    rings.forEach((ringIndex) => {
        const arc = d3.arc()
            .innerRadius(ringIndex * radius / 5)
            .outerRadius(ringIndex * radius / 5)
            .startAngle(0)
            .endAngle(Math.PI);

        grid.append('path')
            .attr('d', arc())
            .style('fill', 'none')
            .style('stroke', '#ffffff')
            .style('stroke-width', 1);
    })

    return (
        <Fadeable leaving={leaving} onLeave={onLeave}>
            <div id="radar"></div>
        </Fadeable>
    );
}
