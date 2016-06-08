class DataListWrapper {
  constructor(data, filteredMapping) {
    this._data = data
    if (filteredMapping === undefined) {
      const mapping = []

      if (data === undefined) {
        console.log("stop")
      }

      for (let i = 0; i < data.length; i++) {
        mapping.push(i)
      }
      this._indexMapping = mapping
    } else {
      this._indexMapping = filteredMapping
    }
  }

  getSize() {
    return this._indexMapping.length
  }

  getObjectAt(index) {
    return this._data[this._indexMapping[index]]
  }
}

export default DataListWrapper
