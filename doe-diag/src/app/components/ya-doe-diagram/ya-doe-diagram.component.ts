import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-ya-doe-diagram',
  templateUrl: './ya-doe-diagram.component.html',
  styleUrls: ['./ya-doe-diagram.component.css']
})

/**
 * Yet another Degrees of Engagement Diagram
 * This example was built for EWA and Blockchain students that are
 * part of the Degrees of Engagement (DoE) project at
 * AUAS (Amsterdam University of Applied Sciences)
 *
 * The main objective of this diagram is showing project members, within
 * their categories (e.g. environment, society) and engagement levels (e.g. core, partner)
 *
 * This project uses the D3 library and it was based on the TechRadar example available at:
 * https://codepen.io/douglaseggleton/pen/YYBWvp
 *
 * The code was written in Typescript but can be easily ported to Javascript
 *
 * Thank you Douglas Eggleton for this great didactic example!
 *
 * Marcio Fuckner
 */
export class YaDoeDiagramComponent implements OnInit {

  level = [{
                name: 'Influencer',
                color: '#3498DB'
              }, {
                name: 'Prospect',
                color: '#1ABC9C'
              }, {
                name: 'Partner',
                color: '#F1C40F'
              }, {
                name: 'Core',
                color: '#E74C3C'
              }];

  categories = ['Business', 'Academia', 'Environment', 'Media', 'Society', 'Government'];

  members = [{
                name: 'HvA',
                category: 'Academia',
                level: 'Core'
              },
              {
                name: 'AMS',
                category: 'Academia',
                level: 'Partner'
              },
              {
                name: 'HAA',
                category: 'Government',
                level: 'Partner'
              },
              {
                name: 'ROT',
                category: 'Government',
                level: 'Partner'
              },
              {
                name: 'UTR',
                category: 'Government',
                level: 'Prospect'
              },
              {
                name: 'GP',
                category: 'Society',
                level: 'Influencer'
              },
              {
                name: 'NYT',
                category: 'Media',
                level: 'Influencer'
              },
              {
                name: 'WWF',
                category: 'Environment',
                level: 'Prospect'
              },
              {
                name: 'MIT',
                category: 'Academia',
                level: 'Prospect'
              },
              {
                name: 'B3',
                category: 'Business',
                level: 'Partner'
              }
              ];

  // Rendering parameters
  container = 600;
  size = 500;
  padding = 5;
  strokeWidth = 2;
  strokeColour = '#FFFFFF';
  pointSize = 3;
  pointLabelOffset = 5;

  selectedMember: string;

  constructor() { }

  ngOnInit(): void {
    this.initDiagram();
  }

  initDiagram(): void {

    // Creating the SVG element
    const radar = d3.select('#radar')
      .append('svg')
      .attr('width', this.container)
      .attr('height', this.container);

    // Creating all the layers and quadrants
    this.createCirclesAndLines(radar);

    // Creating the level labels (e.g. core, partner)
    this.createLevelLabels(radar);

    // Calculating the position of points based on their category and level
    // It also includes a collision detection of points to avoid overlapping
    this.calculatePointsPosition();

    // Plotting points and labels in the diagram
    this.plotPoints(radar);

    // Plotting categories (e.g. Business, Academia)
    this.plotCategoryLabels(radar);

  }

  /**
   * Creating all the layers and quadrants
   */
  createCirclesAndLines(radar): void {
    radar.selectAll('circle')
      .data(this.level)
      .enter()
      .append('circle')
      .attr('stroke', this.strokeColour)
      .attr('stroke-width', this.strokeWidth)
      .attr('fill', (d) => {
        return d.color;
      })
      .attr('r', (d, i) => {
        return ((this.size / 2) / this.level.length) * (this.level.length - i);
      })
      .attr('cx', this.container / 2)
      .attr('cy', this.container / 2);

    radar.selectAll('line')
      .data(this.categories)
      .enter()
      .append('line')
      .attr('x1', (data, i) => {
        const deg = (360 / (this.categories.length)) * i;
        return (this.container / 2) + (this.size / 2) * Math.cos( deg * Math.PI / 180);
      })
      .attr('y1', (data, i) => {
        const deg = (360 / (this.categories.length)) * i;
        return (this.container / 2) + (this.size / 2) * Math.sin(deg * Math.PI / 180);
      })
      .attr('x2', this.container / 2)
      .attr('y2', this.container / 2)
      .attr('stroke', this.strokeColour)
      .attr('stroke-width', this.strokeWidth);
  }

  /**
   * Creating the level labels (e.g. core, partner)
   */
  createLevelLabels(radar): void {
    const labelWidth = this.size * 0.12;
    const labelHeight = this.size * 0.04;
    const labelRadius = 5;

    radar.selectAll('rect')
      .data(this.level)
      .enter()
      .append('rect')
      .attr('x', () => {
        return this.container / 2 - labelWidth / 2;
      })
      .attr('y', (d, i) => {
        const interval = this.size / 2 / this.level.length;
        const offset = interval / 2 - labelHeight / 2;
        const containerOffset = (this.container - this.size) / 2;
        return interval * i + offset + containerOffset;
      })
      .attr('height', labelHeight)
      .attr('width', labelWidth)
      .attr('fill', 'white')
      .attr('rx', labelRadius);

    radar.selectAll('text')
      .data(this.level)
      .enter()
      .append('text')
      .text( (data) => {
        return data.name;
      })
      .attr('text-anchor', 'middle')
      .attr('y', (d, i) => {
        const interval = this.size / 2 / this.level.length;
        const offset = interval / 2 - labelHeight / 2;
        const containerOffset = (this.container - this.size) / 2;
        return interval * i + offset + labelHeight * 0.7 + containerOffset;
      })
      .attr('fill', (d, i) => {
        return d.color;
      })
      .attr('font-size', this.size * 0.023)
      .attr('x', (data, i) => {
        return this.container / 2;
      });
  }

