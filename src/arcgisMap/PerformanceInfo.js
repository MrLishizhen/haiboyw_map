import React, { Component } from 'react';
import _ from 'lodash';

export default class index extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.view !== this.props.view && nextProps.view) {
            nextProps.view.ui.add('performanceInfo', 'bottom-left');
            this.updatePerformanceInfo(nextProps.view);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props);
    }

    updatePerformanceInfo = (view) => {
        const performanceInfo = view.performanceInfo;
        this.updateMemoryTitle(
            performanceInfo.usedMemory,
            performanceInfo.totalMemory,
            performanceInfo.quality
        );
        this.updateTables(performanceInfo);
        setInterval(() => {
            this.updatePerformanceInfo(view);
        }, 1000);
    }

    updateMemoryTitle(used, total, quality) {
        const title = document.getElementById("title");
        title.innerHTML = `Memory: ${this.getMB(used)}MB/${this.getMB(
            total
        )}MB  -  Quality: ${Math.round(100 * quality)} %`;
    }

    updateTables(stats) {
        const tableMemoryContainer = document.getElementById("memory");
        const tableCountContainer = document.getElementById("count");
        tableMemoryContainer.innerHTML = `<tr>
          <th>Resource</th>
          <th>Memory(MB)</th>
        </tr>`;
        for (let layerInfo of stats.layerPerformanceInfos) {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${
                layerInfo.layer.title
                }</td><td class="center">${this.getMB(layerInfo.memory)}</td>`;
            tableMemoryContainer.appendChild(row);
        }

        tableCountContainer.innerHTML = `<tr>
          <th>Layer - Features</th>
          <th>Displayed / Max<br>(count)</th>
          <th>Total<br>(count)</th>
        </tr>`;

        for (let layerInfo of stats.layerPerformanceInfos) {
            if (layerInfo.maximumNumberOfFeatures) {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${layerInfo.layer.title}`;
                row.innerHTML += `<td class="center">${
                    layerInfo.displayedNumberOfFeatures
                        ? layerInfo.displayedNumberOfFeatures
                        : "-"
                    } / ${
                    layerInfo.maximumNumberOfFeatures
                        ? layerInfo.maximumNumberOfFeatures
                        : "-"
                    }</td>`;
                row.innerHTML += `<td class="center">${
                    layerInfo.totalNumberOfFeatures
                        ? layerInfo.totalNumberOfFeatures
                        : "-"
                    }</td>`;
                tableCountContainer.appendChild(row);
            }
        }
    }

    getMB(bytes) {
        var kilobyte = 1024;
        var megabyte = kilobyte * 1024;
        return Math.round(bytes / megabyte);
    }

    render() {
        return (
            <div id='performanceInfo' style={{ backgroundColor: '#fff' }}>
                <h4 id='title'></h4>
                <table id='memory'></table>
                <table id='count'></table>
            </div>
        );
    }
}