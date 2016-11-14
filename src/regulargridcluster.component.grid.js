L.RegularGridClusterGrid = L.FeatureGroup.extend({
  options: {

  },
  initialize: function (options) {
    this.controller = options.controller;
    this.options = L.extend(this.options, options);
    L.Util.setOptions(this, options);

    L.FeatureGroup.prototype.initialize.call(this, {
      features: []
    }, options);
  },

  render: function (cellSize, origin) {

  },

  addLayer: function (cell) {
    L.FeatureGroup.prototype.addLayer.call(this, cell);
  },

  truncate: function () {
    this.clearLayers();
  }
});

L.regularGridClusterGrid = function(options) {
  return new L.RegularGridClusterGrid(options);
};