  /**
   * Calculating the position of points based on their category and level
   * It also includes a collision detection of points to avoid overlapping
   */
  calculatePointsPosition(): void {
    this.members.forEach( (data) => {

      let x;
      let y;

      do {
        const radiansPerCategory = this.getRadiansPerCategory(null);
        const categoryPosition = this.getCategoryPositionByString(data.category);
        const categoryOffset = this.generateRandomNumber(this.getMemberPositionByString(data.name)) * radiansPerCategory;
        const angle = radiansPerCategory * (categoryPosition) + categoryOffset;

        // calculate the radius
        const pixelsPerCategory = (this.size / 2) / this.level.length;
        const levelPosition = this.getLevelPositionByString(data.level);
        const sectorOffset = this.generateRandomNumber(this.getMemberPositionByString(data.name)) * pixelsPerCategory;
        const radius = (this.size / 2) - (levelPosition * pixelsPerCategory) - sectorOffset;

        x = radius * Math.cos(angle) + this.container / 2;
        y = radius * Math.sin(angle) + this.container / 2;
      } while (this.hasCollision(x, y));

      data['x'] = x;
      data['y'] = y;

    });
  }

  /**
   * Plotting points and labels in the diagram
   */
  plotPoints(radar): void {
    const points = radar.append('g');

    points.selectAll('text')
      .data(this.members)
      .enter()
      .append('text')
      .text((d, i) => {
        return d.name;
      })
      .attr('memberName', (d, i) => {
        return d.name;
      })
      .attr('fill', 'black')
      .attr('font-size', this.size * 0.02)
      .attr('x', (d, i) => {
        return d.x + this.pointLabelOffset;
      })
      .attr('y', (d, i) => {
        return d.y + this.pointLabelOffset;
      })
      .on('mouseover', (evt) => {
        if (evt.target.attributes.memberName) {
          this.selectedMember = evt.target.attributes.memberName.value;
        }
      });

    points.selectAll('circle')
      .data(this.members)
      .enter()
      .append('circle')
      .attr('memberName', (d, i) => {
        return d.name;
      })
      .attr('r', this.pointSize)
      .attr('cx', (d, i) => {
        return d.x;
      })
      .attr('cy', (d, i) => {
        return d.y;
      })
      .on('mouseover', (evt) => {
        if (evt.target.attributes.memberName) {
          this.selectedMember = evt.target.attributes.memberName.value;
        }
      });

  }

  /**
   * Plotting categories (e.g. Business, Academia)
   */
  plotCategoryLabels(radar): void {
    radar.selectAll('.category-label')
      .data(this.categories)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('class', 'category-label')
      .attr('fill', this.strokeColour)
      .text( (d) => {
        return d;
      })
      .attr('x', (d, i) => {
        // calculate the angle (radians)
        const radiansPerCategory = this.getRadiansPerCategory(null);
        const categoryPosition = this.getCategoryPositionByString(d);
        const categoryOffset = radiansPerCategory / 2;
        const angle = radiansPerCategory * categoryPosition + categoryOffset;
        // calculate the radius
        const radius = this.size / 2;
        const x = radius * Math.cos(angle);
        return x + this.container / 2;
      })
      .attr('y', (d, i) => {
        // calculate the angle (radians)
        const radiansPerCategory = this.getRadiansPerCategory(null);
        const categoryPosition = this.getCategoryPositionByString(d);
        const categoryOffset = radiansPerCategory / 2; // middle of the sector
        const angle = radiansPerCategory * categoryPosition + categoryOffset;
        // calculate the radius
        const radius = this.size / 2;
        const y = radius * Math.sin(angle);
        return y + this.container / 2 - 10;
      });
  }

  /**
   * Radians to Degrees
   */
  degrees(radians): number {
    return radians * 180 / Math.PI;
  }

  /**
   * Degrees to Radians
   */
  radians(degrees): number {
    return degrees * Math.PI / 180;
  }

    // tslint:disable-next-line:typedef
  getLevelPositionByString(level) {
    return this.level.findIndex((element) => {
      return element.name === level;
    });
  }

  // tslint:disable-next-line:typedef
  getCategoryPositionByString(category) {
    return this.categories.findIndex( (element) => {
      return element === category;
    });
  }

  // tslint:disable-next-line:typedef
  getMemberPositionByString(member) {
    return this.members.findIndex((element) => {
      return element.name === member;
    });
  }

  // tslint:disable-next-line:typedef
  getRadiansPerCategory(category) {
    return this.radians(360 / this.categories.length);
  }

  /**
   * used to randomly add members to in the chart
   */
  generateRandomNumber(i): number {
    let theNumber = Math.random();
    if (theNumber < 0.05) {
      theNumber = theNumber + 0.05;
    }
    if (theNumber > 0.95) {
      theNumber = theNumber - 0.05;
    }
    return theNumber;
  }

  /**
   * Iterate over members to check if a new point would generate collision
   */
  hasCollision(x, y): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.members.length; i++) {
      if (this.checkDistanceBetweenMembers(x, this.members[i]['x'], y, this.members[i]['y']) < 30) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get the distance between two points (members), used to check collision
   */
  checkDistanceBetweenMembers(x1: number, x2: number, y1: number, y2: number): number {
    const a = x2 - x1;
    const b = y2 - y1;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  }
}
