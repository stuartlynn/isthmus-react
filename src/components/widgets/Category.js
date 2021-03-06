import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';


class Category extends Component {

  static defaultProps = {
    categories: [],
    selection: [],
    filter: null,
    showHeader: true,
    showClearButton: true,
    useTotalPercentage: false,
    visibleCategories: Infinity,
  }

  componentDidMount() {
    this._setupConfig();
    this._setupEvents();
    this._addDataview();
  }

  componentDidUpdate() {
    this._setupConfig();
  }

  _setupConfig() {
    const { categories, showHeader, showClearButton, useTotalPercentage, visibleCategories } = this.props;

    this.widget.showHeader = showHeader;
    this.widget.showClearButton = showClearButton;
    this.widget.useTotalPercentage = useTotalPercentage;
    this.widget.visibleCategories = visibleCategories;
    this.widget.categories = categories;

  }

  _setupEvents() {
    this.widget.addEventListener('categoriesSelected', event => this._onSelectedChanged(event));
  }

  _addDataview() {
    this.dataView = new carto.dataview.Category(this.props.layers.railaccidents.source, 'railroad', {
      limit: 10,
      operation: carto.operation.SUM,
      operationColumn: 'total_damage',
    });

    this.dataView.on('dataChanged', ({ categories }) => this.setState({ categories }));
    this.props.client.addDataview(this.dataView);
 }

 componentDidUpdate(prevProps) {
   const bboxFilter = new carto.filter.BoundingBoxLeaflet(this.props.map)
   // this.dataView.addFilter(this.props.boundingbox);
   // this.dataView.on('dataChanged', this.onDataChanged);

   if(prevProps !== this.props) {
     this.dataView.addFilter(this.props.boundingbox);
   }

 }

_createFilter() {
  const filter = new carto.filter.Category('railroad', { in: this.state.selection });
  this.props.layers.railaccidents.source.addFilter(filter);
  this.setState({  filter });
}

_updateFilter() {
  this.filter.setFilters({ in: this.state.selection });
}

onSelectedChanged = ({ detail }) => {
  let { filter } = this.state;

  if (filter && !detail.length) {
    this.props.layers.railaccidents.source.removeFilter(filter);
    filter = null;
  }

  this.setState({ selection: detail, filter });
}

onApplySelection = () => {
  const { filter, selection } = this.state;

  selection.length > 0 && !filter
    ? this._createFilter()
    : this._updateFilter();
}

  _onSelectedChanged(event) {
    const { onSelectedChanged } = this.props;
    onSelectedChanged && onSelectedChanged(event);
  }

  render() {
    const { heading, description } = this.props;
    const { categories, filter, selection } = this.props;
    const showApplyButton = selection.length > 0 && !filter;

    return (
      <div>
      <as-category-widget
        ref={node => { this.widget = node; }}
        heading={heading}
        description={description}
        categories={categories}
        onSelectedChanged={this.onSelectedChanged}
        showClearButton={!!filter}
      />
      { showApplyButton && (
        <div className="as-flex as-justify-end as-mt--8">
          <button className="as-btn as-btn--s as-btn--primary" onClick={this.onApplySelection}>
            Apply selection
          </button>
        </div>
      )}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  client: state.client,
  map: state.map,
  filters: state.filters,
  layers: state.layers,
  viewport: state.viewport,
  boundingbox: state.boundingbox
});

const mapDispatchToProps = dispatch => ({
  setNeighbourhoods: selected => dispatch(setNeighbourhoods(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
