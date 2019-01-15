import { observable, action, computed, runInAction } from 'mobx'

class PropertiesStore {
  @observable
  properties = {
    singleHouse: [],
    data: [],
    status: 'loading'
  }

  @action
  listProperties () {
    this.properties.status = 'loading'
    this.getProperties()
      .then(properties => {
        runInAction(() => {
          this.properties.data = properties
          this.properties.status = 'done'
          console.log('hhhhhhh', properties)
        })
      })
      .catch(err => (this.properties.status = 'error'))
  }

  @action getDetails (id) {
    this.properties.status = 'loading'
    this.loadDetails(id)
      .then(property => {
        runInAction(() => {
          this.properties.singleHouse = property
          this.properties.status = 'done'
        })
      })
      .catch(err => (this.properties.status = 'error'))
  }

  @computed
  get propertiesCount () {
    return this.properties.data.length
  }
  getProperties () {
    return fetch('api/properties').then(response => response.json())
  }
  loadDetails (id) {
    return fetch(`/house?id=${id}`)
      .then(res => res.json())
      .then(res => console.log('line 30 sore ::::', res))
      .catch(error => console.log(error))
  }
}

const store = new PropertiesStore()
export default store
